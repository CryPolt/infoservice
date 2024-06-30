// components/Modal.js
import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.body}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
