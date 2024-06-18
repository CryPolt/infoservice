import pool from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { title, description, isactive } = req.body;

        // Simple validation
        if (!title || !description || typeof isactive !== 'number') {
            return res.status(400).json({ error: 'Invalid request format' });
        }

        const connection = await pool.getConnection();
        const result = await connection.query(
            'INSERT INTO service (title, description, isactive) VALUES (?, ?, ?)',
            [title, description, isactive]
        );
        connection.release();

        const newServiceId = result[0].insertId;

        res.status(201).json({
            id: newServiceId,
            title,
            description,
            isactive
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Error creating service' });
    }
}
