import React, { useState, useEffect } from 'react';
import { Modal, Form, Spinner, Pagination } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import classes from './Home.module.css';
import search from '../../src/search.png';
import filter from '../../src/filter.png';
import settings from '../../src/settings.png';
import compose from '../../src/compose.png';
import inbox from '../../src/inbox.png';
import sent from '../../src/sent.png';
import draft from '../../src/draft.png';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const Home = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailHistory, setEmailHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentEmailHistory = emailHistory.slice(indexOfFirstItem, indexOfLastItem);



  useEffect(() => emailjs.init("EkDF2wEkN_g8bfdUo"), []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSendEmails = async (e) => {
    e.preventDefault();
    const serviceId = "service_y3woryn";
    const templateId = "template_d4yk91t";

    try {
      setLoading(true);

      // Setting up the email send
      const emailSetup = () => emailjs.send(serviceId, templateId, {
        // to_name (to send to only names);
        to_email: recipients, // to send to emails
        from_name: "Oladayo Olabode",
        message: message,
      });

      // Brief delay to show spinner
      setTimeout(() => {
        // Clearing the form and closing the modal
        setRecipients('');
        setMessage('');
        handleClose();
        alert("Email scheduled to be sent in 2 minutes.");

        // Introducing a 2-minute delay before sending the email
        setTimeout(async () => {
          try {
            await emailSetup();
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }, 120000); // 120000 milliseconds = 2 minutes
      }, 2000); // 2000 milliseconds = 2 seconds

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const userId = "EkDF2wEkN_g8bfdUo";
  const accessToken = "c1oEoY2HPcyX5Y3DmSHVD"

  useEffect(() => {
    const fetchEmailHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.emailjs.com/api/v1.1/history?user_id=${userId}&accessToken=${accessToken}&page=1&count=1000`, {
        });
        setEmailHistory(response.data?.rows);
        console.log(response.data?.rows);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailHistory();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleModalClose = () => {
    setSelectedEmail(null);
  };

  const totalPages = Math.ceil(emailHistory.length / itemsPerPage);

// Logic to calculate the start and end indexes of items for the current page
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage - 1, emailHistory.length - 1);

// Function to handle next and previous page clicks
const handleNextPage = () => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};


  return (
    <div className={classes.container}>
      <div className={classes.container2}>
        <div className={classes.innerContainer}>
          <p style={{ fontSize: 25 }}>BEDS</p>
          <div className={classes.search}>
            <img src={search} alt="search" />
            <input type="text" placeholder="Search Mail" />
            <img src={filter} alt="filter" />
          </div>
         
        </div>

        <div onClick={handleShow} className={classes.compose}>
          <div style={{ display: "flex", alignItems: "center", gap: 15, padding: 5, marginLeft: 10 }}>
            <img src={compose} alt="compose" />
            <h3 style={{ fontSize: 20, marginTop: 7 }}>Compose</h3>
          </div>
        </div>

       

<div className={classes.mails}>
  {isLoading ? (
    <p style={{marginLeft: 20}}>Fetching history...</p>
  ) : (
    <>
      <h1>Email History</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Created Date</th>
            <th>Service Used</th>
            <th>Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmailHistory.map((email, index) => (
            <tr key={index}>
              <td>{new Date(email.created_at).toLocaleString()}</td>
              <td>{email.provider === "Gmail_API" ? "Gmail" : "Others"}</td>
              <td>{email.result === 1 ? "Success" : "Failed"}</td>
              <td>
                <div onClick={() => handleEmailClick(email)}  className={classes.eyeButton}>
                <i className="far fa-eye" style={{color: "green", }}></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
  <Pagination className={classes.pagination}>
      <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Pagination.Prev>
      {Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === currentPage}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Pagination.Next>
    </Pagination>
</div>
</div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Emails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="recipients">
            <Form.Label>Recipients Name</Form.Label>
            <Form.Control type="text" value={recipients} onChange={(e) => setRecipients(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendEmails}>
            {loading ? (
              <Spinner size='sm' animation='border' />
            ) : (
              'Send'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={!!selectedEmail} onHide={handleModalClose} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Email Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedEmail && (
      <div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td><strong>History ID:</strong></td>
              <td>{selectedEmail.id}</td>
            </tr>
            <tr>
              <td><strong>Error Description:</strong></td>
              <td>{selectedEmail.error === null ? "No Error" : selectedEmail?.error}</td>
            </tr>
            <tr>
              <td><strong>Provider ID:</strong></td>
              <td>{selectedEmail.provider}</td>
            </tr>
            <tr>
  <td><strong>Send Process Time:</strong></td>
  <td>{selectedEmail.send_time ? `${(selectedEmail.send_time / 1000).toFixed(2)}s` : 'N/A'}</td>
</tr>
            <tr>
  <td><strong>Service ID:</strong></td>
  <td>{selectedEmail?.service_id}</td>
</tr>
            <tr>
  <td><strong>Original Service ID:</strong></td>
  <td>{selectedEmail?.service_id}</td>
</tr>
            <tr>
  <td><strong>Template ID:</strong></td>
  <td>{selectedEmail?.template_id}</td>
</tr>
            <tr>
  <td><strong>Attachments:</strong></td>
  <td>{selectedEmail?.files === "[]" ? "No files attached" : selectedEmail?.files}</td>
</tr>
            <tr>
              <td><strong>Updated:</strong></td>
              <td>{new Date(selectedEmail.updated_at).toLocaleString()}</td>
            </tr>
            
            {/* <tr>
              <td><strong>Template:</strong></td>
              <td>{selectedEmail.template_params}</td>
            </tr> */}
            <tr>
              <td><strong>Result:</strong></td>
              <td>{selectedEmail.result === 1 ? "Success" : "Failed"}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleModalClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default Home;
