'use server'

import { getPool } from '../lib/db';

export async function getService(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM service LIMIT ? OFFSET ?', [limit, offset]);
            // console.log([rows]);
            const [[{ count }]] = await connection.query('SELECT COUNT(*) as count FROM service');
            connection.release();
            return {
                status: 200,
                body: {
                    data: rows,
                    total: count,
                    page,
                    limit
                }
            };
        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return {
                status: 500,
                body: { error: 'Error executing query' }
            };
        }
    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return {
            status: 500,
            body: { error: 'Error getting connection' }
        };
    }
}

// create Service
export async function createService({ title, description, isactive, svgid }) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [existingService] = await connection.query(
                'SELECT COUNT(*) AS count FROM service WHERE title = ? AND description = ?',
                [title, description]
            );
            const count = existingService[0].count;

            if (count > 0) {
                connection.release();
                return {
                    status: 409,
                    body: { error: 'Service already exists' }
                };
            }

            const [result] = await connection.query(
                'INSERT INTO service (title, description, isactive, svgid) VALUES (?, ?, ?, ?)',
                [title, description, isactive, svgid]
            );
            connection.release();

            return {
                status: 201,
                body: {
                    success: true,
                    id: result.insertId,
                    title,
                    description,
                    isactive,
                    svgid
                }
            };
        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return {
                status: 500,
                body: { error: 'Error executing query' }
            };
        }
    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return {
            status: 500,
            body: { error: 'Error getting connection' }
        };
    }
}

//show service
export async function showService(id) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM service WHERE id = ?', [id]);
            connection.release();

            if (rows.length === 0) {
                return {
                    status: 404,
                    body: { error: 'Service not found' }
                };
            }

            return {
                status: 200,
                body: rows[0]
            };
        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return {
                status: 500,
                body: { error: 'Error executing query' }
            };
        }
    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return {
            status: 500,
            body: { error: 'Error getting connection' }
        };
    }
}

//delete service
export async function deleteService(id) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) AS count FROM service WHERE id = ?', [id]);
            const count = rows[0].count;

            if (count === 0) {
                connection.release();
                return { error: 'Service not found', status: 404 };
            }

            await connection.query('DELETE FROM service WHERE id = ?', [id]);

            const [updatedRows] = await connection.query('SELECT * FROM service');
            connection.release();

            return { message: 'Service deleted successfully', services: updatedRows, status: 200 };

        } catch (error) {
            connection.release();
            console.error('Error deleting service:', error);
            return { error: 'Failed to delete service. Internal server error.', status: 500 };
        }
    } catch (error) {
        console.error('Error getting connection:', error);
        return { error: 'Error getting database connection', status: 500 };
    }
}


//edit service

export async function editService({ id, title, description }) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [existingService] = await connection.query(
                'SELECT COUNT(*) AS count FROM service WHERE id = ?',
                [id]
            );
            const count = existingService[0].count;

            if (count === 0) {
                connection.release();
                return {
                    status: 404,
                    body: { error: 'Service not found' }
                };
            }

            await connection.query(
                'UPDATE service SET title = ?, description = ? WHERE id = ?',
                [title, description, id]
            );

            connection.release();

            return {
                status: 200,
                body: {
                    success: true,
                    id,
                    title,
                    description
                }
            };
        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return {
                status: 500,
                body: { error: 'Error executing query' }
            };
        }
    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return {
            status: 500,
            body: { error: 'Error getting connection' }
        };
    }
}

//togle service

export async function toggleService(id) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [currentStatusRows] = await connection.query('SELECT isactive FROM service WHERE id = ?', [id]);
            const currentStatus = currentStatusRows[0].isactive;

            const newStatus = currentStatus === 1 ? 0 : 1;

            await connection.query('UPDATE service SET isactive = ? WHERE id = ?', [newStatus, id]);
            connection.release();

            return {
                status: 200,
                body: { message: 'Service status updated successfully' }
            };

        } catch (queryError) {
            connection.release();
            console.error('Error executing query: ', queryError);
            return {
                status: 500,
                body: { error: 'Error executing query' }
            };
        }
    } catch (connectionError) {
        console.error('Error getting connection: ', connectionError);
        return {
            status: 500,
            body: { error: 'Error getting connection' }
        };
    }
}


