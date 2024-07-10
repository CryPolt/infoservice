// SvgUploadForm.jsx

import { useState } from 'react';

const SvgUploadForm = ({ onSvgUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedId, setSelectedId] = useState(null); 

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleIdChange = (e) => {
        setSelectedId(e.target.value); 
    };

    const handleUpload = async () => {
        if (!selectedFile || !selectedId) {
            alert('Please select both an SVG file and an ID.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('id', selectedId); 

        try {
            const response = await fetch('/api/updateSvg', {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to upload SVG');
            }

            onSvgUpload(data.svgId); 
        } catch (error) {
            console.error('Error uploading SVG:', error);
            alert('Failed to upload SVG file.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".svg" />
            <br />
            <label>
                Select SVG ID:
                <input type="text" value={selectedId} onChange={handleIdChange} />
            </label>
            <br />
            <button onClick={handleUpload}>Upload SVG</button>
        </div>
    );
};

export default SvgUploadForm;
