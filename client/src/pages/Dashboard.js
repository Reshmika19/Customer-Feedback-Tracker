import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  // State for feedback data, loading, error, and filters
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [replyFilter, setReplyFilter] = useState('All'); // Reply filter state

  // Categories, Statuses, and Replies for filters
  const categories = ['All', 'Complaint', 'Suggestion', 'Compliment'];
  const statuses = ['All', 'Pending', 'In Progress', 'Resolved'];
  const replies = ['All', 'No Reply', 'Replied'];

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback/all');
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Error fetching feedback data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Filter feedbacks based on selected filters
  useEffect(() => {
    let filtered = [...feedbacks];

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(feedback => feedback.category === categoryFilter);
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(feedback => feedback.status === statusFilter);
    }

    if (replyFilter !== 'All') {
      filtered = filtered.filter(feedback =>
        replyFilter === 'No Reply'
          ? !feedback.reply || feedback.reply.trim() === ''
          : feedback.reply && feedback.reply.trim() !== ''
      );
    }

    setFilteredFeedbacks(filtered);
  }, [categoryFilter, statusFilter, replyFilter, feedbacks]);

  // Handle Category, Status, and Reply filter changes
  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleReplyChange = (e) => setReplyFilter(e.target.value);

  // Handle logout
  const handleLogout = () => navigate('/login');

  // Render Feedback List
  const renderFeedbacks = () => (
    <div>
      <h1 style={styles.header}>Customer Feedbacks</h1>
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Message</th>
              <th>Status</th>
              <th>Reply</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback, index) => (
                <tr
                  key={feedback.feedbackId}
                  style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                >
                  <td style={styles.tableCell}>{feedback.name}</td>
                  <td style={styles.tableCell}>{feedback.email}</td>
                  <td style={styles.tableCell}>{feedback.category}</td>
                  <td style={styles.tableCell}>{feedback.message}</td>
                  <td style={styles.tableCell}>{feedback.status}</td>
                  <td style={styles.tableCell}>{feedback.reply || 'No reply'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.tableCell}>No feedbacks available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.sideNav}>
        <h2>Dashboard</h2>

        {/* Filter Dropdowns */}
        <div style={styles.navItem}>
          <label style={styles.filterLabel}>Category:</label>
          <select
            style={styles.filterSelect}
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.navItem}>
          <label style={styles.filterLabel}>Status:</label>
          <select
            style={styles.filterSelect}
            value={statusFilter}
            onChange={handleStatusChange}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.navItem}>
          <label style={styles.filterLabel}>Reply:</label>
          <select
            style={styles.filterSelect}
            value={replyFilter}
            onChange={handleReplyChange}
          >
            {replies.map(replyOption => (
              <option key={replyOption} value={replyOption}>
                {replyOption}
              </option>
            ))}
          </select>
        </div>

        {/* Tab Navigation */}
        <div style={styles.navItem}>
          <button
            style={styles.tabButton}
            onClick={() => {
              setCategoryFilter('All');
              setStatusFilter('All');
              setReplyFilter('All');
            }}
          >
            All Feedbacks
          </button>
        </div>
        <div style={styles.navItem}>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate('/manageFeedbacks')} // Adjust the route as needed
          >
            Manage Feedbacks
          </button>
        </div>

        {/* Report Button */}
        <div style={styles.navItem}>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate('/reports')} // Adjust the route as needed
          >
            Reports
          </button>
        </div>

        {/* Logout Button */}
        <div style={styles.navItem}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {renderFeedbacks()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',
    backgroundColor: '#f9f9f9',
    height: '100vh',
    marginTop: '0px', 
  },
  sideNav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: 'calc(100vh - 75px)',
    background: 'rgb(51, 51, 51)',
    padding: '20px',
    color : 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    marginTop: '72px', // Adjust gap below navbar
  },
  sideNavTitle: {
    color: 'white', // Text color for sidebar title
  },
  navItem: {
    marginBottom: '20px',
  },
  mainContent: {
    marginLeft: '260px', // Adjust the width for side nav
    paddingTop: '30px',
    paddingLeft: '30px',
    flex: 1,
    overflowY: 'scroll',
    height: 'calc(100vh - 50px)', // To make the content scrollable below the navbar
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '12px 20px',
    textAlign: 'left',
    verticalAlign: 'middle',
  },
  tableHeader: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '12px 20px',
    height: '50px',
  },
  tableRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  tableRowAlt: {
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  logoutButton: {
    padding: '12px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tabButton: {
    padding: '12px 20px',
    backgroundColor: 'rgb(76, 175, 80)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  secondaryButton: {
    padding: '12px 20px',
    backgroundColor: 'rgb(76, 175, 80)',
    color: 'white',
    border: '1px solid rgb(76, 175, 80)', 
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  filterLabel: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  filterSelect: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    marginBottom: '15px',
  },
  header: {
    color: 'rgb(76, 175, 80)',
    textAlign: 'center',
    // Adds some space below the header
  }
};

export default Dashboard;
