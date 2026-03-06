import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function PregnancyWeekCalculatorPage() {
  const [formData, setFormData] = useState({
    calculationType: 'lastPeriod',
    month: 'Jan',
    day: '1',
    year: '2026',
    cycleLength: '28',
  });
  const [result, setResult] = useState(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const calculationTypes = [
    { value: 'lastPeriod', label: 'Last menstrual period' },
    { value: 'ultrasound', label: 'Ultrasound date' },
    { value: 'conception', label: 'Conception date' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculatePregnancy = () => {
    const monthIndex = months.indexOf(formData.month);
    const inputDate = new Date(formData.year, monthIndex, formData.day);
    const today = new Date();
    
    let conceptionDate, currentWeek, currentDay;
    
    if (formData.calculationType === 'lastPeriod') {
      // Conception typically occurs 14 days after LMP
      conceptionDate = new Date(inputDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
    } else if (formData.calculationType === 'conception') {
      conceptionDate = inputDate;
    } else if (formData.calculationType === 'ultrasound') {
      // Simplified - assume ultrasound date is conception date
      conceptionDate = inputDate;
    }
    
    // Calculate weeks and days since conception
    const daysSinceConception = Math.floor((today - conceptionDate) / (1000 * 60 * 60 * 24));
    currentWeek = Math.floor(daysSinceConception / 7);
    currentDay = daysSinceConception % 7;
    
    // Calculate due date (266 days after conception)
    const dueDate = new Date(conceptionDate);
    dueDate.setDate(dueDate.getDate() + 266);
    
    // Calculate trimester
    let trimester;
    let trimesterText;
    if (currentWeek < 13) {
      trimester = 1;
      trimesterText = 'first';
    } else if (currentWeek < 27) {
      trimester = 2;
      trimesterText = 'second';
    } else {
      trimester = 3;
      trimesterText = 'third';
    }
    
    // Baby stats
    const babyStats = getBabyStats(currentWeek);
    
    // Calculate remaining days
    const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    
    setResult({
      currentWeek,
      currentDay,
      trimester,
      trimesterText,
      babyLength: babyStats.length,
      babyWeight: babyStats.weight,
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysUntilDue,
      percentComplete: Math.round((daysSinceConception / 280) * 100),
    });
  };

  const getBabyStats = (week) => {
    const stats = {
      4: { length: 0.04, weight: 0.01 },
      8: { length: 0.63, weight: 0.04 },
      12: { length: 2.13, weight: 0.49 },
      16: { length: 4.57, weight: 3.53 },
      20: { length: 6.46, weight: 10.58 },
      24: { length: 11.81, weight: 600 },
      28: { length: 14.80, weight: 1000 },
      32: { length: 16.69, weight: 1702 },
      36: { length: 18.66, weight: 2622 },
      40: { length: 20.16, weight: 3462 },
    };
    
    const weeks = Object.keys(stats).map(Number);
    const closest = weeks.reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );
    
    return stats[closest];
  };

  const handleClear = () => {
    setFormData({
      calculationType: 'lastPeriod',
      month: 'Jan',
      day: '1',
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
      width: '200px',
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
    progressBar: {
      width: '100%',
      height: '30px',
      background: '#e5e7eb',
      borderRadius: '15px',
      overflow: 'hidden',
      marginTop: '24px',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #14ae5c 0%, #10b981 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '10px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    },
  };

  return (
    <div>
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
        <span style={styles.breadcrumbLink}>pregnancy week calculator</span>
      </div>

      <div style={styles.grid}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Pregnancy Week Calculator</h1>
          <p style={styles.description}>
            Find out exactly how far along you are in your pregnancy. Track your progress week by week with developmental milestones.
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
              {formData.calculationType === 'lastPeriod' && 'Last Menstrual Period'}
              {formData.calculationType === 'ultrasound' && 'Ultrasound Date'}
              {formData.calculationType === 'conception' && 'Conception Date'}
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
            onClick={calculatePregnancy}
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
                  You are currently at week #{result.currentWeek}, day {result.currentDay}
                </p>
                <div style={styles.bodyText}>
                  You are in the {result.trimesterText} trimester (Trimester {result.trimester}).
                  {'\n\n'}
                  Your baby is approximately {result.babyLength} inches ({(result.babyLength * 2.54).toFixed(1)} cm) long and weighs around {result.babyWeight < 100 ? `${result.babyWeight.toFixed(1)} ounces` : `${(result.babyWeight / 453.592).toFixed(1)} pounds (${result.babyWeight} grams)`}.
                  {'\n\n'}
                  Estimated due date: {result.dueDate}
                  {'\n'}
                  Days until due: {result.daysUntilDue}
                  {'\n'}
                  Likely conception date: {result.conceptionDate}
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${result.percentComplete}%` }}>
                    {result.percentComplete}%
                  </div>
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

export default PregnancyWeekCalculatorPage;
