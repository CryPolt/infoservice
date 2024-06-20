import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET({ params }) {
    const userId = params?.id;

    try {
        if (!userId) {
            return NextResponse.json({
                status: 400,
                body: { error:'Не указан id пользователя' }
            });
        }
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM account WHERE id = ?', [userId]);
        connection.release();
        if (rows.length === 0) {
            return NextResponse.json({
                status: 404,
                body: { error: `Пользователь с id ${userId} не найден` }
            });
        }


        return NextResponse.json({
            status: 200,
            body: rows[0]
        });
    } catch (error) {
        console.error('Ошибка при выполнении запроса: ', error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Ошибка при выполнении запроса' }
        });
    }
}
