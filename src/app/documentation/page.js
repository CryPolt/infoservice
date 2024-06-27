"use client"
import React, { useState, useEffect } from 'react';
import { Header } from '../(components)/header/header';
import { Left } from '../(components)/leftside/left';
import styles from './page.module.css';
import Link from 'next/link';

export default function Documentation() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/api/service')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Data fetch failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 200) {
                    const activeServices = data.body.data.filter(item => item.isactive === 1);
                    const mappedServices = activeServices.map(item => ({ id: item.id, title: item.title }));
                    setServices(mappedServices);
                } else {
                    console.log('Failed to fetch data');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Header />

            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <Left />
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.serviceTitles}>
                        <h1>Active Service Titles</h1>
                        {services.length > 0 ? (
                            <ul>
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <Link href={`/service/${service.id}`}>
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No active service titles available.</p>
                        )}
                    </div>

                    <div className={styles.header}>Documentation</div>
                    <div className={styles.paragraph}>
                        Welcome Documentation
                    </div>
                    <div className={styles.codeBlock}>
                        <code>
                            {`import {Header} from `}
                        </code>
                    </div>
                    <ul className={styles.bulletList}>
                        <li>Example</li>
                        <li>Example</li>
                        <li>Example</li>
                    </ul>
                    <ol className={styles.numberedList}>
                        <li>Example</li>
                        <li>Example</li>
                        <li>Example</li>
                    </ol>
                </div>
            </div>
        </>
    );
}
