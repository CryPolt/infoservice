"use client"
import React, {useState} from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, description, onUpdate }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleUpdate = () => {
      onUpdate(newTitle, newDescription); 
      onClose(); 
  };

  return (
      <div className={isOpen ? styles.overlay : styles.hidden}>
          <div className={styles.modal}>
              <div className={styles.header}>
                  <h2>Edit Element</h2>
                  <button onClick={onClose} className={styles.closeButton}>&times;</button>
              </div>
              <div className={styles.body}>
                  <label htmlFor="title">Title:</label>
                  <input
                      type="text"
                      id="title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <label htmlFor="description">Description:</label>
                  <textarea
                      id="description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Save Changes</button>
              </div>
          </div>
      </div>
  );
};

export default Modal;