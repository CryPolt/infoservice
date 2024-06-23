// src/app/api/service/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM service WHERE id = ?', [id]);
            connection.release();

            if (rows.length === 0) {
                return NextResponse.json({ status: 404, message: 'Service not found' }, { status: 404 });
            }

            const service = rows[0];
            return NextResponse.json({ status: 200, body: service }, { status: 200 });

        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return NextResponse.json({ status: 500, message: 'Error executing query' }, { status: 500 });
        }

    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return NextResponse.json({ status: 500, message: 'Error getting connection' }, { status: 500 });
    }
}