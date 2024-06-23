import React from 'react';
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modal}>
                {children}
                <button className={styles.btnclose} onClick={onClose}>Close</button>
            </div>
        </>
    );
};

export default Modal;
