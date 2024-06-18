// pages/api/users.js
import db from '@/app/lib/db';

export default async function handler(req, res) {
    try {
        const [rows] = await db.execute('SELECT * FROM example_table');
        res.status(200).json({ users: rows });
    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
