/**
 * adblockDetect.js — Pure detection utilities for adblock detection.
 *
 * Multi-heuristic approach:
 *   1. DOM bait     — insert an element with ad-related class names
 *   2. Fetch bait   — attempt to fetch a known bait file
 *   3. Script load  — dynamically insert a script tag and listen for failure
 *   4. Weak signals — check window flags sometimes set by anti-adblock scripts
 *
 * Detection logic:
 *   detected = true if >= 2 strong heuristics fire, OR 1 strong + 1 weak signal.
 *
 * All functions are pure (no persistent DOM mutations; temporary elements are cleaned up).
 */

// ─── Configurable defaults ──────────────────────────────────────────
const DEFAULT_BAIT_PATH = '/ads-bait-f7k2x.js';
const DEFAULT_SCRIPT_BAIT_PATH = '/ads-prebid-m9q3r.js';
const SCRIPT_LOAD_TIMEOUT_MS = 1500;

// ─── Heuristic 1: DOM bait ─────────────────────────────────────────
/**
 * Creates a hidden element with ad-related CSS classes.
 * Adblockers auto-hide or remove such elements.
 * Returns true if the element was hidden, removed, or has zero dimensions.
 */
const checkDomBait = () => {
  return new Promise((resolve) => {
    try {
      const bait = document.createElement('div');
      bait.className = 'ads adsbox ad-banner ad-bait doubleclick ad-placement';
      bait.setAttribute('data-ad-slot', 'test');
      bait.style.cssText =
        'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;' +
        'background:transparent;pointer-events:none;';
      document.body.appendChild(bait);

      // Give adblocker a tick to act
      setTimeout(() => {
        let blocked = false;
        if (!bait.parentNode) {
          // Element was removed entirely
          blocked = true;
        } else {
          const style = window.getComputedStyle(bait);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.opacity === '0' ||
            bait.offsetHeight === 0 ||
            bait.offsetWidth === 0 ||
            bait.clientHeight === 0
          ) {
            blocked = true;
          }
        }

        // Cleanup
        if (bait.parentNode) {
          bait.parentNode.removeChild(bait);
        }

        resolve(blocked);
      }, 120);
    } catch {
      resolve(false);
    }
  });
};

// ─── Heuristic 2: Fetch bait ────────────────────────────────────────
/**
 * Attempts to fetch the bait JS file. If the request is blocked by an
 * extension (ERR_BLOCKED_BY_CLIENT), the fetch will fail.
 */
const checkFetchBait = async (baitUrl) => {
  try {
    const url = `${baitUrl}?_=${Date.now()}`;
    const response = await fetch(url, { cache: 'no-store', mode: 'no-cors' });

    // Some adblockers return a response with status 0 or a redirect
    if (response.status === 0 && response.type === 'opaque') {
      // no-cors returns opaque — can't reliably tell, treat as NOT blocked
      return false;
    }

    return false; // fetch succeeded → not blocked
  } catch {
    // Network error = blocked
    return true;
  }
};

// ─── Heuristic 3: Script load ───────────────────────────────────────
/**
 * Dynamically inserts a <script> tag and listens for load/error events.
 * Returns true if the script fails to load within the timeout.
 */
const checkScriptLoad = (scriptBaitPath) => {
  return new Promise((resolve) => {
    try {
      const script = document.createElement('script');
      const src = `${scriptBaitPath}?_=${Date.now()}`;
      let settled = false;

      const cleanup = () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      const settle = (blocked) => {
        if (!settled) {
          settled = true;
          cleanup();
          resolve(blocked);
        }
      };

      script.onerror = () => settle(true);
      script.onload = () => settle(false);

      // Timeout fallback — if neither fires, assume blocked
      setTimeout(() => settle(true), SCRIPT_LOAD_TIMEOUT_MS);

      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    } catch {
      resolve(true);
    }
  });
};

// ─── Heuristic 4: Weak window-variable checks ──────────────────────
/**
 * Some anti-adblock scripts set window flags. Adblockers sometimes
 * neutralize these. Returns { canRunAds, isAdBlockActive } or null values.
 * These are weak signals — used only to strengthen strong heuristics.
 */
const checkWeakSignals = () => {
  const result = {
    canRunAds: null,
    isAdBlockActive: null,
    baitVarLoaded: null,
  };

  try {
    if (typeof window.canRunAds !== 'undefined') {
      result.canRunAds = Boolean(window.canRunAds);
    }
    if (typeof window.isAdBlockActive !== 'undefined') {
      result.isAdBlockActive = Boolean(window.isAdBlockActive);
    }
    // Check if bait file set its flag
    if (typeof window.__ads_bait_loaded__ !== 'undefined') {
      result.baitVarLoaded = Boolean(window.__ads_bait_loaded__);
    }
  } catch {
    // Ignore
  }

  return result;
};

// ─── Combined detection ─────────────────────────────────────────────
/**
 * Runs all heuristics and decides if adblock is active.
 *
 * @param {Object} [options]
 * @param {string} [options.baitUrl]       - Path to bait JS file
 * @param {string} [options.scriptBaitPath]- Path to script-load bait
 * @returns {Promise<{ detected: boolean, details: Object }>}
 */
const detectAdblock = async (options = {}) => {
  const baitUrl = options.baitUrl || DEFAULT_BAIT_PATH;
  const scriptBaitPath = options.scriptBaitPath || DEFAULT_SCRIPT_BAIT_PATH;

  // Run all heuristics in parallel
  const [domBait, fetchBait, scriptLoad] = await Promise.all([
    checkDomBait(),
    checkFetchBait(baitUrl),
    checkScriptLoad(scriptBaitPath),
  ]);

  const weakSignals = checkWeakSignals();

  const details = {
    domBait,
    fetchBait,
    scriptLoad,
    weakSignals,
  };

  // Count strong heuristics that fired
  const strongPositives = [domBait, fetchBait, scriptLoad].filter(Boolean).length;

  // Weak signal analysis
  const weakPositive =
    weakSignals.canRunAds === false ||
    weakSignals.isAdBlockActive === true ||
    weakSignals.baitVarLoaded === false;

  // Decision: 2+ strong, OR 1 strong + weak positive
  const detected = strongPositives >= 2 || (strongPositives >= 1 && weakPositive);

  return { detected, details };
};

// ─── Logging helper ─────────────────────────────────────────────────
/**
 * Sends a detection log to the server.
 * Prefers navigator.sendBeacon for reliability on page unload;
 * falls back to fetch.
 *
 * @param {Object} data - Log payload
 * @param {string} [endpoint] - Log endpoint URL
 */
const sendAdblockLog = (data, endpoint = '/api/log/adblock') => {
  const payload = JSON.stringify({
    location: data.location || document.title || 'unknown',
    url: window.location.href,
    userAgent: navigator.userAgent,
    detected: data.detected,
    details: data.details,
    ts: new Date().toISOString(),
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      const sent = navigator.sendBeacon(endpoint, blob);
      if (sent) return;
    }
  } catch {
    // Fallback below
  }

  // Fetch fallback
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Silently fail — detection logging is best-effort
  });
};

export {
  detectAdblock,
  sendAdblockLog,
  checkDomBait,
  checkFetchBait,
  checkScriptLoad,
  checkWeakSignals,
  DEFAULT_BAIT_PATH,
  DEFAULT_SCRIPT_BAIT_PATH,
};
