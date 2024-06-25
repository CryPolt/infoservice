// pages/api/service/toggle.js
import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    const { id, isactive } = await req.json();

    return pool.getConnection()
        .then(connection => {
            return connection.query('UPDATE service SET isactive = ? WHERE id = ?', [isactive, id])
                .then(result => {
                    connection.release();
                    return NextResponse.json({
                        status: 200,
                        body: { message: 'Service status updated successfully' }
                    });
                })
                .catch(queryError => {
                    connection.release();
                    console.error('Error executing query: ', queryError);
                    return NextResponse.json({
                        status: 500,
                        body: { error: 'Error executing query' }
                    });
                });
        })
        .catch(connectionError => {
            console.error('Error getting connection: ', connectionError);
            return NextResponse.json({
                status: 500,
                body: { error: 'Error getting connection' }
            });
        });
}
