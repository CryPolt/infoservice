// pages/index.tsx (или другой файл, где вы хотите отобразить диаграмму)
"use client"
import React from 'react';
import BlockDiagram from './DiagramComponent';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Пример блок-схемы с @mindfusion/diagramming</h1>
            <BlockDiagram />
        </div>
    );
};

export default HomePage;
