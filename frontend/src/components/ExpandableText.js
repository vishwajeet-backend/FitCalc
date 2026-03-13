import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ExpandableText = ({ className = '', children }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mobile-expandable-text">
      <p className={`${className} mobile-expandable-content ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>
        {children}
      </p>
      <button
        type="button"
        className="mobile-read-more-btn"
        onClick={() => setIsExpanded((previous) => !previous)}
      >
        {isExpanded
          ? t('readLess', { defaultValue: 'Read Less' })
          : t('readMore', { defaultValue: 'Read More' })}
      </button>
    </div>
  );
};

export default ExpandableText;
