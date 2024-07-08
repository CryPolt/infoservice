"use client";
import style from './service.module.css';
import { Header } from '../(components)/header/header';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Service() {
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

    return (
        <>
            <Header />
            <div className={style.container}>
                <h1 className={style.title}>Документация по сервисам</h1>
                {error ? (
                    <div className={style.error}>Ошибка при получении данных: {error}</div>
                ) : (
                    <div className={style.portfolio}>
                        {portfolioItems.map((item) => (
                            <div key={item.id} className={style.item}>
                                <h2>{item.title}</h2>
                                <Link href={`/service/${item.id}`} className={style.link}>
                                    Посмотреть документацию сервиса
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
