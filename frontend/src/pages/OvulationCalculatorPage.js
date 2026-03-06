import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function OvulationCalculatorPage() {
  const [formData, setFormData] = useState({
    month: 'Jan',
    day: '1',
    year: '2026',
    cycleLength: '28',
  });
  const [result, setResult] = useState(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateOvulation = () => {
    const monthIndex = months.indexOf(formData.month);
    const lastPeriod = new Date(formData.year, monthIndex, formData.day);
    const cycleLength = parseInt(formData.cycleLength);
    
    // Ovulation typically occurs 14 days before the next period
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
    
    // Fertile window is 5 days before ovulation to 1 day after
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);
    
    // Next period date
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    
    // Calculate each day of fertile window
    const fertileDays = [];
    for (let i = -5; i <= 1; i++) {
      const day = new Date(ovulationDate);
      day.setDate(day.getDate() + i);
      fertileDays.push({
        date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isOvulation: i === 0,
        fertility: i >= -2 && i <= 0 ? 'High' : 'Medium',
      });
    }
    
    // Calculate due date if conception occurs on ovulation date
    const dueDate = new Date(ovulationDate);
    dueDate.setDate(dueDate.getDate() + 266);
    
    setResult({
      ovulationDate: ovulationDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ovulationDateShort: ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fertileStart: fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fertileEnd: fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      nextPeriod: nextPeriod.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      fertileDays,
    });
  };

  const handleClear = () => {
    setFormData({
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
    fertileDaysContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '12px',
      marginTop: '24px',
    },
    fertileDay: {
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600',
    },
    fertileDayHigh: {
      background: '#14ae5c',
      color: 'white',
    },
    fertileDayMedium: {
      background: '#86efac',
      color: '#166534',
    },
    fertileDayOvulation: {
      background: '#10b981',
      color: 'white',
      border: '2px solid #047857',
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
        <span style={styles.breadcrumbLink}>ovulation calculator</span>
      </div>

      <div style={styles.grid}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Ovulation Calculator</h1>
          <p style={styles.description}>
            Calculate your ovulation date and fertile window. Know the best days to conceive based on your menstrual cycle.
          </p>

          <div style={styles.formGroup}>
            <label style={styles.label}>Last Menstrual Period</label>
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

          <button
            style={{ ...styles.button, ...styles.calculateButton }}
            onClick={calculateOvulation}
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
                  Your estimated ovulation date is {result.ovulationDate}
                </p>
                <div style={styles.bodyText}>
                  Fertile window: {result.fertileStart} to {result.fertileEnd}
                  {'\n'}
                  This is your most fertile period for conception.
                  {'\n\n'}
                  Most fertile days: 2 days before ovulation through ovulation day
                  {'\n\n'}
                  Next period expected: {result.nextPeriod}
                  {'\n'}
                  Possible due date if conception occurs: {result.dueDate}
                </div>

                {result.fertileDays && (
                  <div style={styles.fertileDaysContainer}>
                    {result.fertileDays.map((day, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.fertileDay,
                          ...(day.isOvulation 
                            ? styles.fertileDayOvulation 
                            : day.fertility === 'High' 
                              ? styles.fertileDayHigh 
                              : styles.fertileDayMedium
                          ),
                        }}
                      >
                        <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                          {day.date}
                        </div>
                        <div>
                          {day.isOvulation ? 'Ovulation' : day.fertility}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

export default OvulationCalculatorPage;
