// src/pages/documentation/[id].js
"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '../../(components)/header/header';
import { showDocumentation } from '../../actions/Documentation';

export default function Documentation() {
    const { id } = useParams();

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (id) => {
        try {
            const response = await showDocumentation(id);

            if (response.status === 200) {
                setDocument(response.body);
                setError(null);
            } else {
                throw new Error(response.body.error || 'Failed to fetch document');
            }
        } catch (error) {
            console.error('Error fetching document:', error);
            setError(error.message);
        }
    };

    if (!document) {
        return (
            <>
                <Header />
                <div>Loading...</div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div>
                <h1>{document.title}</h1>
                <p>{document.content}</p>
            </div>
        </>
    );
}