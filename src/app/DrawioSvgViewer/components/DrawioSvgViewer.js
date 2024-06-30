// components/DrawioSvgViewer.js
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DrawioSvgViewer = ({ svgId }) => {
    const [drawioUrl, setDrawioUrl] = useState('');

    useEffect(() => {
        const fetchSvgData = async () => {
            try {
                const response = await fetch(`/api/getSvgData?id=${svgId}`);
                const data = await response.json();

                if (response.ok) {
                    setDrawioUrl(data.drawioUrl);
                } else {
                    throw new Error(data.error || 'Failed to fetch SVG data');
                }
            } catch (error) {
                console.error('Error fetching SVG data:', error);
            }
        };

        if (svgId) {
            fetchSvgData();
        }
    }, [svgId]);

    return (
        <div>
            {drawioUrl ? (
                <>
                    <h2>Open SVG in Draw.io</h2>
                    <p>Click the link below to open the SVG in Draw.io:</p>
                    <Link href={drawioUrl} passHref>
    <span>Open SVG in Draw.io</span>
</Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DrawioSvgViewer;
