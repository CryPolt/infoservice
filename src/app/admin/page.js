"use client";
import { useEffect, useState } from "react";
import { Dashboard } from "@/app/admin/(components)/dashboard/page";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Admin() {
    const [xmlData, setXmlData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/test');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setXmlData(data);
                console.log(data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1>Admin Page</h1>
                {xmlData ? (
                    <SyntaxHighlighter language="xml" style={vscDarkPlus}>
                        {new XMLSerializer().serializeToString(new DOMParser().parseFromString(xmlData.mxfile.$.diagram, "text/xml"))}
                    </SyntaxHighlighter>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Dashboard />
        </>
    );
}
