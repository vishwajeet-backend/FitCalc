import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <Banner />
      <main className="not-found-main" role="main">
        <section className="not-found-card">
          <h1>{t('pageNotFound')}</h1>
          <p>{t('pageNotFoundMessage')}</p>
          <Link to="/" className="not-found-home-link">
            {t('goHome')}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
