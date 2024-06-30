// pages/api/getDiagrams.js
import pool from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const connection = await pool(); // Assuming connectToDatabase returns a connection object
        try {
            const [rows] = await connection.execute('SELECT * FROM diagram_table');
            await connection.end(); // Close the connection after use
            if (rows.length === 0) {
                return NextResponse.json({
                    status: 404,
                    body: { error: 'Diagrama not found' }
                });
            }
            return NextResponse.json({
                status: 200,
                body: rows
            });
        } catch (queryError) {
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
