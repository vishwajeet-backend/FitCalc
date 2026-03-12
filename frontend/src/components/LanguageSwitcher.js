import React from 'react';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '../i18n';

const LanguageSwitcher = ({ className = '' }) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    i18n.changeLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  return (
    <div className={`language-switcher ${className}`.trim()}>
      <label htmlFor="language-switcher" className="language-switcher-label">
        {t('language')}
      </label>
      <select
        id="language-switcher"
        className="language-switcher-select"
        value={i18n.resolvedLanguage || i18n.language || 'en'}
        onChange={handleLanguageChange}
        aria-label={t('language')}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
