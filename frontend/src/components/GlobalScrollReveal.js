import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTORS = [
  'main > *',
  'section',
  'article',
  '.blog-hero-section',
  '.blog-content-container > *',
  '.blog-post-card',
  '.article-hero-section',
  '.article-content-wrapper > *',
  '.article-related-section',
  '.article-post-card',
  '.calculator-main-content > *',
  '.calculator-breadcrumb',
  '.all-calculators-content > *',
  '.calculator-category',
  '.legal-hero-section',
  '.legal-main-content > *',
  '.not-found-main > *'
].join(',');

const MAX_STAGGER_MS = 360;
const STAGGER_STEP_MS = 70;

const shouldSkipElement = (element) => {
  if (!(element instanceof HTMLElement)) {
    return true;
  }

  if (element.classList.contains('fc-no-scroll-reveal')) {
    return true;
  }

  if (element.closest('[data-no-scroll-reveal="true"]')) {
    return true;
  }

  if (element.closest('footer')) {
    return true;
  }

  if (element.closest('.banner')) {
    return true;
  }

  if (element.closest('.calculator-header-banner')) {
    return true;
  }

  if (element.offsetParent === null && getComputedStyle(element).position !== 'fixed') {
    return true;
  }

  return false;
};

const isAlreadyInView = (element) => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= viewportHeight * 0.88;
};

const collectRevealTargets = () => {
  const found = new Set();

  document.querySelectorAll(REVEAL_SELECTORS).forEach((element) => {
    if (shouldSkipElement(element)) {
      return;
    }

    found.add(element);
  });

  return Array.from(found);
};

const GlobalScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer;
    let rescanTimer;

    const initReveal = () => {
      const targets = collectRevealTargets();

      if (prefersReducedMotion) {
        targets.forEach((element) => {
          element.classList.add('fc-scroll-reveal', 'is-visible');
        });
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            });
          },
          {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12,
          }
        );
      }

      let order = 0;
      targets.forEach((element) => {
        if (element.classList.contains('is-visible')) {
          return;
        }

        element.classList.add('fc-scroll-reveal');
        element.style.setProperty(
          '--fc-reveal-delay',
          `${Math.min(order * STAGGER_STEP_MS, MAX_STAGGER_MS)}ms`
        );
        order += 1;

        if (isAlreadyInView(element)) {
          element.classList.add('is-visible');
          return;
        }

        observer.observe(element);
      });
    };

    requestAnimationFrame(() => {
      initReveal();
      rescanTimer = window.setTimeout(initReveal, 280);
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }

      if (rescanTimer) {
        window.clearTimeout(rescanTimer);
      }
    };
  }, [location.pathname, location.search]);

  return null;
};

export default GlobalScrollReveal;