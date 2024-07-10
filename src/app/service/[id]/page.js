"use client";
import { useState, useEffect } from 'react';
import style from './serviceid.module.css';
import { Header } from '../../(components)/header/header';
import SvgViewer from '../../SvgEditor/(components)/SvgViewer';
import { useParams } from 'next/navigation';
import { getSvg } from '../../actions/Svg';
import { showService } from '../../actions/Service';

export default function Service() {
    const { id } = useParams();
  
    const [portfolioItem, setPortfolioItem] = useState(null);
    const [svgContent, setSvgContent] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceResponse = await showService(id); // Using showService action
                if (serviceResponse.status === 200) {
                    setPortfolioItem(serviceResponse.body);
                    setError(null);
                } else {
                    throw new Error(serviceResponse.body.error || 'Failed to fetch service data');
                }
            } catch (error) {
                console.error('Error fetching service data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, [id]);
  
    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const svgResponse = await getSvg(id); // Using getSvg action
                if (svgResponse.status === 200) {
                    const decodedSvg = atob(svgResponse.body.svgData);
                    setSvgContent(decodedSvg);
                    setError(null);
                } else {
                    throw new Error(svgResponse.body.error || 'Failed to fetch SVG data');
                }
            } catch (error) {
                console.error('Error fetching SVG data:', error);
                setError('Failed to load SVG');
            }
        };

        fetchSvg();
    }, [id]);
  
    if (error) {
        return <div>Error: {error}</div>;
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
                    <SvgViewer svgContent={svgContent} />
                </div>
            </div>
        </>
    );
}