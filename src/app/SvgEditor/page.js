// Например, на странице редактирования сервиса
"use client"
import React, { useState } from 'react';
import SvgUploadForm from './(components)/SvgUploadForm/SvgUploadForm'; // Путь к вашему компоненту SvgUploadForm

const EditServicePage = () => {
    const [selectedSvgId, setSelectedSvgId] = useState(null);

    const handleSvgUpload = (svgId) => {
        setSelectedSvgId(svgId);
        alert(`SVG with ID ${svgId} uploaded successfully!`);
        // Можете здесь добавить логику для использования svgId в вашем приложении
    };

    return (
        <div>
            <h1>Edit Service</h1>
            {/* Форма для выбора и загрузки SVG файла */}
            <SvgUploadForm onSvgUpload={handleSvgUpload} />
            {/* Дополнительная логика отображения и работы с SVG файлами */}
        </div>
    );
};


export default EditServicePage;
