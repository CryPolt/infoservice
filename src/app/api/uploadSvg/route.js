// pages/api/uploadSvg.js

import { NextResponse } from 'next/server';
import { getPool } from '../../lib/db'; 

export async function POST(req, res) {
    if (req.method !== 'POST') {
        return NextResponse.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const formData = await req.formData();
        const svgFile = formData.get('file');

        if (!svgFile) {
            return NextResponse.status(400).json({ message: 'No SVG file provided' });
        }

        const fileContent = await svgFile.arrayBuffer();
        const svgData = Buffer.from(fileContent);

        const pool = getPool(); // Ensure this function returns a MySQL pool instance

        const connection = await pool.getConnection();

        try {
            await createSvgTable(connection); // Ensure the table exists before inserting

            const insertSvgQuery = 'INSERT INTO svg_files (svg_data) VALUES (?)';
            const [insertResult] = await connection.execute(insertSvgQuery, [svgData]);
            const svgId = insertResult.insertId;

            return NextResponse.json({
                status: 200,
                message: 'SVG file uploaded successfully',
                svgId: svgId,
            });
        } catch (error) {
            console.error('Error uploading SVG:', error);
            return NextResponse.json({
                status: 500,
                error: 'Failed to upload SVG file',
            });
        } finally {
            connection.release(); // Release the connection back to the pool
        }
    } catch (error) {
        console.error('Error parsing request:', error);
        return NextResponse.json({
            status: 400,
            error: 'Invalid request payload',
        });
    }
}

async function createSvgTable(connection) {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS svg_files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                svg_data LONGBLOB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.execute(query);
    } catch (error) {
        console.error('Error creating SVG files table:', error);
        throw error;
    }
}