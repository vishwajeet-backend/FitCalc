import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const CalculatorLayout = ({ title, description, breadcrumbPath, children }) => {
  // Separate form content from results
  const childArray = React.Children.toArray(children);
  const formContent = [];
  const resultsContent = [];
  
  let foundForm = false;
  childArray.forEach(child => {
    // CalculatorForm is the form, everything after it goes to results column
    const isForm = child?.type?.name === 'CalculatorForm' || 
                   child?.type?.displayName === 'CalculatorForm';
    
    if (isForm) {
      foundForm = true;
      formContent.push(child);
    } else if (foundForm) {
      // After form, everything goes to results column
      resultsContent.push(child);
    } else {
      // Before form (like error messages), keep in form column
      formContent.push(child);
    }
  });

  return (
    <div className="calculator-page-container">
      {/* Header Banner */}
      <header className="calculator-header-banner">
        <div className="calculator-header-content">
          <Link to="/" className="calculator-logo">FitCalc</Link>
          <nav className="calculator-nav">
            <Link to="/calculators" className="calculator-nav-item">Fitness</Link>
            <Link to="/pregnancy" className="calculator-nav-item">Pregnancy</Link>
            <Link to="/metabolism" className="calculator-nav-item">Metabolism</Link>
            <Link to="/blog" className="calculator-nav-item">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: '1376px', margin: '0 auto', padding: '48px 32px 0', width: '100%', flex: 1 }}>
          {/* Breadcrumb */}
          <div className="calculator-breadcrumb">
            <Link to="/">home</Link>
            {' / '}
            <Link to="/calculators">fitness & health</Link>
            {' / '}
            <span>{breadcrumbPath}</span>
          </div>

          {/* Two Column Layout */}
          <div className="calculator-main-content" style={{ marginTop: '20px', marginBottom: '48px' }}>
            {/* Left Column - Form */}
            <div className="calculator-form-container">
              <h1 className="calculator-title">{title}</h1>
              <p className="calculator-description">{description}</p>
              {formContent}
            </div>
            
            {/* Right Column - Results */}
            {resultsContent.length > 0 && (
              <div style={{ flex: 1 }}>
                {resultsContent}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalculatorLayout;
