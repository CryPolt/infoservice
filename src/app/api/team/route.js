// pages/api/team/index.js
import pool from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM team');
    connection.release();

    // Обновляем imageUrl если он некорректный
    const updatedRows = rows.map(row => ({
      ...row,
      imageUrl: row.imageUrl.startsWith('/uploads/') ? row.imageUrl : '/uploads/default.jpg'
    }));

    console.log('Fetched team members:', updatedRows); // Отладочное сообщение

    return NextResponse.json({ body: updatedRows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Error fetching team members' }, { status: 500 });
  }
}
