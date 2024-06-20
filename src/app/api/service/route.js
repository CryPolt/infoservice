import pool from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    return pool.getConnection()
        .then(connection => {
            return connection.query('SELECT * FROM service')
                .then(([rows]) => {
                    connection.release();
                    return NextResponse.json({
                        status: 200,
                        body: rows
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
