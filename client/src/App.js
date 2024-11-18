import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import TrackFeedback from './pages/TrackFeedback';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageFeedbacks from './pages/ManageFeedbacks';  
import Reports from './pages/Reports';  
import About from './pages/About';
import Footer from './components/Footer';  // Import Footer component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add the navbar */}
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/trackfeedback" element={<TrackFeedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
          <Route path="/manageFeedbacks" element={<ManageFeedbacks />} />  {/* Manage Feedbacks route */}
          <Route path="/reports" element={<Reports />} />  {/* Reports route */}
        </Routes>
      </div>
      <Footer /> {/* Footer added here */}
    </Router>
  );
};

const styles = {
  container: {
    paddingTop: '50px',
  },
};

export default App;
