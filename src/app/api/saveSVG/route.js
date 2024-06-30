// pages/api/saveSVG.js
import pool from '../../lib/db'; // Adjust the path as per your project structure
import { NextResponse } from 'next/server';

export default async function saveSVG(req, res) {
    try {
        const { svgData } = req.body;

        if (!svgData) {
            return NextResponse.status(400).json({ message: 'No SVG data provided' });
        }

        const connection = await pool.getConnection();

        try {
            await connection.execute('INSERT INTO svg_store (svg_data) VALUES (?)', [svgData]);

            return NextResponse.json({ status: 200, body: { message: 'SVG saved successfully' } });
        } catch (error) {
            console.error('Error saving SVG:', error);
            return NextResponse.json({ status: 500, body: { error: 'Error saving SVG' } });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ status: 400, body: { error: 'Invalid request' } });
    }
}
