import React, { useState } from 'react';
import axios from 'axios';
import customerServiceImg from '../images/Customer-service.jpg';

const TrackFeedback = () => {
  const [feedbackId, setFeedbackId] = useState('');
  const [feedbackDetails, setFeedbackDetails] = useState(null);
  const [error, setError] = useState('');
  const [isTracked, setIsTracked] = useState(false);

  const handleTrackFeedback = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/feedback/${feedbackId}`);
      setFeedbackDetails(response.data);
      setError('');
      setIsTracked(true);
    } catch (err) {
      setError('Feedback not found');
      setFeedbackDetails(null);
      setIsTracked(false);
    }
  };

  const handleBack = () => {
    setIsTracked(false);
    setFeedbackId('');
    setFeedbackDetails(null);
    setError('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <img
          src={customerServiceImg}
          alt="Track Feedback illustration"
          style={styles.image}
        />
      </div>
      <div style={styles.rightSection}>
        {!isTracked ? (
          <>
            <h1 style={styles.heading}>Track Your Feedback</h1>
            <p style={styles.subHeading}>Enter your feedback ID to track the status of your feedback.</p>
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Enter Feedback ID"
                value={feedbackId}
                onChange={(e) => setFeedbackId(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleTrackFeedback} style={styles.button}>Track Feedback</button>
            </div>
            {error && <p style={styles.error}>{error}</p>}
          </>
        ) : (
          <div style={styles.feedbackDetails}>
            <h2 style={styles.feedbackTitle}>Feedback Details</h2>
            <div style={styles.feedbackField}>
              <strong>Name:</strong> {feedbackDetails.name}
            </div>
            <div style={styles.feedbackField}>
              <strong>Email:</strong> {feedbackDetails.email}
            </div>
            <div style={styles.feedbackField}>
              <strong>Category:</strong> {feedbackDetails.category}
            </div>
            <div style={styles.feedbackField}>
              <strong>Message:</strong> {feedbackDetails.message}
            </div>
            <div style={styles.feedbackField}>
              <strong>Status:</strong> {feedbackDetails.status}
            </div>
            <div style={styles.feedbackField}>
              <strong>Reply:</strong> {feedbackDetails.reply || 'No reply yet'}
            </div>
            <button onClick={handleBack} style={styles.backButton}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    marginTop : '80px'
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  rightSection: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  },
  subHeading: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    width: '80%',
    maxWidth: '400px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    fontSize: '16px',
    marginTop: '10px',
  },
  feedbackDetails: {
    textAlign: 'left',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  feedbackTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  feedbackField: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#444',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};

export default TrackFeedback;
