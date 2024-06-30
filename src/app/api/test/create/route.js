// Импорт пула подключения к базе данных
import pool from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Обработчик POST запроса
export async function POST(req) {
    console.log("Received a POST request");

    // Проверка метода запроса
    if (req.method !== 'POST') {
        console.log("Method Not Allowed");
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        // Извлечение данных из тела запроса
        const body = await req.json();
        const { json } = body; // Предполагается, что в теле запроса передается объект с ключом 'json'

        console.log("Request Body:", body);

        // Валидация данных, если необходимо
        if (!json) {
            console.log("Invalid request format:", body);
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        // Вставка данных в базу данных
        const connection = await pool.getConnection();

        console.log("Inserting JSON data into database");
        const result = await connection.query(
            'INSERT INTO diagrama (json_data) VALUES (?)',
            [json]
        );
        connection.release();

        console.log("JSON data inserted successfully");

        // Отправка успешного ответа
        return NextResponse.json({
            success: true,
            message: 'Diagram JSON saved successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Error saving diagram JSON:', error);
        // Обработка ошибок
        return NextResponse.json({ error: 'Failed to save diagram JSON' }, { status: 500 });
    }
}
