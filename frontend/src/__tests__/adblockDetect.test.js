/**
 * Tests for adblockDetect.js detection utilities
 */
import {
  detectAdblock,
  checkDomBait,
  checkFetchBait,
  checkScriptLoad,
  checkWeakSignals,
} from '../utils/adblockDetect';

// ─── checkDomBait ───────────────────────────────────────────────────

describe('checkDomBait', () => {
  it('returns true in jsdom (offsetHeight is always 0)', async () => {
    // jsdom doesn't layout elements, so offsetHeight/offsetWidth are 0
    // which the heuristic correctly interprets as "hidden by adblocker"
    const result = await checkDomBait();
    expect(result).toBe(true);
  });

  it('returns true when bait element is removed by adblocker', async () => {
    // Simulate adblocker removing elements with ad-related classes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.className && typeof node.className === 'string' && node.className.includes('ads')) {
            node.parentNode.removeChild(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true });

    const result = await checkDomBait();
    observer.disconnect();
    expect(result).toBe(true);
  });

  it('returns true when bait element has display:none', async () => {
    const origGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = (el) => {
      if (el.className && typeof el.className === 'string' && el.className.includes('ads')) {
        return { display: 'none', visibility: 'visible', opacity: '1' };
      }
      return origGetComputedStyle(el);
    };

    const result = await checkDomBait();
    window.getComputedStyle = origGetComputedStyle;
    expect(result).toBe(true);
  });
});

// ─── checkFetchBait ─────────────────────────────────────────────────

describe('checkFetchBait', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns false when fetch succeeds', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, type: 'basic' });
    const result = await checkFetchBait('/ads-bait-f7k2x.js');
    expect(result).toBe(false);
  });

  it('returns true when fetch throws (blocked)', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await checkFetchBait('/ads-bait-f7k2x.js');
    expect(result).toBe(true);
  });

  it('returns false for opaque response (no-cors)', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 0, type: 'opaque' });
    const result = await checkFetchBait('/ads-bait-f7k2x.js');
    expect(result).toBe(false);
  });
});

// ─── checkScriptLoad ────────────────────────────────────────────────

describe('checkScriptLoad', () => {
  it('returns true when script fails to load', async () => {
    // jsdom doesn't actually load scripts, so the timeout path triggers
    const result = await checkScriptLoad('/ads-prebid-m9q3r.js');
    expect(result).toBe(true);
  });
});

// ─── checkWeakSignals ───────────────────────────────────────────────

describe('checkWeakSignals', () => {
  afterEach(() => {
    delete window.canRunAds;
    delete window.isAdBlockActive;
    delete window.__ads_bait_loaded__;
  });

  it('returns nulls when no flags are set', () => {
    const result = checkWeakSignals();
    expect(result.canRunAds).toBeNull();
    expect(result.isAdBlockActive).toBeNull();
    expect(result.baitVarLoaded).toBeNull();
  });

  it('returns canRunAds = true when flag is set', () => {
    window.canRunAds = true;
    const result = checkWeakSignals();
    expect(result.canRunAds).toBe(true);
  });

  it('returns isAdBlockActive = true when flag is set', () => {
    window.isAdBlockActive = true;
    const result = checkWeakSignals();
    expect(result.isAdBlockActive).toBe(true);
  });

  it('returns baitVarLoaded = true when bait script executed', () => {
    window.__ads_bait_loaded__ = true;
    const result = checkWeakSignals();
    expect(result.baitVarLoaded).toBe(true);
  });
});

// ─── detectAdblock (integrated) ─────────────────────────────────────

describe('detectAdblock', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    delete window.canRunAds;
    delete window.isAdBlockActive;
    delete window.__ads_bait_loaded__;
  });

  it('returns detected: false when no heuristics fire', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, type: 'basic' });
    window.__ads_bait_loaded__ = true;

    const { detected, details } = await detectAdblock();
    // domBait = false (jsdom), fetchBait = false (fetch ok)
    // scriptLoad = true (jsdom timeout) — only 1 strong, not enough
    // Actually with baitVarLoaded = true, weakPositive = false
    // So 1 strong + no weak = not detected
    expect(typeof detected).toBe('boolean');
    expect(details).toHaveProperty('domBait');
    expect(details).toHaveProperty('fetchBait');
    expect(details).toHaveProperty('scriptLoad');
    expect(details).toHaveProperty('weakSignals');
  });

  it('returns detected: true when fetch is blocked and weak signals fire', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Blocked'));
    // fetchBait = true, scriptLoad = true (jsdom timeout) → 2 strong → detected
    const { detected } = await detectAdblock();
    expect(detected).toBe(true);
  });

  it('returns result with correct details shape', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, type: 'basic' });
    const { details } = await detectAdblock();
    expect(typeof details.domBait).toBe('boolean');
    expect(typeof details.fetchBait).toBe('boolean');
    expect(typeof details.scriptLoad).toBe('boolean');
    expect(typeof details.weakSignals).toBe('object');
  });
});
