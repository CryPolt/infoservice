"use client";
import style from '../service.module.css';
import { Header } from '@/app/(components)/header/header';
import { useState } from 'react';

export default function create() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', info: '' });
    const [currentItem, setCurrentItem] = useState(null);
    const [portfolioItems, setPortfolioItems] = useState([
        { title: 'Service Name', info: 'Service info' },
        { title: 'Service Name', info: 'Service info' }
    ]);

    const openModal = (item) => {
        setCurrentItem(item);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setPortfolioItems(prevState => [...prevState, newItem]);
        setNewItem({ title: '', info: '' });
        closeForm();
    };

    return (
        <>
            <Header />
            <div className={style.portfolio}>
                <ul>
                    {portfolioItems.map((item, index) => (
                        <li key={index} onClick={() => openModal(item)}>
                            <div className={style.caption}>
                                <i className="fa fa-pencil fa-lg"></i>
                                <h1>{item.title}</h1>
                                <p>{item.info}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={openForm}>Add Service</button>
            </div>

            {modalOpen && currentItem && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        <h2>{currentItem.title}</h2>
                        <p>{currentItem.info}</p>
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
                                Info:
                                <input
                                    type="text"
                                    name="info"
                                    value={newItem.info}
                                    onChange={handleInputChange}
                                />
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

export const V = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', info: '' });
    const [currentItem, setCurrentItem] = useState(null);
    const [portfolioItems, setPortfolioItems] = useState([
        { title: 'Service Name', info: 'Service info' },
        { title: 'Service Name', info: 'Service info' }
    ]);

    const openModal = (item) => {
        setCurrentItem(item);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setPortfolioItems(prevState => [...prevState, newItem]);
        setNewItem({ title: '', info: '' });
        closeForm();
    };

    return (
        <>
            <div className={style.portfolio}>

            <button onClick={openForm}>Add Service</button>
            <ul>
                    {portfolioItems.map((item, index) => (
                        <li key={index} onClick={() => openModal(item)}>
                            <div className={style.caption}>
                                <i className="fa fa-pencil fa-lg"></i>
                                <h1>{item.title}</h1>
                                <p>{item.info}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {modalOpen && currentItem && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        <h2>{currentItem.title}</h2>
                        <p>{currentItem.info}</p>
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
                                Info:
                                <input
                                    type="text"
                                    name="info"
                                    value={newItem.info}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );

};