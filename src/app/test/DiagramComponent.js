"use client"
import React, { useState } from 'react';

const Scheme = ({ scheme }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '300px' }}>
            <h3>{scheme.name}</h3>
            <img src={scheme.imageUrl} alt={scheme.name} style={{ maxWidth: '100%' }} />
            <p onClick={toggleDetails}>Description: {scheme.description}</p>
            {showDetails && (
                <div>
                    <p>ID: {scheme.id}</p>
                    {/* Добавьте другие свойства схемы по необходимости */}
                </div>
            )}
        </div>
    );
};

export default Scheme;
