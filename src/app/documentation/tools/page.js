import React from 'react';
import { Header } from '../../(components)/header/header';
import styles from './page.module.css';

export default function Tools() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <h1 className={styles.header}>Используемые инструменты</h1>
                    <div className={styles.paragraph}>
                        <p>
                            Здесь можете разместить информацию о стеке инструментов команды PAY:
                        </p>
                        <ul>
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>Node.js</li>
                            <li>MySQL</li>
                            <li>Swagger</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}