"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import style from '../service.module.css';
import { Header } from '../../(components)/header/header';
import Image from "next/image";
import sc from "../../../../public/sc.svg";
import Scheme from "../../admin/(components)/scheme/page"

export default function Service() {
    const { id } = useParams();
    const [portfolioItem, setPortfolioItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/service/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    if (data.status === 200) {
                        setPortfolioItem(data.body);
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
        }
    }, [id]);

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    if (!portfolioItem) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className={style.portfolio}>
                <h1>{portfolioItem.title}</h1>
                <p>{portfolioItem.description}</p>
                <p><Scheme /></p>
            </div>
        </>
    );
}
