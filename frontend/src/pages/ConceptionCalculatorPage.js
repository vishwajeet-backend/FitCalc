import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function ConceptionCalculatorPage() {
  const [formData, setFormData] = useState({
    calculationType: 'dueDate',
    month: 'Jun',
    day: '16',
    year: '2026',
    cycleLength: '28',
  });
  const [result, setResult] = useState(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const calculationTypes = [
    { value: 'dueDate', label: 'Due date' },
    { value: 'lastPeriod', label: 'Last period' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateConception = () => {
    const monthIndex = months.indexOf(formData.month);
    const inputDate = new Date(formData.year, monthIndex, formData.day);
    
    let conceptionDate, dueDate;
    
    if (formData.calculationType === 'dueDate') {
      dueDate = inputDate;
      // Conception is typically 266 days before due date
      conceptionDate = new Date(dueDate);
      conceptionDate.setDate(conceptionDate.getDate() - 266);
    } else if (formData.calculationType === 'lastPeriod') {
      // Conception typically occurs 14 days after last period
      conceptionDate = new Date(inputDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
      // Due date is 266 days after conception
      dueDate = new Date(conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266);
    }
    
    // Calculate fertile window (5 days before to 1 day after ovulation/conception)
    const fertileStart = new Date(conceptionDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(conceptionDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    
    // Calculate current pregnancy status (if applicable)
    const today = new Date();
    const daysSinceConception = Math.floor((today - conceptionDate) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysSinceConception / 7);
    const isPregnant = daysSinceConception >= 0 && daysSinceConception < 280;
    
    setResult({
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      conceptionDateShort: conceptionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      fertileStart: fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fertileEnd: fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      currentWeek: isPregnant ? currentWeek : null,
      isPregnant,
    });
  };

  const handleClear = () => {
    setFormData({
      calculationType: 'dueDate',
      month: 'Jun',
      day: '16',
      year: '2026',
      cycleLength: '28',
    });
    setResult(null);
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "IBM Plex Sans", Roboto, sans-serif',
    },
    breadcrumb: {
      fontSize: '0.875rem',
      marginBottom: '1.25rem',
      color: '#5b6b86',
    },
    breadcrumbLink: {
      color: '#5b6b86',
      textDecoration: 'underline',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      marginTop: '1.25rem',
    },
    formContainer: {
      background: 'white',
      border: '1px solid #dadada',
      borderRadius: '10px',
      padding: '24px',
      height: 'fit-content',
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#2e2e2e',
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    description: {
      fontSize: '20px',
      fontWeight: '300',
      color: '#2e2e2e',
      marginBottom: '32px',
      lineHeight: '1.5',
      fontFamily: '"Source Sans 3", sans-serif',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '16px',
      color: '#1e2939',
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    select: {
      width: '180px',
      padding: '8px 12px',
      border: '1.295px solid #99a1af',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'Arimo, sans-serif',
      background: 'white',
      cursor: 'pointer',
      outline: 'none',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '20px',
      paddingRight: '40px',
    },
    dateInputContainer: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    dateInput: {
      padding: '8px 12px',
      border: '1.295px solid #99a1af',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'Arimo, sans-serif',
      outline: 'none',
      appearance: 'none',
    },
    monthInput: {
      width: '99px',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '20px',
      paddingRight: '40px',
      cursor: 'pointer',
    },
    dayInput: {
      width: '90px',
    },
    yearInput: {
      width: '90px',
    },
    input: {
      width: '150px',
      padding: '8px 12px',
      border: '1.295px solid #99a1af',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'Arimo, sans-serif',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '14px 22px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: '"IBM Plex Sans", sans-serif',
      textTransform: 'capitalize',
      letterSpacing: '0.32px',
    },
    calculateButton: {
      background: '#3d568f',
      color: 'white',
      marginBottom: '8px',
    },
    clearButton: {
      background: 'white',
      color: '#1d2433',
      border: '1px solid #e1e6ef',
    },
    resultsContainer: {
      border: '1px solid #dadada',
      borderRadius: '10px',
      overflow: 'hidden',
      background: 'linear-gradient(90deg, #ffffff 0%, #fdfdf5 100%)',
      height: 'fit-content',
    },
    resultsHeader: {
      background: '#14ae5c',
      color: 'white',
      padding: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '80px',
    },
    resultsTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'Arimo, sans-serif',
    },
    saveIcon: {
      fontSize: '24px',
      cursor: 'pointer',
    },
    resultsBody: {
      padding: '24px',
    },
    resultCard: {
      background: '#fdfdf6',
      border: '1.295px solid rgba(0,0,0,0.1)',
      borderRadius: '10px',
      padding: '24px',
      marginTop: '24px',
    },
    mainText: {
      fontSize: '24px',
      fontWeight: '500',
      color: '#14ae5c',
      marginBottom: '24px',
      lineHeight: '1.4',
      fontFamily: '"IBM Plex Sans", sans-serif',
    },
    bodyText: {
      fontSize: '20px',
      fontWeight: '500',
      color: 'black',
      lineHeight: '1.6',
      fontFamily: '"Source Sans 3", sans-serif',
      whiteSpace: 'pre-line',
    },
  };

  const responsiveStyles = `
    @media (max-width: 768px) {
      .conception-calculator-container {
        flex-direction: column !important;
      }
      .conception-calculator-container > div {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  `;

  return (
    <div>
      <style>{responsiveStyles}</style>
      {/* Header Banner */}
      <header style={{
        backgroundColor: '#FFFFFF',
        backdropFilter: 'blur(5px)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 42px',
      }}>
        <div style={{
          maxWidth: '1800px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 500,
            fontSize: '36px',
            color: '#161E24',
            textDecoration: 'none',
          }}>FitCalc</Link>
          
          <nav style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}>
            <Link to="/calculators" style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '14px',
              color: '#000000',
              textDecoration: 'none',
              padding: '15px 10px',
              lineHeight: '22.4px',
            }}>Fitness</Link>
            <Link to="/pregnancy" style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '14px',
              color: '#000000',
              textDecoration: 'none',
              padding: '15px 10px',
              lineHeight: '22.4px',
            }}>Pregnancy</Link>
            <Link to="/metabolism" style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '14px',
              color: '#000000',
              textDecoration: 'none',
              padding: '15px 10px',
              lineHeight: '22.4px',
            }}>Metabolism</Link>
            <Link to="/blog" style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '14px',
              color: '#000000',
              textDecoration: 'none',
              padding: '15px 10px',
              lineHeight: '22.4px',
            }}>Blog</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
      <div style={styles.breadcrumb}>
        <Link to="/" style={styles.breadcrumbLink}>home</Link>
        {' / '}
        <Link to="/pregnancy" style={styles.breadcrumbLink}>fitness & health</Link>
        {' / '}
        <span style={styles.breadcrumbLink}>conception calculator</span>
      </div>

      <div style={styles.grid} className="calc-responsive-grid">
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Conception Calculator</h1>
          <p style={styles.description}>
            Calculate your estimated conception date based on your due date or last menstrual period. Find out when you likely conceived.
          </p>

          <div style={styles.formGroup}>
            <label style={styles.label}>Calculate Based On:</label>
            <select
              name="calculationType"
              value={formData.calculationType}
              onChange={handleInputChange}
              style={styles.select}
            >
              {calculationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              {formData.calculationType === 'dueDate' ? 'Your Due Date' : 'Last Menstrual Period'}
            </label>
            <div style={styles.dateInputContainer}>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                style={{ ...styles.dateInput, ...styles.monthInput }}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                min="1"
                max="31"
                style={{ ...styles.dateInput, ...styles.dayInput }}
              />
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="2020"
                max="2030"
                style={{ ...styles.dateInput, ...styles.yearInput }}
              />
            </div>
          </div>

          {formData.calculationType === 'lastPeriod' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Cycle Length (days)</label>
              <input
                type="number"
                name="cycleLength"
                value={formData.cycleLength}
                onChange={handleInputChange}
                min="21"
                max="35"
                style={styles.input}
              />
            </div>
          )}

          <button
            style={{ ...styles.button, ...styles.calculateButton }}
            onClick={calculateConception}
          >
            Start Calculating
          </button>
          <button
            style={{ ...styles.button, ...styles.clearButton }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {result && (
          <div style={styles.resultsContainer}>
            <div style={styles.resultsHeader}>
              <span style={styles.resultsTitle}>Your Results</span>
              <span style={styles.saveIcon}>📄</span>
            </div>
            <div style={styles.resultsBody}>
              <div style={styles.resultCard}>
                <p style={styles.mainText}>
                  Your estimated conception date is {result.conceptionDate}
                </p>
                <div style={styles.bodyText}>
                  Based on your {formData.calculationType === 'dueDate' ? 'due date' : 'last menstrual period'}, conception likely occurred around {result.conceptionDateShort}.
                  {'\n\n'}
                  Fertile window: {result.fertileStart} to {result.fertileEnd}
                  {'\n'}
                  This is the period when conception was most likely to occur.
                  {'\n\n'}
                  Estimated due date: {result.dueDate}
                  {result.isPregnant && result.currentWeek >= 0 && (
                    `\n\nIf currently pregnant, you would be at approximately week ${result.currentWeek}.`
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ConceptionCalculatorPage;
