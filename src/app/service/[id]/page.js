"use client";
import { useState, useEffect } from 'react';
import style from '../service.module.css';
import { Header } from '../../(components)/header/header';
import SvgViewer from '../../SvgEditor/(components)/SvgViewer';
import { useParams } from 'next/navigation';

export default function Service() {
    const { id } = useParams();

    const [portfolioItem, setPortfolioItem] = useState(null);
    const [error, setError] = useState(null);
    const [svgContent, setSvgContent] = useState(null); // State to hold SVG content

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch service details
                const serviceResponse = await fetch(`/api/service/${id}`);
                if (!serviceResponse.ok) {
                    throw new Error('Failed to fetch service data');
                }
                const serviceData = await serviceResponse.json();
                if (serviceData.status === 200) {
                    setPortfolioItem(serviceData.body);
                    setError(null);
                } else {
                    throw new Error('Failed to fetch service data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(`/api/getSVG?id=${id}`);
                const data = await response.json();

                if (response.ok) {
                    setSvgContent(data.svgData); // Set SVG content
                } else {
                    setError(data.message || 'Failed to load SVG');
                }
            } catch (error) {
                setError('Failed to load SVG');
            }
        };

        if (id) {
            fetchSvg();
        }
    }, [id]);

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    if (!portfolioItem || svgContent === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className={style.portfolio}>
                <h1>{portfolioItem.title}</h1>
                <p>{portfolioItem.description}</p>
                <div className={style.svgContainer}>
                    <h2>SVG Data:</h2>
                    {/* Render SvgViewer passing svgContent */}
                    <SvgViewer svgContent={svgContent}/> 
                </div>
            </div>
        </>
    );
}
