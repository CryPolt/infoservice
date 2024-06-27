// src/app/api/scheme/route.js

import pool from '../../lib/db';
import { NextResponse } from 'next/server';

// Handle GET request to fetch all scheme elements
export async function GET(req, res) {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM scheme_elements');

        const elements = rows.map(row => {
            let connections = [];

            try {
                // Attempt to parse JSON if row.connections is a string
                if (typeof row.connections === 'string') {
                    connections = JSON.parse(row.connections);
                } else if (typeof row.connections === 'object' && row.connections !== null) {
                    // If row.connections is already an object, use it directly
                    connections = row.connections;
                }
            } catch (error) {
                console.error('Error parsing connections:', error);
            }

            return {
                id: row.id,
                name: row.name,
                position: row.position,
                connections: connections
            };
        });

        return NextResponse.json({
            status: 200,
            body: elements
        });

    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Error executing query' }
        });
    }
}

// Handle POST request to save scheme elements
export async function POST(req, res) {
    const { elements } = req.body;
    try {
        // Update the database with new scheme elements structure
        // This example assumes `elements` contains the updated structure with connections
        // You would typically update the `scheme_elements` table in your database
        // with the updated structure of elements here
        // Example logic to update in the database
        for (const element of elements) {
            const { id, connections } = element;
            // Example SQL query to update connections in the database
            await pool.execute('UPDATE scheme_elements SET connections = ? WHERE id = ?', [JSON.stringify(connections), id]);
        }

        return NextResponse.json({
            status: 200,
            body: { message: 'Scheme elements saved successfully' }
        });
    } catch (error) {
        console.error('Error saving scheme elements:', error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Error saving scheme elements' }
        });
    }
}

// Handle POST request to create a new scheme element
export async function create(req, res) {
    const { name, position } = req.body;
    try {
        // Insert new scheme element into the database
        const result = await pool.execute('INSERT INTO scheme_elements (name, position) VALUES (?, ?)', [name, position]);

        const newElementId = result.insertId;

        return NextResponse.json({
            status: 200,
            body: { id: newElementId, name, position, connections: [] } // Return the newly created element data
        });
    } catch (error) {
        console.error('Error creating scheme element:', error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Error creating scheme element' }
        });
    }
}
