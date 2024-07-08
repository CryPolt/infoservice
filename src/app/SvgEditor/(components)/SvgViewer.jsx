// "use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Modal from './Modal/Modal';

const SvgViewer = ({ svgContent }) => {
    const svgRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', description: '' });

    const handleUpdateElement = (newTitle, newDescription) => {
        console.log(`Updating element with title: ${newTitle} and description: ${newDescription}`);
    };

    useEffect(() => {
        if (svgContent) {
            const svgElement = d3.select(svgRef.current);
            svgElement.html(svgContent);

            svgElement.selectAll('rect, circle, path')
                .style('cursor', 'pointer')
                .attr('id', (d, i) => `element-${i}`)
                .attr('data-description', (d, i) => `Description for element ${i}`)
                .on('click', function() {
                    const element = d3.select(this);
                    const elementId = element.attr('id');
                    const elementDescription = element.attr('data-description');

                    const title = `Element ${elementId}`;
                    const description = `Description: ${elementDescription}`;
                    setModalContent({ title, description });
                    setModalOpen(true);
                });
        }
    }, [svgContent]);

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <div ref={svgRef} />
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title={modalContent.title}
                description={modalContent.description}
                onUpdate={handleUpdateElement} 
            />
        </div>
    );
};

export default SvgViewer;