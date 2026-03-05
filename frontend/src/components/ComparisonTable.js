import React from 'react';

const ComparisonTable = () => {
  return (
    <section className="comparison-section">
      <h2 className="section-title">How We Compare to Others</h2>
      <p className="section-subtitle">All calculations are available for free with no premium restrictions.</p>
      
      <div className="comparison-table">
        <div className="comparison-column fitcalc-column">
          <h3 className="column-header">FitCalc</h3>
          
          <div className="comparison-item">
            <div className="check-icon">✅</div>
            <p>All calculators are available for free with no premium restrictions</p>
          </div>
          
          <div className="comparison-item">
            <div className="check-icon">✅</div>
            <p>Clean information interface designed for fast and smooth usage</p>
          </div>
          
          <div className="comparison-item">
            <div className="check-icon">✅</div>
            <p>Mobile-first design optimized for your use and super-fast results</p>
          </div>
          
          <div className="comparison-item">
            <div className="check-icon">✅</div>
            <p>Results are shown with clear ranges, categories, and simple explanations</p>
          </div>
        </div>
        
        <div className="comparison-column competitor-column">
          <h3 className="column-header">Other Competitors</h3>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Most basic not advanced tools require paid subscriptions require payment</p>
          </div>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Outdated layouts with cluttered design and slow navigation</p>
          </div>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Mobile experience is not smooth and requires data scrolling</p>
          </div>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Shows numbers only with minimal explanation or guidance</p>
          </div>
        </div>
        
        <div className="comparison-column competitor-column">
          <h3 className="column-header">Other Competitors</h3>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Basic features available for free; advanced tools require paid plans and upgrades heavily</p>
          </div>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Too many popups, banners, and distractions that ruin user experience</p>
          </div>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Not responsive enough, with broken serving and poor usability</p>
          </div>
          
          <div className="comparison-item">
            <div className="x-icon">❌</div>
            <p>Basic features available for free; advanced tools require paid plans and upgrades heavily</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;