import React, { useState, useEffect } from 'react';

const SvgSelector = ({ onSelect }) => {
    const [svgFiles, setSvgFiles] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchSvgFiles = async () => {
            try {
                const response = await fetch('/api/getAllSVG'); // Adjust endpoint as per your API setup
                if (!response.ok) {
                    throw new Error('Failed to fetch SVG files');
                }
                const data = await response.json();
                setSvgFiles(data);
                if (data.length > 0) {
                    setSelectedId(data[0].id); // Select the first SVG file initially
                }
            } catch (error) {
                console.error('Error fetching SVG files:', error);
            }
        };

        fetchSvgFiles();
    }, []);

    const handleChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedId(selectedId);
        onSelect(selectedId);
    };

    return (
        <select value={selectedId} onChange={handleChange}>
            {svgFiles.map((svg) => (
                <option key={svg.id} value={svg.id}>
                    {svg.name} {/* Replace with actual SVG file identifier */}
                </option>
            ))}
        </select>
    );
};

export default SvgSelector;