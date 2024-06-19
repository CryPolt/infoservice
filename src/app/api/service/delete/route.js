// api/service/delete.js

import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

// Define the DELETE handler
export async function DELETE(req) {
    console.log("Received a DELETE request for deleting a service");

    if (req.method !== 'DELETE') {
        console.log("Method Not Allowed");
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        const id = req.query.id; // Используйте req.query.id для извлечения параметра id

        console.log("Request Query:", req.query);

        if (!id) {
            console.log("Invalid request format: id is missing");
            return NextResponse.json({ error: 'Invalid request format: id is missing' }, { status: 400 });
        }

        const connection = await pool.getConnection();
        console.log("Database connection established");

        // Check if the service exists
        const [rows] = await connection.query(
            'SELECT COUNT(*) AS count FROM service WHERE id = ?',
            [id]
        );
        const count = rows[0].count;
        console.log("Service count found:", count);

        if (count === 0) {
            connection.release();
            console.log("Service not found with ID:", id);
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        // Delete the service
        await connection.query(
            'DELETE FROM service WHERE id = ?',
            [id]
        );
        connection.release();
        
        console.log("Service deleted with ID:", id);

        return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json({ error: 'Failed to delete service. Internal server error.' }, { status: 500 });
    }
}
