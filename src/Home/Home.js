import React, { useState, useEffect } from 'react';
import {Modal, Form, Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import classes from './Home.module.css'
import search from '../../src/search.png'
import filter from '../../src/filter.png'
import settings from '../../src/settings.png'
import compose from '../../src/compose.png'
import inbox from '../../src/inbox.png'
import sent from '../../src/sent.png'
import draft from '../../src/draft.png'
import emailjs from '@emailjs/browser';


const Home = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => emailjs.init("EkDF2wEkN_g8bfdUo"), []);

  const handleEmailChange = (selected) => {
    setSelectedEmails(selected);
  };

 
  

  const handleSendEmails = async (e) => {
    e.preventDefault();
    const serviceId = "service_y3woryn";
    const templateId = "template_d4yk91t";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        to_name: recipients,
        from_name: "Oladayo Olabode",
       message: message,
      });
      setRecipients('');
      setMessage('');
      handleClose();
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.container2}>
        <div className={classes.innerContainer}>          
          <p>BEDS</p>
          <div className={classes.search}>
            <img src={search} alt="search"/>
            <input type="text" placeholder="Search Mail"/>
            <img src={filter} alt="filter"/>
          </div>
          <div className={classes.settings}>
            <img src={settings} alt="settings"/>
          </div>
        </div>
       
          <button onClick={handleShow} className={classes.compose}>
            <img src={compose} alt="compose"/>     
            <h3>COMPOSE</h3>
          </button>
          <div className={classes.sidebar}>
            <div>
              <img src={inbox} alt="inbox"/>
              <p>Inbox</p>
            </div>
            <div>
              <img src={sent} alt="sent"/>
              <p>Sent</p>
            </div>
            <div>
              <img src={draft} alt="draft"/>
              <p>Draft</p>
            </div>
          </div>
    
        <div className={classes.mails}>
          <div className={classes.inbox}>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
            <div className={classes.inboxmails}>
              <div>
                <p>Mail Header</p>
              </div>
              <div>
                <p>Mail Content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Send Emails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          <Form.Group controlId="recipients">
            <Form.Label>Recipients Name </Form.Label>
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
    </div>
  )
}

export default Home