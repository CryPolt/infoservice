import { NextResponse } from 'next/server';
import pool from '../../lib/db'; // Adjust the path to your db module as per your project structure

export async function POST(req) {
    try {
        const { id, newTitle, newDescription } = req.body;

        if (!id || !newTitle || !newDescription) {
            return NextResponse.status(400).json({ message: 'Missing required parameters' });
        }

        const connection = await pool.getConnection();

        try {
            const query = 'UPDATE svg_elements SET title = ?, description = ? WHERE id = ?';
            const [result] = await connection.execute(query, [newTitle, newDescription, id]);

            if (result.affectedRows === 0) {
                return NextResponse.status(404).json({ message: 'Element not found' });
            }

            return NextResponse.json({
                status: 200,
                message: 'Element updated successfully',
            });
        } catch (error) {
            console.error('Error updating element:', error);
            return NextResponse.json({
                status: 500,
                error: 'Failed to update element',
            });
        } finally {
            connection.release(); // Release the connection back to the pool
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            status: 400,
            error: 'Invalid request',
        });
    }
}