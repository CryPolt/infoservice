"use client"
import { useState, useEffect } from 'react';
import style from '../service.module.css';
import { Header } from '@/app/(components)/header/header';

export default function CreateService() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', description: '', isactive: 1 });
    const [portfolioItems, setPortfolioItems] = useState([]);

    useEffect(() => {
        // Fetch existing services when component mounts
        fetchPortfolioItems();
    }, []);

    const fetchPortfolioItems = async () => {
        try {
            const response = await fetch('/api/service');
            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }
            const data = await response.json();
            setPortfolioItems(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/service/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newItem.title,
                    description: newItem.description,
                    isactive: newItem.isactive,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create service');
            }

            const data = await response.json();
            console.log('New service created:', data);

            // Update portfolioItems with the newly created service
            setPortfolioItems(prevItems => [...prevItems, data]);

            // Optionally, reset form fields and close form after successful creation
            setNewItem({ title: '', description: '', isactive: 1 });
            closeForm();
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    return (
        <>
            <Header />
            <div className={style.portfolio}>
                <ul>
                    {portfolioItems.map(item => (
                        <li key={item.id} onClick={() => openModal(item)}>
                            <div className={style.caption}>
                                <i className="fa fa-pencil fa-lg"></i>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={openForm}>Add Service</button>
            </div>

            {modalOpen && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        <h2>{newItem.title}</h2>
                        <p>{newItem.description}</p>
                    </div>
                </div>
            )}

            {formOpen && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeForm}>&times;</span>
                        <h2>Add Service</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={newItem.title}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={newItem.description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <label>
                                Active:
                                <select
                                    name="isactive"
                                    value={newItem.isactive}
                                    onChange={handleInputChange}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </label>
                            <br />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
