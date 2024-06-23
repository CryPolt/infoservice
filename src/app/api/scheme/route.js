// src/app/api/scheme/route.js

import pool from '../../lib/db';
import { NextResponse } from 'next/server';

// Handle GET request
export async function GET(req, res) {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM scheme_elements');

        const elements = rows.map(row => ({
            id: row.id,
            name: row.name,
            position: row.position,
            connections: JSON.parse(row.connections) // Парсим JSON строку в объект
        }));

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
