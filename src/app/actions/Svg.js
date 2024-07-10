"use server";
import { getPool } from '../lib/db';

export async function getSvg(id) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT svg_data FROM svg_files WHERE id = ?', [id]);
            
            connection.release();
            
            if (rows.length === 0) {
                return { status: 404, body: { error: 'SVG not found' } };
            }

            const svgData = Buffer.from(rows[0].svg_data).toString('base64');

            return { status: 200, body: { svgData } };
        } catch (error) {
            connection.release();
            console.error('Error retrieving SVG:', error);
            return { status: 500, body: { error: 'Failed to retrieve SVG file' } };
        }
    } catch (error) {
        console.error('Error getting connection:', error);
        return { status: 500, body: { error: 'Error getting database connection' } };
    }
}