// pages/api/db.js
import pool from '../../lib/db'; 
import { NextResponse } from 'next/server'; 

export async function GET() {
    try {
        const [rows] = await pool.query('select * from service'); 
        const tableNames = rows.map(row => ({
            name: row.service 
        }));
        return NextResponse.json({ data: tableNames });
    } catch (error) {
        console.error('Error fetching data from database:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
