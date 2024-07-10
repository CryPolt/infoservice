// // src/app/api/service/delete/route.js

// import pool from '../../../lib/db';
// import { NextResponse } from 'next/server';

// export async function DELETE(req) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id');

//         if (!id) {
//             return NextResponse.json({ error: 'ID parameter is missing' }, { status: 400 });
//         }

//         const connection = await pool.getConnection();

//         const [rows] = await connection.query(
//             'SELECT COUNT(*) AS count FROM service WHERE id = ?',
//             [id]
//         );
//         const count = rows[0].count;

//         if (count === 0) {
//             connection.release();
//             return NextResponse.json({ error: 'Service not found' }, { status: 404 });
//         }

//         await connection.query(
//             'DELETE FROM service WHERE id = ?',
//             [id]
//         );

//         const [updatedRows] = await connection.query('SELECT * FROM service');
//         connection.release();

//         return NextResponse.json({ message: 'Service deleted successfully', services: updatedRows }, { status: 200 });

//     } catch (error) {
//         console.error('Error deleting service:', error);
//         return NextResponse.json({ error: 'Failed to delete service. Internal server error.' }, { status: 500 });
//     }
// }
