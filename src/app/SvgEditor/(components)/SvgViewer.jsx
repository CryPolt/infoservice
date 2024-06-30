// "use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Modal from './Modal/Modal';

const SvgViewer = ({ svgContent }) => {
    const svgRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', description: '' });

    useEffect(() => {
        if (svgContent) {
            const svgElement = d3.select(svgRef.current);
            svgElement.html(svgContent);

            // Add unique identifiers and descriptions
            svgElement.selectAll('*').each(function(d, i) {
                const elementId = `element-${i}`;
                const elementDescription = `Description for element ${i}`;
                
                d3.select(this)
                    .attr('id', elementId)
                    .attr('data-description', elementDescription)
                    .style('cursor', 'pointer') // Add pointer cursor to clickable elements
                    .on('click', () => {
                        const clickedElement = d3.select(this);
                        const title = `Element ${elementId}`;
                        const description = clickedElement.attr('data-description');
                        setModalContent({ title, description });
                        setModalOpen(true);
                    });
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
            />
        </div>
    );
};

export default SvgViewer;
