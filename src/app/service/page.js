"use client";
import style from './service.module.css';
import { Header } from '../../app/(components)/header/header';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import sc from "../../../public/sc.svg";

export default function Service() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [error, setError] = useState(null); // State to store error

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/service');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                if (data.status === 200) {
                    setPortfolioItems(data.body); // Update state with fetched data
                    setError(null); // Clear any previous error
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message); // Set error state
            }
        };

        fetchData(); // Call the fetchData function when component mounts
    }, []); // Empty dependency array ensures this effect runs only once

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
                                    <p> {item.description}</p>
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
