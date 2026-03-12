import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://fit-calc-beta.vercel.app';

const normalizePath = (path) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

const SeoMeta = ({
  title,
  description,
  path = '/',
  robots = 'index, follow',
  image = `${SITE_URL}/logo192.png`,
}) => {
  const normalizedPath = normalizePath(path);
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="FitCalc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SeoMeta;
