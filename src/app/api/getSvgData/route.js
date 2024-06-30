// C:\Users\User\WebstormProjects\infoservice\src\app\api\getSvgData\route.js

import { NextResponse } from 'next/server';
import pool from '../../lib/db'; // Уточните путь к вашему модулю для работы с базой данных

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url, 'http://localhost:3001'); // Уточните URL базового сервера
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
            const drawioUrl = `https://localhost:3001/drawio?url=${encodeURIComponent(svgData)}`;

            return NextResponse.json({
                status: 200,
                drawioUrl
            });
        } catch (error) {
            console.error('Error retrieving SVG:', error);
            return NextResponse.json({
                status: 500,
                error: 'Failed to retrieve SVG file'
            });
        } finally {
            connection.release(); // Освобождаем соединение обратно в пул
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            status: 400,
            error: 'Invalid request'
        });
    }
}
