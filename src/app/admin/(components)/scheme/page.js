import React, { useState, useEffect } from 'react';
import styles from './Scheme.module.css';
import Modal from '../modal/page';

const Scheme = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchElements = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/scheme');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Received data:', data); // Проверка структуры данных в консоли
                if (!data || !Array.isArray(data.body)) {
                    throw new Error('Data structure is not as expected');
                }
                setElements(data.body);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching elements:', error);
                setError('Data structure is not as expected');
                setLoading(false);
            }
        };

        fetchElements();
    }, []);

    const handleClick = (id) => {
        setModalContent(`Element ID: ${id}`);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.scheme} id="scheme">
            {elements.map((element, index) => (
                <div key={`element-${element.id}`} className={styles.element} onClick={() => handleClick(element.id)}>
                    <div className={styles.name}>{element.name}</div>
                    <div className={styles.position}>{element.position}</div>
                    {element.connections && element.connections.map(connection => (
                        <div key={`connection-${connection.id}`} className={styles.connection} style={{ backgroundColor: connection.style }}></div>
                    ))}
                </div>
            ))}
            {isModalOpen && <Modal content={modalContent} onClose={closeModal} />}
        </div>
    );
};

export default Scheme;
