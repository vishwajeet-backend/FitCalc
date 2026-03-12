const GOOGLE_LANG_MAP = {
  mai: 'hi',
};

const STORAGE_KEY = 'fitcalc.runtime.translate.cache.v1';
const memoryCache = new Map();
const pendingRequests = new Map();

let hasLoadedStorageCache = false;
let persistTimer = null;

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

const getSafeLangCode = (langCode) => {
  if (!langCode) {
    return 'en';
  }

  const shortCode = String(langCode).toLowerCase().split('-')[0];
  return GOOGLE_LANG_MAP[shortCode] || shortCode;
};

const getCacheKey = (text, langCode) => `${langCode}::${text}`;

const loadPersistedCache = () => {
  if (hasLoadedStorageCache || typeof window === 'undefined') {
    return;
  }

  hasLoadedStorageCache = true;

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return;
    }

    const parsed = JSON.parse(rawValue);
    if (!parsed || typeof parsed !== 'object') {
      return;
    }

    Object.entries(parsed).forEach(([cacheKey, translatedText]) => {
      if (typeof translatedText === 'string') {
        memoryCache.set(cacheKey, translatedText);
      }
    });
  } catch (_error) {
    // Ignore malformed storage cache.
  }
};

const persistCache = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (persistTimer) {
    window.clearTimeout(persistTimer);
  }

  persistTimer = window.setTimeout(() => {
    try {
      const serializable = {};
      memoryCache.forEach((value, key) => {
        serializable[key] = value;
      });

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (_error) {
      // Ignore storage write errors.
    }
  }, 200);
};

export const translateRuntimeText = async (text, langCode) => {
  const normalizedText = normalizeText(text);
  const safeLangCode = getSafeLangCode(langCode);

  if (!normalizedText || safeLangCode === 'en') {
    return normalizedText;
  }

  loadPersistedCache();

  const cacheKey = getCacheKey(normalizedText, safeLangCode);
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const requestPromise = fetch(
    `https://translate.googleapis.com/translate_a/single?${new URLSearchParams({
      client: 'gtx',
      sl: 'en',
      tl: safeLangCode,
      dt: 't',
      q: normalizedText,
    }).toString()}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Translation request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((payload) => {
      const translatedText = Array.isArray(payload?.[0])
        ? payload[0].map((segment) => segment?.[0] || '').join('')
        : normalizedText;

      const finalText = translatedText || normalizedText;
      memoryCache.set(cacheKey, finalText);
      persistCache();
      return finalText;
    })
    .catch(() => normalizedText)
    .finally(() => {
      pendingRequests.delete(cacheKey);
    });

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};
