"use client";
import style from './service.module.css';
import { Header } from '@/app/(components)/header/header';
import { useState } from 'react';
import Image from "next/image";
import sc from "../../../public/sc.svg";

export default function Service() {
    const [modalOpen, setModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', info: '' });
    const [currentItem, setCurrentItem] = useState(null);
    const [portfolioItems, setPortfolioItems] = useState([
        { title: 'Service Name 1', info: 'Service info 1' },
        { title: 'Service Name 2', info: 'Service info 2' }
    ]);

    const openModal = (item) => {
        setCurrentItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItemObject = { title: newItem.title, info: newItem.info };
        setPortfolioItems(prevItems => [...prevItems, newItemObject]);
        setNewItem({ title: '', info: '' });
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
            </div>

            {modalOpen && currentItem && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        <h2>{currentItem.title}</h2>
                        <p>{currentItem.info}</p>
                        <Image
                            src={sc}
                            alt=''/>
                    </div>
                </div>
            )}
        </>

    );
}
