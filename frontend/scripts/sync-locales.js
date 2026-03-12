/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const LOCALES = path.join(SRC, 'locales');

const LOCALE_CODES = ['en', 'hi', 'bn', 'mr', 'te', 'ta', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'ur', 'sa', 'mai'];
const GOOGLE_LANG_MAP = {
  mai: 'hi',
};

const TEXT_CACHE = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeWhitespace = (value) => value.replace(/\s+/g, ' ').trim();

const buildAutoKey = (text, prefix = 'auto') => {
  const normalizedText = normalizeWhitespace(text);

  const slug = normalizedText
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  let hash = 0;
  for (let index = 0; index < normalizedText.length; index += 1) {
    hash = ((hash << 5) - hash) + normalizedText.charCodeAt(index);
    hash |= 0;
  }
  const hashSuffix = Math.abs(hash).toString(36).slice(0, 5) || '0';

  if (!slug) {
    return `${prefix}.${hashSuffix}`;
  }

  return `${prefix}.${slug}_${hashSuffix}`;
};

const decodeJsString = (rawValue, quote) => {
  const wrapped = `${quote}${rawValue}${quote}`;
  try {
    return Function(`"use strict"; return (${wrapped});`)();
  } catch (_error) {
    return rawValue
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\`/g, '`')
      .replace(/\\\\/g, '\\');
  }
};

const isLikelyUiText = (value) => {
  const text = normalizeWhitespace(value);
  if (!text) {
    return false;
  }

  if (!/[A-Za-z]/.test(text)) {
    return false;
  }

  if (text.length < 2 || text.length > 1200) {
    return false;
  }

  if (/^https?:\/\//i.test(text) || /^www\./i.test(text)) {
    return false;
  }

  if (/^[-_a-z0-9]+$/i.test(text) && !/[A-Z]/.test(text) && !/\s/.test(text)) {
    return false;
  }

  if (/^(rgba?|hsla?)\(/i.test(text) || /^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/i.test(text)) {
    return false;
  }

  return true;
};

const getByPath = (obj, dottedPath) => {
  const parts = dottedPath.split('.');
  let pointer = obj;

  for (const part of parts) {
    if (!pointer || typeof pointer !== 'object' || !(part in pointer)) {
      return undefined;
    }
    pointer = pointer[part];
  }

  return pointer;
};

const setByPath = (obj, dottedPath, value) => {
  const parts = dottedPath.split('.');
  const lastPart = parts.pop();
  let pointer = obj;

  parts.forEach((part) => {
    if (!pointer[part] || typeof pointer[part] !== 'object' || Array.isArray(pointer[part])) {
      pointer[part] = {};
    }
    pointer = pointer[part];
  });

  pointer[lastPart] = value;
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

const collectSourceFiles = () => {
  const includeRoots = [
    path.join(SRC, 'components'),
    path.join(SRC, 'pages'),
    path.join(SRC, 'data'),
  ];

  const files = [];

  const walk = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
      return;
    }

    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }

      if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    });
  };

  includeRoots.forEach(walk);
  return files;
};

const collectTextEntries = () => {
  const files = collectSourceFiles();
  const keyToEnglish = new Map();

  files.forEach((filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');

    const defaultValueRegex = /t\(\s*(['"`])([^'"`]+)\1\s*,\s*\{[\s\S]*?defaultValue\s*:\s*(['"`])([\s\S]*?)\3[\s\S]*?\}\s*\)/g;
    let match;
    while ((match = defaultValueRegex.exec(source)) !== null) {
      const key = match[2].trim();
      const english = normalizeWhitespace(decodeJsString(match[4], match[3]));
      if (!english) {
        continue;
      }

      if (!keyToEnglish.has(key)) {
        keyToEnglish.set(key, english);
      }
    }

    const attributeRegex = /\b(?:label|title|description|breadcrumbPath|subtitle|placeholder|alt|aria-label)\s*=\s*(['"`])([^'"`]*?)\1/g;
    while ((match = attributeRegex.exec(source)) !== null) {
      const text = normalizeWhitespace(decodeJsString(match[2], match[1]));
      if (!isLikelyUiText(text)) {
        continue;
      }

      const autoKey = buildAutoKey(text, 'auto');
      if (!keyToEnglish.has(autoKey)) {
        keyToEnglish.set(autoKey, text);
      }
    }

    const jsxTextRegex = />\s*([^<{][^<]*[A-Za-z][^<]*)\s*</g;
    while ((match = jsxTextRegex.exec(source)) !== null) {
      const text = normalizeWhitespace(match[1]);
      if (!isLikelyUiText(text)) {
        continue;
      }

      const autoKey = buildAutoKey(text, 'auto');
      if (!keyToEnglish.has(autoKey)) {
        keyToEnglish.set(autoKey, text);
      }
    }

    const contentFieldRegex = /\b(?:title|description|excerpt|summary|content)\s*:\s*(['"`])([\s\S]*?)\1/g;
    while ((match = contentFieldRegex.exec(source)) !== null) {
      const text = normalizeWhitespace(decodeJsString(match[2], match[1]));
      if (!isLikelyUiText(text)) {
        continue;
      }

      const autoKey = buildAutoKey(text, 'auto');
      if (!keyToEnglish.has(autoKey)) {
        keyToEnglish.set(autoKey, text);
      }
    }
  });

  // Keep the sync reasonably fast while still covering visible UI content.
  const MAX_SYNC_KEYS = 1200;
  if (keyToEnglish.size > MAX_SYNC_KEYS) {
    return new Map(Array.from(keyToEnglish.entries()).slice(0, MAX_SYNC_KEYS));
  }

  return keyToEnglish;
};

const translateViaGoogle = async (englishText, targetLanguageCode) => {
  if (targetLanguageCode === 'en') {
    return englishText;
  }

  const cacheKey = `${targetLanguageCode}::${englishText}`;
  if (TEXT_CACHE.has(cacheKey)) {
    return TEXT_CACHE.get(cacheKey);
  }

  const targetCode = GOOGLE_LANG_MAP[targetLanguageCode] || targetLanguageCode;
  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: targetCode,
    dt: 't',
    q: englishText,
  });

  const endpoint = `https://translate.googleapis.com/translate_a/single?${params.toString()}`;

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      const translated = Array.isArray(payload?.[0])
        ? payload[0].map((segment) => segment[0]).join('')
        : englishText;

      TEXT_CACHE.set(cacheKey, translated || englishText);
      return translated || englishText;
    } catch (error) {
      lastError = error;
      await sleep(attempt * 250);
    }
  }

  console.warn(`Translation fallback to English for ${targetLanguageCode}: ${lastError?.message || 'unknown error'}`);
  TEXT_CACHE.set(cacheKey, englishText);
  return englishText;
};

const syncLocales = async () => {
  const keyToEnglish = collectTextEntries();

  if (keyToEnglish.size === 0) {
    console.log('No UI text entries found.');
    return;
  }

  console.log(`Collected ${keyToEnglish.size} translation entries from source files.`);

  const localeObjects = {};
  LOCALE_CODES.forEach((code) => {
    const filePath = path.join(LOCALES, code, 'common.json');
    localeObjects[code] = {
      filePath,
      data: readJson(filePath),
    };
  });

  // Always ensure English has all keys.
  for (const [key, englishText] of keyToEnglish.entries()) {
    const existing = getByPath(localeObjects.en.data, key);
    if (typeof existing === 'string' && existing.trim()) {
      continue;
    }
    setByPath(localeObjects.en.data, key, englishText);
  }

  // Fill missing keys in each non-English locale with automatic translations.
  for (const localeCode of LOCALE_CODES.filter((code) => code !== 'en')) {
    let translatedCount = 0;
    const locale = localeObjects[localeCode].data;

    for (const [key, englishText] of keyToEnglish.entries()) {
      const existing = getByPath(locale, key);
      if (typeof existing === 'string' && existing.trim()) {
        continue;
      }

      const translatedText = await translateViaGoogle(englishText, localeCode);
      setByPath(locale, key, translatedText);
      translatedCount += 1;

      if (translatedCount % 25 === 0) {
        console.log(`${localeCode}: translated ${translatedCount} missing entries...`);
      }
    }

    console.log(`${localeCode}: added ${translatedCount} translated entries.`);
  }

  LOCALE_CODES.forEach((code) => {
    writeJson(localeObjects[code].filePath, localeObjects[code].data);
  });

  console.log('Locale sync completed successfully.');
};

syncLocales().catch((error) => {
  console.error('Locale sync failed:', error);
  process.exit(1);
});