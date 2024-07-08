"use client"
import React, { useState, useEffect } from 'react';

const SvgEditor = ({ id }) => {
    const [svgContent, setSvgContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(`/api/getSVG/${id}`);
                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    setSvgContent(data.svgData);
                } else {
                    setError(data.error || 'Failed to load SVG');
                }
            } catch (error) {
                setError('Failed to load SVG');
            }
        };

        fetchSvg();
    }, [id]);

    const handleSvgSelection = async (selectedId) => {
        try {
            const response = await fetch(`/api/getSVG/${selectedId}`);
            const data = await response.json();

            if (response.ok) {
                setSvgContent(data.svgData);
            } else {
                setError(data.error || 'Failed to load SVG');
            }
        } catch (error) {
            setError('Failed to load SVG');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!svgContent) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SvgSelector onSelect={handleSvgSelection} />
            
            <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>
    );
};

export default SvgEditor;