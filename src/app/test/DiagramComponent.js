// DiagramViewer.js

import React from 'react';
import styles from './DiagramViewer.module.css';

const DiagramViewer = () => {
    return (
        <div className={styles.scheme}>
            <div className={styles.row}>
                <div className={`${styles.side} ${styles.onLeft}`}></div>
                <div className={`${styles.side} ${styles.onCenter}`}>
                    <div className={styles.elem}>lorem</div>
                </div>
                <div className={`${styles.side} ${styles.onRight}`}></div>
            </div>

            <div className={styles.row}>
                <div className={`${styles.side} ${styles.onLeft}`}>
                    <div className={styles.elem}>lorem</div>
                    <div className={styles.elem}>lorem</div>
                    <div className={styles.elem}>lorem</div>
                </div>
                <div className={`${styles.side} ${styles.onCenter}`}>
                    <div className={styles.elem}>lorem</div>
                </div>
                <div className={`${styles.side} ${styles.onRight}`}>
                    <div className={styles.elem}>lorem</div>
                </div>
            </div>

            {/* Add more rows as needed */}

        </div>
    );
};

export default DiagramViewer;
