"use client"
import { useEffect, useState, useRef } from "react";
import mx from "mxgraph";
import Dashboard from "./(components)/dashboard/page";
import Schem from "./(components)/scheme/page";

export default function Admin() {
    const [xmlData, setXmlData] = useState(null);
    const containerRef = useRef(null);
    const [graph, setGraph] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/test');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setXmlData(data.xml); // Assuming data structure has a 'xml' key
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
            </div>
            <Dashboard />

            <Schem />

        </>
    );
}
