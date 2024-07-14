import { NextResponse } from 'next/server';
import { getPool } from '../../lib/db';

export async function POST(request) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json({ message: 'Title and Content are required' }, { status: 400 });
  }

  try {
    const pool = getPool();
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query('INSERT INTO test (title, content) VALUES (?, ?)', [title, content]);
      connection.release();

      return NextResponse.json({ message: 'Content saved successfully', insertId: result.insertId }, { status: 201 });
    } catch (queryError) {
      connection.release();
      console.error('Error executing query: ', queryError);
      return NextResponse.json({ message: 'Error executing query' }, { status: 500 });
    }
  } catch (connectionError) {
    console.error('Error getting connection: ', connectionError);
    return NextResponse.json({ message: 'Error getting connection' }, { status: 500 });
  }
}
