// src/app/api/service/edit/route.js

import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

// Define the PUT handler for editing a service
export async function PUT(req) {
    console.log("Received a PUT request for editing a service");

    if (req.method !== 'PUT') {
        console.log("Method Not Allowed");
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        const data = await req.json();
        const { id, title, description } = data;

        console.log("Request Body:", data);

        if (!id || !title || !description) {
            console.log("Invalid request format: missing fields");
            return NextResponse.json({ error: 'Invalid request format: missing fields' }, { status: 400 });
        }

        const connection = await pool.getConnection();
        console.log("Database connection established");

        // Update the service
        await connection.query(
            'UPDATE service SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );
        connection.release();

        console.log("Service updated with ID:", id);

        return NextResponse.json({ message: 'Service updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json({ error: 'Failed to update service. Internal server error.' }, { status: 500 });
    }
}
