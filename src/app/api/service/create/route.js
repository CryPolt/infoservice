import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log("Received a POST request");

    if (req.method !== 'POST') {
        console.log("Method Not Allowed");
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        const body = await req.json();
        const { title, description, isactive } = body;

        console.log("Request Body:", body);

        if (!title || !description || typeof isactive !== 'number') {
            console.log("Invalid request format:", { title, description, isactive });
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        const connection = await pool.getConnection();

        console.log("Checking if the service already exists");
        const [rows] = await connection.query(
            'SELECT COUNT(*) AS count FROM service WHERE title = ? AND description = ?',
            [title, description]
        );
        const count = rows[0].count;
        console.log("Service count found:", count);

        if (count > 0) {
            connection.release();
            console.log("Service already exists");
            return NextResponse.json({ error: 'Service already exists' }, { status: 409 });
        }

        console.log("Inserting new service");
        const [result] = await connection.query(
            'INSERT INTO service (title, description, isactive) VALUES (?, ?, ?)',
            [title, description, isactive]
        );
        connection.release();

        console.log("Service created with ID:", result.insertId);

        return NextResponse.json({
            id: result.insertId,
            title,
            description,
            isactive
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Error creating service' }, { status: 500 });
    }
}
