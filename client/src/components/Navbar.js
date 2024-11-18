// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h1 style={styles.logo}>Custrack</h1>
      </div>
      <ul style={styles.center}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/feedback" style={styles.navLink}>Feedback</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/trackfeedback" style={styles.navLink}>Track Feedback</Link>
        </li>
      </ul>
      <div style={styles.right}>
        <Link to="/login" style={styles.loginButton}>Login</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333', // Black theme
    padding: '15px 30px',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'fixed',  // Makes the navbar fixed at the top
    top: '0',
    left: '0',
    right: '0',
    zIndex: 1000,
    marginBottom : '20px',
  },
  left: {
    flex: '1',
    marginLeft: '20px', // Added margin to ensure the logo stays at a distance from the edge
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'rgb(76, 175, 80)', // Theme color for the logo
    margin: 0,
  },
  center: {
    flex: '2',
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '5px 10px',
    transition: 'color 0.3s, background-color 0.3s',
  },
  navLinkHover: {
    backgroundColor: '#555',
    color: '#fff',
    borderRadius: '5px',
  },
  right: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20px', // Added margin for spacing
  },
  loginButton: {
    backgroundColor: 'rgb(76, 175, 80)', // Theme color for the button
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontWeight: 'bold',
    marginLeft: 'auto', // Ensures the Login button is aligned to the right
  },
  loginButtonHover: {
    backgroundColor: 'rgb(56, 142, 60)', // Lighter shade of theme color on hover
  },
};

export default Navbar;
