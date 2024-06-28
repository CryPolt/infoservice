import pool from '../../lib/db'; // Assuming pool is your MySQL connection pool

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { schema } = req.body; // Assuming schema is sent in the request body

        try {
            const connection = await pool.getConnection();
            await connection.query('INSERT INTO diagrams (`schema`) VALUES (?)', [JSON.stringify(schema)]);
            connection.release();
            res.status(200).json({ message: 'Schema saved successfully' });
        } catch (error) {
            console.error('Error saving schema:', error);
            res.status(500).json({ message: 'Failed to save schema' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
