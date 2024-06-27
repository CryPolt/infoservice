import pool from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    return pool.getConnection()
        .then(connection => {
            return connection.query('SELECT * FROM service LIMIT ? OFFSET ?', [limit, offset])
                .then(([rows]) => {
                    return connection.query('SELECT COUNT(*) as count FROM service')
                        .then(([countRows]) => {
                            connection.release();
                            const total = countRows[0].count;
                            return NextResponse.json({
                                status: 200,
                                body: {
                                    data: rows,
                                    total,
                                    page,
                                    limit
                                }
                            });
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
