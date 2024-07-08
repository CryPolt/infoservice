// components/main/main.js

import React from 'react';
import { Cards } from './cards'; 
import styles from './main.module.css';

export const Main = () => {
  return (
    <div className={styles.mainSection}>
      <Cards />
    </div>
  );
};
