import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SeoMeta from './SeoMeta';
import { getSeoForPath } from '../utils/seoConfig';
import { trackPageView, trackCalculatorUsed } from '../utils/analytics';

const RouteMetaTracker = ({ noIndex = false }) => {
  const location = useLocation();
  const seo = getSeoForPath(location.pathname);

  useEffect(() => {
    trackPageView(location.pathname, seo.title);

    if (location.pathname.endsWith('-calculator')) {
      trackCalculatorUsed(seo.title, location.pathname);
    }
  }, [location.pathname, seo.title]);

  return (
    <SeoMeta
      title={seo.title}
      description={seo.description}
      path={location.pathname}
      robots={noIndex ? 'noindex, nofollow' : 'index, follow'}
    />
  );
};

export default RouteMetaTracker;
