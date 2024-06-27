// Scheme.jsx
import React, { useState, useEffect } from 'react';
import styles from './scheme.module.css'; // Путь к CSS модулю для стилей
import Modal from '../modal/page'; // Путь к модальному окну

const Scheme = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newElementName, setNewElementName] = useState('');
    const [newElementPosition, setNewElementPosition] = useState('');

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
        const element = elements.find(el => el.id === id);
        if (element) {
            setModalContent(`Element ID: ${element.id}, Name: ${element.name}, Position: ${element.position}`);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleCreateElement = async () => {
        try {
            const response = await fetch('/api/scheme/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newElementName, position: newElementPosition }),
            });
            if (!response.ok) {
                throw new Error('Failed to create element');
            }
            const data = await response.json();
            console.log('New element created:', data);
            setElements([...elements, data.body]); // Add the newly created element to the local state
            setNewElementName('');
            setNewElementPosition('');
        } catch (error) {
            console.error('Error creating element:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.scheme}>
            <div className={styles.newElementForm}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newElementName}
                    onChange={(e) => setNewElementName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={newElementPosition}
                    onChange={(e) => setNewElementPosition(e.target.value)}
                />
                <button onClick={handleCreateElement}>Create Element</button>
            </div>
            {elements.map(element => (
                <div key={`element-${element.id}`} className={styles.element}>
                    <div className={styles.name} onClick={() => handleClick(element.id)}>
                        {element.name}
                    </div>
                    <div className={styles.position}>{element.position}</div>
                    {element.connections && element.connections.map(connId => (
                        <div key={`connection-${connId}`} className={styles.connection}></div>
                    ))}
                </div>
            ))}
            {isModalOpen && (
                <Modal>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleCloseModal}>&times;</span>
                        <p>{modalContent}</p>
                    </div>
                </Modal>
            )}


        </div>
    );
};

export default Scheme;
