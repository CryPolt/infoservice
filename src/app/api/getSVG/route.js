import { getPool } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const pool = getPool(); 
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM svg_files');            
            connection.release();
            if (rows.length === 0) {
                return NextResponse.json({
                    status: 404,
                    body: { error: 'SVG not found' }
                });
            }
            return NextResponse.json({
                status: 200,
                body: rows
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