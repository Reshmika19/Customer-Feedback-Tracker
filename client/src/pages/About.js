import React from 'react';
import { Link } from 'react-router-dom';
import customerServiceImg from '../images/9848264.jpg';  // Example image
import whatWeDoImg from '../images/5370010.jpg'; // Replace with actual image
import startNowImg from '../images/5413847.jpg';  // Replace with actual image
import { FaComments, FaTasks, FaUserShield } from 'react-icons/fa';

const About = () => {
  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.section}>
        <div style={styles.leftSection}>
          <img src={customerServiceImg} alt="Customer Service" style={styles.image} />
        </div>
        <div style={styles.rightSection}>
          <h1 style={styles.heading}>Welcome to Custrack!</h1>
          <p style={styles.subHeading}>Your go-to platform for tracking and managing customer feedback.</p>
          <p style={styles.description}>Custrack is a user-friendly platform designed to empower businesses by enabling them to efficiently track, categorize, and manage customer feedback.</p>
          <p style={styles.description}>Whether it's a suggestion, complaint, or compliment, Custrack makes it easy to respond to feedback and improve customer service.</p>
        </div>
      </div>

      {/* What We Do Section */}
      <div style={styles.section}>
        <div style={styles.rightSection}>
          <h2 style={styles.title}>What We Do</h2>
          <p style={styles.description}>
            Custrack is designed to help businesses gather, categorize, and track customer feedback — whether it's complaints, suggestions, or compliments. It empowers businesses to act upon feedback to improve customer service.
          </p>
        </div>
        <div style={styles.leftSection}>
          <img src={whatWeDoImg} alt="What We Do" style={styles.image} />
        </div>
        
      </div>

      {/* How It Works Section */}

      <div style={styles.section}>
      <div style={styles.steps}>
        <div style={styles.step}>
            <FaComments size={40} style={styles.icon} /> {/* Icon for Feedback */}
            <p style={styles.stepTitle}><strong>Feedback</strong></p>
            <p style={styles.stepDescription}>Submit feedback and receive a unique feedback ID.</p>
        </div>
        <div style={styles.step}>
            <FaTasks size={40} style={styles.icon} /> {/* Icon for Status */}
            <p style={styles.stepTitle}><strong>Status</strong></p>
            <p style={styles.stepDescription}>Track your feedback using the feedback ID to check status.</p>
        </div>
        <div style={styles.step}>
            <FaUserShield size={40} style={styles.icon} /> {/* Icon for Admin */}
            <p style={styles.stepTitle}><strong>Admin</strong></p>
            <p style={styles.stepDescription}>Admins can categorize, update the status, and reply to feedback.</p>
        </div>
        </div>
        </div>

      {/* Start Now Section */}
      <div style={styles.section}>
        <div style={styles.leftSection}>
          <img src={startNowImg} alt="Start Now" style={styles.image} />
        </div>
        <div style={styles.rightSection}>
          <h2 style={styles.title}>Get Started with Custrack Today!</h2>
          <p style={styles.description}>Track feedback, improve customer service, and grow your business with Custrack.</p>
          <button style={styles.button} onClick={() => window.location.href = 'mailto:customerfeedbacktracker@gmail.com'}>Start Now</button>
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
  section: {
    display: 'flex',
    marginBottom: '60px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
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
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  icon: {
    color: '#4CAF50',
    marginBottom: '10px',
  },
  
  subHeading: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    color: '#444',
    lineHeight: '1.6',
    fontFamily: '"Arial", sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  titleCenter: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  steps: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '30px',
  },
  step: {
    fontSize: '16px',
    color: '#444',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  stepDescription: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.4',
  },
  icon: {
    width: '40px',
    height: '40px',
    marginBottom: '10px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default About;
