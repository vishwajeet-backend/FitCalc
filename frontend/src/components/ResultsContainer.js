import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Results container with green header
const ResultsContainer = ({ title = "Your Results", children, downloadable = false }) => {
  const styles = {
    container: {
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
    },
    header: {
      background: '#10b981',
      color: 'white',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      margin: 0,
    },
    downloadButton: {
      background: 'transparent',
      border: '1px solid white',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    content: {
      padding: '1.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        {downloadable && (
          <button style={styles.downloadButton}>
            📄 Download
          </button>
        )}
      </div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};

// Result card component
export const ResultCard = ({ title, value, subtitle, color = '#3b82f6', percentage }) => {
  const styles = {
    card: {
      background: color,
      color: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    title: {
      fontSize: '0.875rem',
      fontWeight: '500',
      opacity: 0.95,
    },
    value: {
      fontSize: '2rem',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: '0.8125rem',
      opacity: 0.9,
    },
    percentage: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      {percentage !== undefined ? (
        <div>
          <div style={styles.percentage}>{percentage}</div>
          <div style={styles.subtitle}>{subtitle}</div>
        </div>
      ) : (
        <>
          <div style={styles.value}>{value}</div>
          {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
        </>
      )}
    </div>
  );
};

// Grid layout for result cards
export const ResultsGrid = ({ children, columns = 2 }) => {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 4 ? '200px' : '250px'}, 1fr))`,
      gap: '1rem',
    },
  };

  return <div style={styles.grid}>{children}</div>;
};

// Info row for displaying key-value pairs
export const InfoRow = ({ label, value, highlight = false }) => {
  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.875rem 0',
      borderBottom: '1px solid #f3f4f6',
    },
    label: {
      fontSize: '0.9375rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    value: {
      fontSize: '0.9375rem',
      color: highlight ? '#3b82f6' : '#1f2937',
      fontWeight: highlight ? '600' : '500',
    },
  };

  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
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
