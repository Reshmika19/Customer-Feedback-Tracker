import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';  // Import edit icon

const ManageFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [status, setStatus] = useState('');
  const [reply, setReply] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback/all');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  // Open the modal and set the feedback data
  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setStatus(feedback.status);
    setReply(feedback.reply);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
    setStatus('');
    setReply('');
  };

  // Handle update feedback
  const handleUpdate = async () => {
    if (!status && !reply) {
      alert('At least status or reply must be provided!');
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/feedback/update-feedback/${selectedFeedback.feedbackId}`,
        { status, reply }
      );
      alert(response.data.message);
      // Update the feedback list with updated feedback
      setFeedbacks(feedbacks.map(fb => fb.feedbackId === selectedFeedback.feedbackId ? response.data.feedback : fb));
      closeModal();
    } catch (error) {
      console.error('Error updating feedback:', error);
      alert('Error updating feedback');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
        <h1 style={styles.navTitle}>Manage Feedbacks</h1>
      </div>

      <div style={styles.content}>
        

        {/* Feedback Table */}
        <div style={styles.pageContent}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableCell}>Name</th>
                <th style={styles.tableCell}>Email</th>
                <th style={styles.tableCell}>Category</th>
                <th style={styles.tableCell}>Message</th>
                <th style={styles.tableCell}>Status</th>
                <th style={styles.tableCell}>Reply</th>
                <th style={styles.tableCell}>Update</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.feedbackId} style={feedback.status === 'Resolved' ? styles.tableRowAlt : styles.tableRow}>
                  <td style={styles.tableCell}>{feedback.name}</td>
                  <td style={styles.tableCell}>{feedback.email}</td>
                  <td style={styles.tableCell}>{feedback.category}</td>
                  <td style={styles.tableCell}>{feedback.message}</td>
                  <td style={styles.tableCell}>{feedback.status}</td>
                  <td style={styles.tableCell}>{feedback.reply}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.updateButton}
                      onClick={() => openModal(feedback)}
                    >
                      <FaEdit style={styles.editIcon} /> {/* Use edit icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for updating feedback */}
        {isModalOpen && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Update Feedback</h3>
              <div style={styles.modalField}>
                <label style={styles.boldText}>Name:</label>
                <span style={styles.inlineField}>{"\u00A0\u00A0"}{selectedFeedback.name}</span>
              </div>
              <div style={styles.modalField}>
                <label style={styles.boldText}>Email:</label>
                <span style={styles.inlineField}>{"\u00A0\u00A0"}{selectedFeedback.email}</span>
              </div>
              <div style={styles.modalField}>
                <label style={styles.boldText}>Category:</label>
                <span style={styles.inlineField}>{"\u00A0\u00A0"}{selectedFeedback.category}</span>
              </div>
              <div style={styles.modalField}>
                <label style={styles.boldText}>Message:</label>
                <span style={styles.inlineField}>{"\u00A0\u00A0"}{selectedFeedback.message}</span>
              </div>
              <div style={styles.modalField}>
                <label style={styles.boldText}>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={styles.selectInput}
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
              <div style={styles.modalField}>
                <label style={styles.boldText}>Reply:</label>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter reply"
                  style={styles.textarea}
                />
              </div>
              <div style={styles.buttonContainer}>
                <button style={styles.updateButtons} onClick={handleUpdate}>
                  Update
                </button>
                <button style={styles.closeButton} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    width: '100%',
    padding: '20px 20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center', // Center the title
    alignItems: 'center',
    position: 'relative',
  },
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
    paddingTop : '0px',
    padding: '20px',
  },
  backButton: {
    padding: 'absolute',
    left: '30px',
    marginTop : '25px',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  pageContent: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '12px 20px',
    height: '50px',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '12px 20px',
    textAlign: 'center',
    verticalAlign: 'middle',
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
  updateButton: {
    padding: '10px 20px',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  updateButtons: {
    padding: '10px 20px',
    backgroundColor: 'rgb(76, 175, 80)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editIcon: {
    fontSize: '20px', // Adjust the size of the icon
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '60%',
    maxWidth: '600px',
  },
  modalField: {
    marginBottom: '10px',
  },
  boldText: {
    fontWeight: 'bold',
  },
  inlineField: {
    display: 'inline-block',
    marginLeft: '10px',
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ManageFeedbacks;
