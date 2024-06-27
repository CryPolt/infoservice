"use client";
import style from './service.module.css';
import { Header } from '../(components)/header/header';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Service() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/service');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);
                if (data.status === 200) {
                    const activeServices = data.body.data.filter(item => item.isactive === 1);
                    setPortfolioItems(activeServices);
                    setError(null);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const openModal = (item) => {
        setCurrentItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Header />
            <div className={style.portfolio}>
                {error ? (
                    <div className={style.err}>Error fetching data: {error}</div>
                ) : (
                    <ul>
                        {portfolioItems.map((item) => (
                            <li key={item.id} onClick={() => openModal(item)}>
                                <div className={style.caption}>
                                    <i className="fa fa-pencil fa-lg"></i>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {modalOpen && currentItem && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        <h2>{currentItem.title}</h2>
                        <p>{currentItem.description}</p>
                        <Link href={`/service/${currentItem.id}`}>
                            <strong>Посмотреть документацию сервиса</strong>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
