// components/Leftside.js

import React from 'react';
import Link from 'next/link';
import styles from './leftside.module.css';

const Leftside = ({ setSelectedPage }) => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <div className={styles.link} onClick={() => setSelectedPage('dashboard')}>
            Dashboard
          </div>
        </li>
        <li>
          <div className={styles.link} onClick={() => setSelectedPage('users')}>
            Users
          </div>
        </li>
        <li>
          <div className={styles.link} onClick={() => setSelectedPage('posts')}>
            Posts
          </div>
        </li>
        <li>
          <div className={styles.link} onClick={() => setSelectedPage('settings')}>
            Settings
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Leftside;
