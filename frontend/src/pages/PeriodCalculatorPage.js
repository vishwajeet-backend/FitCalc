import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function PeriodCalculatorPage() {
  const [formData, setFormData] = useState({
    month: 'Jan',
    day: '1',
    year: '2026',
    cycleLength: '28',
    periodLength: '5',
  });
  const [result, setResult] = useState(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculatePeriod = () => {
    const monthIndex = months.indexOf(formData.month);
    const lastPeriod = new Date(formData.year, monthIndex, formData.day);
    const cycleLength = parseInt(formData.cycleLength);
    const periodLength = parseInt(formData.periodLength);
    
    // Calculate next 6 periods
    const periods = [];
    for (let i = 1; i <= 6; i++) {
      const periodStart = new Date(lastPeriod);
      periodStart.setDate(periodStart.getDate() + (cycleLength * i));
      
      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + periodLength - 1);
      
      // Ovulation occurs ~14 days before next period
      const ovulationDate = new Date(periodStart);
      ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
      
      // Fertile window: 5 days before ovulation to 1 day after
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(fertileStart.getDate() - 5);
      
      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(fertileEnd.getDate() + 1);
      
      periods.push({
        cycleNumber: i,
        periodStart: periodStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        periodEnd: periodEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ovulation: ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fertileStart: fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fertileEnd: fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
    }
    
    // Calculate days until next period
    const today = new Date();
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    const daysUntil = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));
    
    setResult({
      periods,
      nextPeriodDate: nextPeriod.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      daysUntil: daysUntil > 0 ? daysUntil : 0,
    });
  };

  const handleClear = () => {
    setFormData({
      month: 'Jan',
      day: '1',
      year: '2026',
      cycleLength: '28',
      periodLength: '5',
    });
    setResult(null);
  };

  // Responsive styles for mobile
  const responsiveStyles = `
    @media (max-width: 768px) {
      .calc-responsive-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

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
      background: '#ec4899',
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
    nextPeriodCard: {
      background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      borderRadius: '12px',
      padding: '2rem',
      marginBottom: '24px',
      textAlign: 'center',
      color: 'white',
    },
    nextPeriodTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      marginBottom: '0.5rem',
      opacity: 0.9,
    },
    nextPeriodDate: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    nextPeriodDays: {
      fontSize: '1.125rem',
      opacity: 0.95,
    },
    tableContainer: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
      marginTop: '24px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      background: '#f3f4f6',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '14px',
      padding: '12px',
      borderBottom: '1px solid #e5e7eb',
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '14px',
    },
    cycleNumber: {
      display: 'inline-block',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: '#ec4899',
      color: 'white',
      textAlign: 'center',
      lineHeight: '24px',
      fontSize: '12px',
      fontWeight: '600',
    },
  };

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
        <span style={styles.breadcrumbLink}>period calculator</span>
      </div>

      <div style={styles.grid} className="calc-responsive-grid">
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Period Calculator</h1>
          <p style={styles.description}>
            Track your menstrual cycle and predict your next periods, ovulation, and fertile windows for the next 6 months.
          </p>

          <div style={styles.formGroup}>
            <label style={styles.label}>Last Period Start Date</label>
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

          <div style={styles.formGroup}>
            <label style={styles.label}>Average Cycle Length (days)</label>
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

          <div style={styles.formGroup}>
            <label style={styles.label}>Period Duration (days)</label>
            <input
              type="number"
              name="periodLength"
              value={formData.periodLength}
              onChange={handleInputChange}
              min="2"
              max="10"
              style={styles.input}
            />
          </div>

          <button
            style={{ ...styles.button, ...styles.calculateButton }}
            onClick={calculatePeriod}
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
              <span style={styles.resultsTitle}>Your Period Predictions</span>
              <span style={styles.saveIcon}>📄</span>
            </div>
            <div style={styles.resultsBody}>
              {/* Next Period Card */}
              <div style={styles.nextPeriodCard}>
                <div style={styles.nextPeriodTitle}>Your Next Period</div>
                <div style={styles.nextPeriodDate}>{result.nextPeriodDate}</div>
                <div style={styles.nextPeriodDays}>
                  {result.daysUntil > 0 
                    ? `${result.daysUntil} days until your next period`
                    : 'Your period may be starting soon'}
                </div>
              </div>

              {/* Periods Table */}
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Cycle</th>
                      <th style={styles.tableHeader}>Period Dates</th>
                      <th style={styles.tableHeader}>Ovulation</th>
                      <th style={styles.tableHeader}>Fertile Window</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.periods.map((period, idx) => (
                      <tr key={idx}>
                        <td style={{ ...styles.tableCell, borderBottom: idx === result.periods.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                          <span style={styles.cycleNumber}>{period.cycleNumber}</span>
                        </td>
                        <td style={{ ...styles.tableCell, borderBottom: idx === result.periods.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                          {period.periodStart} - {period.periodEnd}
                        </td>
                        <td style={{ ...styles.tableCell, borderBottom: idx === result.periods.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                          {period.ovulation}
                        </td>
                        <td style={{ ...styles.tableCell, borderBottom: idx === result.periods.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                          {period.fertileStart} - {period.fertileEnd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default PeriodCalculatorPage;
