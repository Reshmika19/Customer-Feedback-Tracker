import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const Reports = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [compliments, setCompliments] = useState(0);
  const [complaints, setComplaints] = useState(0);
  const [replied, setReplied] = useState(0);
  const [noReply, setNoReply] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [suggestions, setSuggestions] = useState(0);
  const [statusData, setStatusData] = useState({ inProgress: 0, pending: 0, resolved: 0 });

  // State for dynamic chart dropdowns
  const [chartType, setChartType] = useState('Bar');
  const [comparison1, setComparison1] = useState('Compliments');
  const [comparison2, setComparison2] = useState('Complaints');

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback/all');
        setFeedbackData(response.data);
        analyzeFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };
    fetchFeedbackData();
  }, []);

  const analyzeFeedback = (data) => {
    let compliments = 0;
    let complaints = 0;
    let replied = 0;
    let noReply = 0;
    let suggestions = 0;
    let inProgress = 0;
    let pending = 0;
    let resolved = 0;

    data.forEach((feedback) => {
      if (feedback.category === 'Compliment') compliments++;
      else if (feedback.category === 'Complaint') complaints++;
      else if (feedback.category === 'Suggestion') suggestions++;

      if (feedback.reply) replied++;
      else noReply++;

      if (feedback.status === 'In Progress') inProgress++;
      else if (feedback.status === 'Pending') pending++;
      else if (feedback.status === 'Resolved') resolved++;
    });

    setCompliments(compliments);
    setComplaints(complaints);
    setReplied(replied);
    setNoReply(noReply);
    setSuggestions(suggestions);
    setStatusData({ inProgress, pending, resolved });
    setFeedbackCount(data.length);
  };

  const categoriesData = {
    Compliments: compliments,
    Complaints: complaints,
    Suggestions: suggestions,
    Replied: replied,
    'No Reply': noReply,
    'In Progress': statusData.inProgress,
    Pending: statusData.pending,
    Resolved: statusData.resolved,
  };

  const getSelectedChartData = () => {
    return {
      labels: [comparison1, comparison2],
      datasets: [
        {
          label: `Comparison: ${comparison1} vs ${comparison2}`,
          data: [categoriesData[comparison1], categoriesData[comparison2]],
          backgroundColor: ['#36A2EB', '#FF6384'],
          borderWidth: 1,
        },
      ],
    };
  };

  const getImprovementSuggestions = () => {
    const suggestions = [];
    if (complaints > compliments) {
      suggestions.push('Focus on addressing customer complaints to improve overall satisfaction.');
    }
    if (noReply > replied) {
      suggestions.push('Ensure timely responses to feedback to build customer trust.');
    }
    if (statusData.pending > statusData.resolved) {
      suggestions.push('Prioritize resolving pending issues to improve workflow efficiency.');
    }
    return suggestions.length > 0
      ? suggestions
      : ['No major areas for improvement identified. Keep up the good work!'];
  };

  const getImprovementData = () => {
    const totalFeedback = compliments + complaints + suggestions;
    const complaintsPercentage = totalFeedback ? (complaints / totalFeedback) * 100 : 0;
    const suggestionsPercentage = totalFeedback ? (suggestions / totalFeedback) * 100 : 0;
  
    return {
      labels: ['Complaints', 'Suggestions'],
      datasets: [
        {
          label: 'Areas of Improvement (in %)',
          data: [complaintsPercentage, suggestionsPercentage],
          backgroundColor: ['#FF6384', '#FFEB3B'],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
        <h1 style={styles.navTitle}>Reports</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.pageContent}>
          <h2>Feedback Reports</h2>
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <strong style={styles.statValue}>{feedbackCount}</strong>
              <div>Total Feedback</div>
            </div>
            <div style={styles.statItem}>
              <strong style={styles.statValue}>{compliments}</strong>
              <div>Compliments</div>
            </div>
            <div style={styles.statItem}>
              <strong style={styles.statValue}>{complaints}</strong>
              <div>Complaints</div>
            </div>
            <div style={styles.statItem}>
              <strong style={styles.statValue}>{suggestions}</strong>
              <div>Suggestions</div>
            </div>
          </div>

          <div style={styles.feedbackSummary}>
            <div style={styles.chartContainer}>
              <h3>Feedback Count by Category</h3>
              <Bar
                data={{
                  labels: ['Compliments', 'Complaints', 'Suggestions'],
                  datasets: [
                    {
                      data: [compliments, complaints, suggestions],
                      backgroundColor: ['#36A2EB', '#FF6384', '#FFEB3B'],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div style={styles.chartContainer}>
              <h3>Feedback Categories Percentage</h3>
              <Pie
                data={{
                  labels: ['Compliments', 'Complaints'],
                  datasets: [
                    {
                      data: [compliments, complaints],
                      backgroundColor: ['#36A2EB', '#FF6384'],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div style={styles.feedbackDetails}>
            <div style={styles.chartContainer}>
              <h3>Feedback Status</h3>
              <Pie
                data={{
                  labels: ['In Progress', 'Pending', 'Resolved'],
                  datasets: [
                    {
                      data: [
                        statusData.inProgress,
                        statusData.pending,
                        statusData.resolved,
                      ],
                      backgroundColor: ['#FF9800', '#FFEB3B', '#4CAF50'],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div style={styles.chartContainer}>
              <h3>Feedback Replies</h3>
              <Bar
                data={{
                  labels: ['Replied', 'No Reply'],
                  datasets: [
                    {
                      data: [replied, noReply],
                      backgroundColor: ['#4CAF50', '#FF9800'],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Dropdowns for Chart Selection */}
          <div style={styles.dropdownContainer}>
            <div style={styles.dropdown}>
              <label htmlFor="chartType" style={styles.label}>
                Select Chart Type:
              </label>
              <select
                id="chartType"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                style={styles.select}
              >
                <option value="Bar">Bar Chart</option>
                <option value="Pie">Pie Chart</option>
              </select>
            </div>

            <div style={styles.dropdown}>
              <label htmlFor="comparison1" style={styles.label}>
                Compare First Category:
              </label>
              <select
                id="comparison1"
                value={comparison1}
                onChange={(e) => setComparison1(e.target.value)}
                style={styles.select}
              >
                {Object.keys(categoriesData).map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.dropdown}>
              <label htmlFor="comparison2" style={styles.label}>
                Compare Second Category:
              </label>
              <select
                id="comparison2"
                value={comparison2}
                onChange={(e) => setComparison2(e.target.value)}
                style={styles.select}
              >
                {Object.keys(categoriesData).map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Chart Rendering */}
          <div style={styles.chartContainer}>
            {chartType === 'Bar' ? (
              <Bar
                data={getSelectedChartData()}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            ) : (
              <Pie
                data={getSelectedChartData()}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            )}
          </div>

          {/* Area of Improvement */}
          <div style={styles.improvementSection}>
            <h2 style={styles.sectionTitle}>Areas of Improvement</h2>
            <div style={styles.improvementContent}>
              {/* Left Side: Chart */}
              <div style={styles.chartContainer}>
                <h3>Graphical Representation</h3>
                <Bar
                  data={getImprovementData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.raw.toFixed(2)}%`,
                        },
                      },
                    },
                  }}
                />
              </div>

              {/* Right Side: Suggestions */}
              <div style={styles.suggestionsContainer}>
                <h3 style = {styles.suggestionTitle}>Suggestions</h3>
                <ul style={styles.suggestionsList}>
                  {getImprovementSuggestions().map((suggestion, index) => (
                    <li key={index} style={styles.suggestionText}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    marginTop : '30px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop : '20px',
    padding: '0px 20px', // Add some padding for spacing from the edges
  },
  backButton: {
    marginTop : '20px',
    padding: '20px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    position: 'absolute',
    left: '30px', // Ensure the button is on the left corner
    top : '20px',
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color : 'rgb(76, 175, 80)',
  },
  content: {
    padding: '20px',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  pageContent: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    gap: '20px',
  },
  statItem: {
    textAlign: 'center',
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  statValue: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
  },
  feedbackSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  chartContainer: {
    marginBottom: '30px',
    position: 'relative',
    height: '300px', // Adjust height here
    width: '48%', // Adjust width here for better spacing
  },
  feedbackDetails: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    paddingTop : '90px'
  },
  dropdown: {
    flex: 1,
    margin: '0 10px',
  },
  chartContainer: {
    height: '400px',
    width: '100%',
    position: 'relative',
    paddingTop : '10px'
    
  },
  dropdown: {
    marginBottom: '20px', // Adjust spacing between dropdowns if needed
  },
  label: {
    fontSize: '19px',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
    color: '#333',
  },
  select: {
    height: '40px', // Adjust height
    width: '200px', // Adjust width
    padding: '5px', // Add padding for better appearance
    fontSize: '16px', // Adjust font size
    borderRadius: '5px', // Add border radius for smooth edges
    border: '1px solid #ccc', // Add border for definition
  },
  improvementSection: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif', 
    lineHeight: '1.8', // Space between lines
  },
  suggestionText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '10px', // Space between individual suggestions
    fontFamily: 'monospace',
  },
  suggestionTitle : {
    paddingTop : '60px',
    marginTop : '10px',
  }
  
  
  
};

export default Reports;
