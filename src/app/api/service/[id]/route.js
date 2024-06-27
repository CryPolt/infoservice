import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({
            status: 400,
            body: { error: 'Missing service ID' }
        });
    }

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM service WHERE id = ?', [id]);
            connection.release();
            if (rows.length === 0) {
                return NextResponse.json({
                    status: 404,
                    body: { error: 'Service not found' }
                });
            }
            return NextResponse.json({
                status: 200,
                body: rows[0]
            });
        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return NextResponse.json({
                status: 500,
                body: { error: 'Error executing query' }
            });
        }
    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return NextResponse.json({
            status: 500,
            body: { error: 'Error getting connection' }
        });
    }
}
