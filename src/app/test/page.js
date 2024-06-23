// pages/scheme.js
"use client"
import React, { useEffect, useState } from 'react';
import Scheme from './DiagramComponent'; // Path to your Scheme component

const SchemesPage = () => {
    const [schemesData, setSchemesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/schemes'); // Adjust URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setSchemesData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = (scheme) => {
        console.log('Clicked scheme:', scheme);
        // Add logic for displaying scheme details on click
    };

    if (loading) {
        return <p>Loading...</p>; // Display loading message while fetching data
    }

    return (
        <div>
            <h1>Список схем</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {schemesData.map((scheme) => (
                    <div key={scheme.id} onClick={() => handleClick(scheme)}>
                        <Scheme scheme={scheme} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchemesPage;
