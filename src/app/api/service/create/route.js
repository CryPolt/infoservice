// pages/api/service/create.js
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
        const { title, description, isactive, svgid } = body;

        console.log("Request Body:", body);
        console.log("Title Type:", typeof title);
        console.log("Description Type:", typeof description);
        console.log("IsActive Type:", typeof isactive);
        console.log("SvgId Type:", typeof svgid);

        // Update validation to allow null svgid if optional
        if (!title || !description || typeof isactive !== 'number' || (svgid !== null && typeof svgid !== 'number')) {
            console.log("Invalid request format:", { title, description, isactive, svgid });
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
            'INSERT INTO service (title, description, isactive, svgid) VALUES (?, ?, ?, ?)',
            [title, description, isactive, svgid]
        );
        connection.release();

        console.log("Service created with ID:", result.insertId);

        return NextResponse.json({
            success: true,
            id: result.insertId,
            title,
            description,
            isactive,
            svgid
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Error creating service' }, { status: 500 });
    }
}
