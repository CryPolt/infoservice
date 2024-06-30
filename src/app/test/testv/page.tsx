// Assuming your existing components and styles are correctly set up
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from '../DiagramViewer.module.css';
import { Header } from '../../(components)/header/header';

interface Node {
    id: string;
    type: string;
    position: { x: number; y: number };
    style: { width: number; height: number };
    data: {
        type: string;
        color?: string;
        title?: string;
        description?: string;
        icon?: string;
        contents?: string;
    };
}

interface Edge {
    id: string;
    source: { id: string };
    target: { id: string };
    style?: {
        stroke?: string;
        strokeWidth?: number;
        strokeDashArray?: string;
        strokeDashOffset?: number;
        animation?: string;
        animationDirection?: string;
    };
}

interface Diagram {
    id: string;
    nodes: Node[];
    edges: Edge[];
}

const Diagrams: React.FC = () => {
    const [diagrams, setDiagrams] = useState<Diagram[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDiagrams = async () => {
            try {
                const response = await fetch('/api/test');
                if (!response.ok) {
                    throw new Error('Failed to fetch diagrams');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the entire data object for debugging
                if (data && data.status === 200 && Array.isArray(data.body)) {
                    const parsedDiagrams: Diagram[] = data.body.map((diagram: any) => ({
                        id: diagram.id.toString(),
                        nodes: diagram.nodes.map((node: any) => ({
                            id: node.id.toString(),
                            type: node.data.type,
                            position: node.position,
                            style: node.style,
                            data: node.data,
                        })),
                        edges: diagram.edges.map((edge: any) => ({
                            id: edge.id.toString(),
                            source: { id: edge.source.toString() },
                            target: { id: edge.target.toString() },
                            style: edge.style,
                            data: edge.data,
                        })),
                    }));
                    setDiagrams(parsedDiagrams);
                    setError(null);
                } else {
                    throw new Error('Invalid data structure or failed to fetch diagrams');
                }
            } catch (error) {
                console.error('Error fetching diagrams:', error);
                setError(error.message);
            }
        };
    
        fetchDiagrams();
    }, []);

    return (
        <>
            <Header />
            <div className={style.diagrams}>
                {error ? (
                    <div className={style.error}>Error fetching diagrams: {error}</div>
                ) : (
                    <ul className={style.diagramList}>
                        {diagrams.length > 0 ? (
                            diagrams.map((diagram) => (
                                <li key={diagram.id} className={style.diagramItem}>
                                    <div className={style.diagramWrapper}>
                                        <h2>{diagram.id}</h2>
                                        <div className={style.diagram}>
                                            <div className={style.nodesContainer}>
                                                {diagram.nodes.map((node) => (
                                                    <div
                                                        key={node.id}
                                                        className={`${style.node} ${style[node.data.type]}`}
                                                        style={{
                                                            left: node.position.x + 'px',
                                                            top: node.position.y + 'px',
                                                            width: node.style.width + 'px',
                                                            height: node.style.height + 'px',
                                                            backgroundColor: node.data.color || '#ffffff',
                                                        }}
                                                    >
                                                        {node.data.contents || node.data.title || node.data.icon}
                                                    </div>
                                                ))}
                                            </div>
                                            <svg className={style.edgesContainer} style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                                                {diagram.edges.map((edge) => (
                                                    <line
                                                        key={edge.id}
                                                        x1={diagram.nodes.find(node => node.id === edge.source.id)?.position.x}
                                                        y1={diagram.nodes.find(node => node.id === edge.source.id)?.position.y}
                                                        x2={diagram.nodes.find(node => node.id === edge.target.id)?.position.x}
                                                        y2={diagram.nodes.find(node => node.id === edge.target.id)?.position.y}
                                                        style={{
                                                            stroke: edge.style?.stroke || '#000000',
                                                            strokeWidth: edge.style?.strokeWidth || 1,
                                                            strokeDasharray: edge.style?.strokeDashArray || 'none',
                                                            strokeDashoffset: edge.style?.strokeDashOffset || 0,
                                                            animation: edge.style?.animation || 'none',
                                                            animationDirection: edge.style?.animationDirection || 'normal',
                                                        }}
                                                    />
                                                ))}
                                            </svg>
                                        </div>
                                        <Link href={`/diagram/${diagram.id}`}>
                                            View Diagram Details
                                        </Link>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className={style.error}>No diagrams found.</div>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Diagrams;