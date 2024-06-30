// pages/index.js

import React from 'react';
import DrawioSvgViewer from './components/DrawioSvgViewer'; // Уточните путь к вашему компоненту

const HomePage = () => {
    // Предположим, что svgId здесь получается динамически или через параметры маршрута
    const svgId = 1; // Замените на ваш способ получения svgId

    return (
        <div>
            <h1>SVG Viewer</h1>
            <DrawioSvgViewer svgId={svgId} />
        </div>
    );
};

export default HomePage;
