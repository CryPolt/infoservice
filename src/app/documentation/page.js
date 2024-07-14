"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../(components)/header/header';
import styles from './page.module.css';
import { getDocumentation } from '../actions/Documentation';
import { getService } from '../actions/Service';
import Notes from './Notes';

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

    const fetchDocumentation = async () => {
        try {
            const response = await getDocumentation(1, 10);
            console.log('Fetched Documents:', response); // Debugging
            if (response.status === 200) {
                setDocuments(response.body.data);
            } else {
                throw new Error('Failed to fetch documentation');
            }
        } catch (error) {
            console.error('Error fetching documentation:', error);
            setError('Failed to fetch documentation. Please try again later.');
        }
    };

    const fetchServices = async () => {
        try {
            const response = await getService();
            console.log('Fetched Services:', response); // Debugging
            if (response.status === 200) {
                setServices(response.body.data);
            } else {
                throw new Error('Failed to fetch services');
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setError('Failed to fetch services. Please try again later.');
        }
    };

    const toggleDocuments = () => setDocumentsOpen(!documentsOpen);

    const toggleServices = () => setServicesOpen(!servicesOpen);

    const handleDocumentClick = (document) => {
        console.log('Document clicked:', document);
        setSelectedDocument(document);
        setSelectedService(null);
        setAboutContent(null);
    };

    const handleServiceClick = (service) => {
        console.log('Service clicked:', service);
        setSelectedService(service);
        setSelectedDocument(null);
        setAboutContent(null);
    };

    const handleAboutClick = () => {
        setAboutContent('Here will be information about the stack used.');
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
                            {documentsOpen && documents.length > 0 && (
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
                            {servicesOpen && services.length > 0 && (
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
                            <Notes documents={[selectedDocument]} />
                        </div>
                    ) : selectedService ? (
                        <div className={styles.serviceDetails}>
                            <h1>{selectedService.title}</h1>
                            <p>{selectedService.description}</p>
                            <p>Status: {selectedService.isactive ? 'Active' : 'Inactive'}</p>
                        </div>
                    ) : aboutContent ? (
                        <div className={styles.defaultContent}>
                            <h1 className={styles.header}>About Stack</h1>
                            <p className={styles.paragraph}>{aboutContent}</p>
                        </div>
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
