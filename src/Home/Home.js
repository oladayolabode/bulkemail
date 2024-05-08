import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import classes from './Home.module.css'
import search from '../../src/search.png'
import filter from '../../src/filter.png'
import settings from '../../src/settings.png'
import compose from '../../src/compose.png'
import inbox from '../../src/inbox.png'
import sent from '../../src/sent.png'
import draft from '../../src/draft.png'


const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEmailChange = (selected) => {
    setSelectedEmails(selected);
  };

  const handleSendEmails = () => {
    // Send selectedEmails to your API or handle them as needed
    console.log(selectedEmails);
    handleClose();
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
        <div className={classes.asides}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Send Emails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Typeahead
              id="email-input"
              multiple
              onChange={handleEmailChange}
              options={[]} // Add your email options here if you have any
              placeholder="Enter email addresses..."
              selected={selectedEmails}
            />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSendEmails}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>

          <button className={classes.compose}>
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
    </div>
  )
}

export default Home