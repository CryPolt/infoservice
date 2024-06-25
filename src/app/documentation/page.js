"use client"
import React, { useState, useEffect } from 'react';
import { Header } from '../(components)/header/header';
import { Left } from '../(components)/leftside/left';
import styles from './page.module.css';
import Link from 'next/link';

export default function Documentation() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/service');
                if (!response.ok) {
                    console.log('Data fetch failed');
                    return;
                }
                const data = await response.json();
                console.log(data);
                if (data.status === 200) {
                    const activeServices = data.body.filter(item => item.isactive === 1);
                    const mappedServices = activeServices.map(item => ({ id: item.id, title: item.title }));
                    setServices(mappedServices);
                } else {
                    console.log('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once

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
                    Welcome to the documentation page. Here you can find all the information you need to get started.
                </div>
                <div className={styles.codeBlock}>
                    <code>
                        {`import {Header} from '../(components)/header/header'
import {Left} from '../(components)/leftside/left'
import styles from './page.module.css';

export default function Documentation(){
    return(
        <>
        <Header />
            <Left />
        </>
    )
}`}
                    </code>
                </div>
                <ul className={styles.bulletList}>
                    <li>Introduction</li>
                    <li>Getting Started</li>
                    <li>API Reference</li>
                </ul>
                <ol className={styles.numberedList}>
                    <li>Step 1: Install</li>
                    <li>Step 2: Setup</li>
                    <li>Step 3: Deploy</li>
                </ol>
            </div>
        </div>
            </>
    );
}
