"use client"
import React, { useState, useEffect } from 'react';
import { Header } from '../(components)/header/header';
import { AboutContent } from './about/page';
import styles from './page.module.css';
import Link from 'next/link';
import { getDocumentation } from '../actions/Documentation';
import { getService } from '../actions/Service';

export default function Documentation() {
    const [documents, setDocuments] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState(null);
    const [documentsOpen, setDocumentsOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [aboutContent, setAboutContent] = useState(null);

    useEffect(() => {
        fetchDocumentation();
        fetchServices();
    }, []);

    const fetchDocumentation = () => {
        getDocumentation()
            .then(response => {
                if (response.status === 200) {
                    setDocuments(response.body.data);
                } else {
                    throw new Error('Failed to fetch documentation');
                }
            })
            .catch(error => {
                console.error('Error fetching documentation:', error);
                setError('Failed to fetch documentation. Please try again later.');
            });
    };

    const fetchServices = () => {
        getService()
            .then(response => {
                if (response.status === 200) {
                    setServices(response.body.data);
                } else {
                    throw new Error('Failed to fetch services');
                }
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                setError('Failed to fetch services. Please try again later.');
            });
    };

    const toggleDocuments = () => {
        setDocumentsOpen(!documentsOpen);
    };

    const toggleServices = () => {
        setServicesOpen(!servicesOpen);
    };

    const handleDocumentClick = (document) => {
        setSelectedDocument(document);
        setSelectedService(null);
        setAboutContent(null); // Clear the "About Content" if another item is selected
    };

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setSelectedDocument(null);
        setAboutContent(null); // Clear the "About Content" if another item is selected
    };

    const handleAboutClick = () => {
        // Load "About Content" when clicking on the respective item
        setAboutContent('Here will be information about the stack used.'); // Replace with actual content you want to display
    };

    return (
        <>
            <Header />

            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <ul className={styles.sidebarList}>
                        <li className={styles.sidebarListItem}>
                            <span className={styles.sidebarLink} onClick={toggleDocuments}>
                                {documentsOpen ? '▼' : '►'} Documents
                            </span>
                            {documentsOpen && (
                                <ul className={styles.sidebarNestedList}>
                                    {documents.map(document => (
                                        <li key={document.id} className={styles.sidebarListItem}>
                                            <span
                                                className={styles.sidebarLink}
                                                onClick={() => handleDocumentClick(document)}
                                            >
                                                {document.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className={styles.sidebarListItem}>
                            <span className={styles.sidebarLink} onClick={toggleServices}>
                                {servicesOpen ? '▼' : '►'} Services
                            </span>
                            {servicesOpen && (
                                <ul className={styles.sidebarNestedList}>
                                    {services.map(service => (
                                        <li key={service.id} className={styles.sidebarListItem}>
                                            <span
                                                className={styles.serviceLink}
                                                onClick={() => handleServiceClick(service)}
                                            >
                                                {service.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className={styles.sidebarListItem}>
                            {/* Handle click on "About Stack" */}
                            <span className={styles.sidebarLink} onClick={handleAboutClick}>
                                About Stack
                            </span>
                        </li>
                    </ul>
                </div>
                <div className={styles.content}>
                    {error ? (
                        <div className={styles.error}>
                            <p>{error}</p>
                        </div>
                    ) : selectedDocument ? (
                        <div className={styles.documentDetails}>
                            <h1>{selectedDocument.title}</h1>
                            <p>{selectedDocument.content}</p>
                        </div>
                    ) : selectedService ? (
                        <div className={styles.serviceDetails}>
                            <h1>{selectedService.title}</h1>
                            <p>{selectedService.description}</p>
                            <p>Status: {selectedService.isactive ? 'Active' : 'Inactive'}</p>
                        </div>
                    ) : aboutContent ? (
                        <AboutContent content={aboutContent} /> // Pass "About Content" to AboutContent component
                    ) : (
                        <div className={styles.defaultContent}>
                            <h1 className={styles.header}>Welcome to PAY Services Documentation</h1>
                            <p className={styles.paragraph}>
                                This site is intended for reading documentation on PAY services, which deals with SMS payments, card reissue, and issuance using microservices architecture.
                                Click on a document or service in the sidebar to see details.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}