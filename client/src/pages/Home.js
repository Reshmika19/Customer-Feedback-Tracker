import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import customerServiceImg from '../images/5393073.jpg'; // Add your image here
import feedbackFormImg from '../images/submitfeedback.png'; // Add feedback form image here
import trackIdScreenImg from '../images/id.png'; // Add screenshot with track ID here

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.section}>
        {/* Left Section: Image */}
        <div style={styles.leftSection}>
          <img src={customerServiceImg} alt="Customer Service" style={styles.image} />
        </div>

        {/* Right Section: Text Content */}
        <div style={styles.rightSection}>
          <h1 style={styles.heading}>
            Welcome to <span style={styles.custrack}>Custrack!</span>
          </h1>
          <p style={styles.subHeading}>Track, update, and manage customer feedback efficiently!</p>
          <br />
          <p style={styles.description}>
            A tool to collect, categorize, and track customer feedback (complaints, suggestions, compliments). Admins can manage feedback status and generate basic reports to identify trends and areas for improvement in customer service.
          </p>
          
          {/* Know More Button */}
          <Link to="/about" style={styles.button}>Know More About Us</Link>
        </div>
      </div>

      {/* New Section: How to Submit Feedback */}
      <div style={styles.feedbackSection}>
        <h2 style={styles.sectionTitle}>How to Submit Feedback</h2>
        <div style={styles.feedbackContainer}>
          {/* Left Div: Feedback Form Image */}
          <div style={styles.feedbackStep}>
            <img src={feedbackFormImg} alt="Feedback Form" style={styles.feedbackImage} />
          </div>

          {/* Middle Div: Steps */}
          <div style={styles.feedbackStep}>
            <h3 style={styles.stepsTitle}>Steps</h3>
            <ol style={styles.stepsList}>
              <li style={styles.stepItem}>Enter your name and email.</li>
              <li style={styles.stepItem}>Select the category (complaint, suggestion, or compliment).</li>
              <li style={styles.stepItem}>Write your message in the message box.</li>
              <li style={styles.stepItem}>Click "Submit Feedback".</li>
              <li style={styles.stepItem}>Once submitted, a track ID will be displayed.</li>
              <li style={styles.stepItem}>A confirmation email will be sent to you with the track ID.</li>
            </ol>
          </div>

          {/* Right Div: Track ID Screen Image */}
          <div style={styles.feedbackStep}>
            <img src={trackIdScreenImg} alt="Track ID Screen" style={styles.feedbackImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    paddingTop: '100px',
  },
  custrack: {
    color: '#4CAF50', // Color for "Custrack!"
  },
  section: {
    display: 'flex',
    marginBottom: '60px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  leftSection: {
    width: '45%',
  },
  rightSection: {
    width: '50%',
    paddingLeft: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '20px',
    marginBottom: '20px',
    fontFamily: "'Dancing Script', cursive", // Cursive font style
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    fontFamily: "'Georgia', serif", // Different font style for description
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },

  // New Section: How to Submit Feedback
  feedbackSection: {
    marginTop: '80px',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  sectionTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  feedbackContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  feedbackStep: {
    width: '30%',
    textAlign: 'center',
    marginBottom: '20px',
  },
  feedbackImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  stepsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  stepsList: {
    fontSize: '18px',
    textAlign: 'left',
    paddingLeft: '20px',
    marginTop: '10px', // Add margin to the top
  },
  // Add this new style for the list items:
  stepItem: {
    marginBottom: '10px', // Space between each list item
  }
};

export default Home;
