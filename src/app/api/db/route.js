// pages/api/db.js
import pool from '../../lib/db'; // Adjust the path as per your project structure
import { NextResponse } from 'next/server'; // Ensure NextResponse is imported correctly

export async function GET() {
    try {
        const [rows] = await pool.query('select * from service'); // Example query, customize as needed
        const tableNames = rows.map(row => ({
            name: row.service // Adjust this to match your database structure
        }));
        return NextResponse.json({ data: tableNames });
    } catch (error) {
        console.error('Error fetching data from database:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
