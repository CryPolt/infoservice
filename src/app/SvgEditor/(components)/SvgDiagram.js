// "use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Modal from './Modal/Modal';

const SvgDiagram = ({ svgContent }) => {
    const svgRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', description: '' });

    useEffect(() => {
        if (svgContent) {
            const svgElement = d3.select(svgRef.current);
            svgElement.html(svgContent);

            // Add unique identifiers and descriptions
            svgElement.selectAll('*').each(function(d, i) {
                d3.select(this)
                    .attr('id', `element-${i}`)
                    .attr('data-description', `Description for element ${i}`)
                    .style('cursor', 'pointer') // Add pointer cursor to clickable elements
                    .on('click', () => {
                        const title = `Element ${this.id}`;
                        const description = d3.select(this).attr('data-description');
                        setModalContent({ title, description });
                        setModalOpen(true);
                    });
            });
        }
    }, [svgContent]);

    return (
        <div>
            <div ref={svgRef} />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
                description={modalContent.description}
            />
        </div>
    );
};

export default SvgDiagram;
