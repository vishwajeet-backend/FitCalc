import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Results container with green header
const ResultsContainer = ({ title = "Your Results", children, downloadable = false }) => {
  return (
    <div className="calculator-results-container">
      <div className="calculator-results-header">
        <h2 className="calculator-results-title">{title}</h2>
        {downloadable && (
          <button className="calculator-download-button">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 24L12 18L13.4 16.6L17 20.2V12H19V20.2L22.6 16.6L24 18L18 24ZM14 28C13.45 28 12.979 27.804 12.587 27.412C12.195 27.02 11.9993 26.5493 12 26V23H14V26H22V23H24V26C24 26.55 23.804 27.021 23.412 27.413C23.02 27.805 22.5493 28.0007 22 28H14Z" fill="white"/>
            </svg>
          </button>
        )}
      </div>
      <div className="calculator-results-content">
        {children}
      </div>
    </div>
  );
};

// Result card component
export const ResultCard = ({ title, value, subtitle, unit, variant, color, percentage }) => {
  // For backward compatibility with color prop
  const cardVariant = variant || (color === '#10b981' || color === '#3b82f6' || color === '#f59e0b' || color === '#ef4444' ? 'light-blue' : 'dark-blue');
  
  // Use inline style if custom color provided
  const style = (!variant && color) ? { backgroundColor: color, color: 'white' } : undefined;
  
  return (
    <div className={`calculator-result-card ${cardVariant}`} style={style}>
      <div className="calculator-result-card-left">
        <h3 className="calculator-result-card-title">{title}</h3>
        {subtitle && <p className="calculator-result-card-subtitle">{subtitle}</p>}
      </div>
      <div className="calculator-result-card-right">
        {percentage !== undefined ? (
          <>
            <div className="calculator-result-card-value">{percentage}</div>
          </>
        ) : (
          <>
            <div className="calculator-result-card-value">{value}</div>
            {unit && <div className="calculator-result-card-unit">{unit}</div>}
          </>
        )}
      </div>
    </div>
  );
};

// Grid layout for result cards
export const ResultsGrid = ({ children, columns = 2 }) => {
  return (
    <div 
      className="calculator-results-grid" 
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 4 ? '200px' : '250px'}, 1fr))` }}
    >
      {children}
    </div>
  );
};

// Info row for displaying key-value pairs
export const InfoRow = ({ label, value, highlight = false }) => {
  return (
    <div className="calculator-info-row">
      <span className="calculator-info-label">{label}</span>
      <span className={`calculator-info-value ${highlight ? 'highlight' : ''}`}>{value}</span>
    </div>
  );
};

// Chart wrappers
export const BMIChart = ({ bmi, category }) => {
  const data = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [
      {
        data: [18.5, 6.5, 5, 10], // BMI ranges
        backgroundColor: ['#fbbf24', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const ranges = ['< 18.5', '18.5 - 24.9', '25.0 - 29.9', '≥ 30.0'];
            return `${context.label}: ${ranges[context.dataIndex]}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export const CalorieChart = ({ maintain, mildLoss, moderateLoss, extremeLoss }) => {
  const data = {
    labels: ['Maintain', 'Mild Loss', 'Weight Loss', 'Extreme Loss'],
    datasets: [
      {
        label: 'Calories/day',
        data: [maintain, mildLoss, moderateLoss, extremeLoss],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + ' cal',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const WeightProgressChart = ({ currentWeight, idealWeight, healthyRange }) => {
  const data = {
    labels: ['Current', 'Target', 'Healthy Min', 'Healthy Max'],
    datasets: [
      {
        label: 'Weight',
        data: [currentWeight, idealWeight, healthyRange.min, healthyRange.max],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + ' lbs',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const MacroChart = ({ protein, carbs, fat }) => {
  const data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [protein, carbs, fat],
        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}g`,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export const BodyFatChart = ({ bodyFatPercentage, gender }) => {
  const categories = ['Essential', 'Athletes', 'Fitness', 'Average', 'Obese'];
  const maleRanges = [3, 11, 7, 7, 20];
  const femaleRanges = [12, 9, 7, 8, 20];
  
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Body Fat % Range',
        data: gender === 'male' ? maleRanges : femaleRanges,
        backgroundColor: ['#10b981', '#3b82f6', '#fbbf24', '#f59e0b', '#ef4444'],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + '%',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ResultsContainer;
