import React, { useState } from 'react';
import axios from 'axios';
import feedbackImage from '../images/customer-feedback.jpg'


const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [feedbackId, setFeedbackId] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !category || !message) {
      alert('All fields are required!');
      return;
    }

    try {
      const feedbackData = {
        name,
        email,
        category,
        message,
      };

      const response = await axios.post('http://localhost:5000/api/feedback/submit', feedbackData);

      if (response.status === 201) {
        setFeedbackId(response.data.feedbackId);
        setStatus('Feedback submitted successfully!');
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('Error submitting feedback. Please try again.');
    }
  };

  const copyFeedbackId = () => {
    navigator.clipboard.writeText(feedbackId).then(() => {
      alert('Feedback ID copied to clipboard!');
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        {!formSubmitted ? (
          <>
            <h2 style={styles.title}>Submit Feedback</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  style={styles.input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div style={styles.formGroup}>
                <label>Email:</label>
                <input
                  style={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div style={styles.formGroup}>
                <label>Category:</label>
                <select
                  style={styles.input}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Compliment">Compliment</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label>Message:</label>
                <textarea
                  style={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your feedback"
                />
              </div>

              <button style={styles.button} type="submit">Submit Feedback</button>
            </form>
          </>
        ) : (
          <div style={styles.successBox}>
            <h3 style={styles.successMessage}>{status}</h3>
            <p style={styles.feedbackId}>Your feedback ID is:</p>
            <div style={styles.feedbackIdBox}>
              <p style={styles.feedbackId}>{feedbackId.toUpperCase()}</p>
              <button style={styles.copyButton} onClick={copyFeedbackId}>Copy</button>
            </div>
            <p style={styles.trackMessage}>
              You can track your feedback status by using the feedback ID above.
            </p>
          </div>
        )}
      </div>
      <div style={styles.rightSection}>
      <img
      src={feedbackImage}
      alt="Feedback illustration"
      style={styles.image}
      />

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
    marginTop : '80px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    padding: '20px',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
   
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
   
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    width: '100%',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  successBox: {
    padding: '40px',
    margin: '30px',
    border: '2px solid #4CAF50',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    textAlign: 'center',
  },
  successMessage: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  feedbackId: {
    fontSize: '18px',
    margin: '10px 0',
  },
  feedbackIdBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
    padding: '10px',
    borderRadius: '5px',
  },
  copyButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  trackMessage: {
    fontSize: '16px',
    marginTop: '10px',
    color: '#333',
  },
};

export default Feedback;
