import pool from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM account');
        connection.release();

        return NextResponse.json({
            status:200,
            body: rows
        });
    } catch (error) {
        console.error('Ошибка при выполнении запроса: ', error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Ошибка при выполнении запроса' }
        });
    }
}
