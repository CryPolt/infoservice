import { NextResponse } from 'next/server';
import pool from '../../lib/db'; // Adjust the path to your db module as per your project structure

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.status(400).json({ message: 'No ID provided' });
        }

        const connection = await pool.getConnection();

        try {
            const query = 'SELECT svg_data FROM svg_files WHERE id = ?';
            const [rows] = await connection.execute(query, [id]);

            if (rows.length === 0) {
                return NextResponse.status(404).json({ message: 'SVG file not found' });
            }

            const svgData = rows[0].svg_data.toString('utf8');

            return NextResponse.json({
                status: 200,
                svgData
            });
        } catch (error) {
            console.error('Error retrieving SVG:', error);
            return NextResponse.json({
                status: 500,
                error: 'Failed to retrieve SVG file'
            });
        } finally {
            connection.release(); // Release the connection back to the pool
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            status: 400,
            error: 'Invalid request'
        });
    }
}
