import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translateRuntimeText } from '../utils/runtimeTranslate';

const ORIGINAL_TEXT_BY_NODE = new WeakMap();
const LAST_TRANSLATION_BY_NODE = new WeakMap();
const REQUEST_TOKEN_BY_NODE = new WeakMap();

const shouldSkipTextNode = (node) => {
  const parentElement = node.parentElement;
  if (!parentElement) {
    return true;
  }

  if (parentElement.closest('script, style, noscript, textarea, code, pre')) {
    return true;
  }

  if (parentElement.closest('[data-no-auto-translate="true"]')) {
    return true;
  }

  if (parentElement.closest('.language-switcher')) {
    return true;
  }

  if (parentElement.closest('.calculator-input, .calculator-select, .language-switcher-select')) {
    return true;
  }

  return false;
};

const normalizeNodeText = (text) => text.replace(/\s+/g, ' ').trim();

const GlobalTextTranslator = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const applyingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }

    const root = document.getElementById('root');
    if (!root) {
      return undefined;
    }

    const activeLanguage = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().split('-')[0];

    const applyNodeTranslation = (node, originalText) => {
      const leadingWhitespace = originalText.match(/^\s*/)?.[0] || '';
      const trailingWhitespace = originalText.match(/\s*$/)?.[0] || '';
      const normalizedText = normalizeNodeText(originalText);

      if (!normalizedText || !/[A-Za-z]/.test(normalizedText) || normalizedText === 'FitCalc') {
        return;
      }

      const lastTranslation = LAST_TRANSLATION_BY_NODE.get(node);
      if (
        lastTranslation
        && lastTranslation.lang === activeLanguage
        && lastTranslation.original === normalizedText
      ) {
        return;
      }

      const requestToken = Symbol('translation-request');
      REQUEST_TOKEN_BY_NODE.set(node, requestToken);

      if (activeLanguage === 'en') {
        const englishValue = `${leadingWhitespace}${normalizedText}${trailingWhitespace}`;
        if (node.nodeValue !== englishValue) {
          node.nodeValue = englishValue;
        }

        LAST_TRANSLATION_BY_NODE.set(node, {
          lang: 'en',
          original: normalizedText,
        });
        return;
      }

      translateRuntimeText(normalizedText, activeLanguage).then((translatedText) => {
        if (REQUEST_TOKEN_BY_NODE.get(node) !== requestToken) {
          return;
        }

        if (!node.isConnected) {
          return;
        }

        const finalText = `${leadingWhitespace}${translatedText}${trailingWhitespace}`;
        if (node.nodeValue !== finalText) {
          node.nodeValue = finalText;
        }

        LAST_TRANSLATION_BY_NODE.set(node, {
          lang: activeLanguage,
          original: normalizedText,
        });
      });
    };

    const translateVisibleTextNodes = () => {
      if (applyingRef.current) {
        return;
      }

      applyingRef.current = true;
      try {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const updates = [];
        let node = walker.nextNode();

        while (node) {
          if (!ORIGINAL_TEXT_BY_NODE.has(node)) {
            ORIGINAL_TEXT_BY_NODE.set(node, node.nodeValue || '');
          }

          const originalText = ORIGINAL_TEXT_BY_NODE.get(node) || '';

          if (!shouldSkipTextNode(node)) {
            updates.push({ node, value: originalText });
          }

          node = walker.nextNode();
        }

        updates.forEach(({ node: textNode, value }) => {
          applyNodeTranslation(textNode, value);
        });
      } finally {
        applyingRef.current = false;
      }
    };

    translateVisibleTextNodes();

    const observer = new MutationObserver(() => {
      translateVisibleTextNodes();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [i18n.resolvedLanguage, i18n.language, location.pathname, location.search]);

  return null;
};

export default GlobalTextTranslator;