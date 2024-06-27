// components/XMLUploader.js

import React, { useState } from 'react';
import styles from './XMLUploader.module.css'; // Подключаем стили

const XMLUploader = ({ onFileLoad }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            loadXMLFile(selectedFile);
        }
    };

    const loadXMLFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const xmlString = event.target.result;
            onFileLoad(xmlString);
        };
        reader.readAsText(file);
    };


    return (
        <div className={styles.uploadContainer}>
            <input type="file" accept=".xml" onChange={handleFileChange} className={styles.fileInput} />
            {file && <p>Selected file: {file.name}</p>}
        </div>
    );
};

export default XMLUploader;
