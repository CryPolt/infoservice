// C:\Users\User\WebstormProjects\infoservice\src\app\api\updateSvg\route.js

import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function PUT(req, res) {
    if (req.method !== 'PUT') {
        return NextResponse.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const formData = await req.formData();
        const svgFile = formData.get('file');
        const svgId = formData.get('id'); // Получаем id из FormData

        if (!svgFile || !svgId) {
            return NextResponse.status(400).json({ error: 'Invalid request payload' });
        }

        const fileContent = await svgFile.arrayBuffer();
        const svgData = Buffer.from(fileContent);

        const connection = await pool.getConnection();

        try {
            await updateSvgTable(connection); // Убедитесь, что таблица svg_files существует

            // Обновляем SVG файл в таблице svg_files с указанным id
            const updateSvgQuery = 'UPDATE svg_files SET svg_data = ? WHERE id = ?';
            const [updateResult] = await connection.execute(updateSvgQuery, [svgData, svgId]);

            if (updateResult.affectedRows !== 1) {
                throw new Error('Failed to update SVG file');
            }

            return NextResponse.json({
                status: 200,
                message: 'SVG file updated successfully',
                svgId: svgId
            });
        } catch (error) {
            console.error('Error updating SVG:', error);
            return NextResponse.json({
                status: 500,
                error: 'Failed to update SVG file'
            });
        } finally {
            connection.release(); // Освобождаем соединение обратно в пул
        }
    } catch (error) {
        console.error('Error parsing request:', error);
        return NextResponse.json({
            status: 400,
            error: 'Invalid request payload'
        });
    }
}

async function updateSvgTable(connection) {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS svg_files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                svg_data LONGBLOB NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        await connection.execute(query);
    } catch (error) {
        console.error('Error creating SVG files table:', error);
        throw error;
    }
}
