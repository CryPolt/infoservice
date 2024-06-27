// pages/scheme-list.js (or any other relevant page/component file)
"use client"

import React, { useState, useEffect } from 'react';
import Scheme from './DiagramComponent'; // Adjust path as needed

const SchemeList = () => {
    const [schemesData, setSchemesData] = useState([]);

    useEffect(() => {
        fetch('/api/scheme') // Remove extra parenthesis ')' here
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load data from server');
                }
                return res.json();
            })
            .then(data => setSchemesData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h2>Schemes List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {schemesData.map(scheme => (
                    <Scheme key={scheme.id} scheme={scheme} />
                ))}
            </div>
        </div>
    );
};

export default SchemeList;
