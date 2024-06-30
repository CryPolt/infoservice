"use client";
import { useState, useEffect } from 'react';
import SvgDiagram from '../(components)/SvgDiagram';
import SvgUploadForm from '../(components)/SvgUploadForm/SvgUploadForm';
import SvgViewer from '../(components)/SvgViewer';

const Home = () => {
    const svgId = 1; // Replace with dynamic ID if needed

    return (
        <div>
            <h1>SVG Diagrams from Database</h1>
            <SvgUploadForm />
            <SvgViewer id={svgId} />
            <h2>SVG Editor</h2>
        </div>
    );
};

export default Home;
