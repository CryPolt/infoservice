// src/app/actions/Documentation.js

'use server';

import { getPool } from '../lib/db';
import parse from 'html-react-parser'; 

// Получение всех документов с пагинацией
export async function getDocumentation(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const pool = getPool(); 
  
    try {
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.query('SELECT * FROM test LIMIT ? OFFSET ?', [limit, offset]);
  
        // Ensure content is correctly parsed as a string of HTML
        const parsedRows = rows.map(row => ({
          ...row,
          content: row.content || '', 
        }));
  
        const [[{ count }]] = await connection.query('SELECT COUNT(*) as count FROM test');
  
        connection.release(); 
     
        return {
          status: 200,
          body: {
            data: parsedRows,
            total: count,
            page,
            limit,
          },
        };
      } catch (queryError) {
        connection.release();
        console.error('Error executing query: ', queryError);
        return {
          status: 500,
          body: { error: 'Error executing query' },
        };
      }
    } catch (connectionError) {
      console.error('Error getting connection: ', connectionError);
      return {
        status: 500,
        body: { error: 'Error getting connection' },
      };
    }
  }

  export async function createDocumentation({ title, content, author }) {
    const pool = getPool();
  
    try {
      const connection = await pool.getConnection();
      try {
        const [existingDoc] = await connection.query(
          'SELECT COUNT(*) AS count FROM documentation WHERE title = ? AND content = ?',
          [title, content]
        );
        const count = existingDoc[0].count;
  
        if (count > 0) {
          connection.release();
          return {
            status: 409,
            body: { error: 'Document already exists' }
          };
        }
  
        const [result] = await connection.query(
          'INSERT INTO documentation (title, content) VALUES (?, ?)',
          [title, content]
        );
        connection.release();
  
        return {
          status: 201,
          body: {
            success: true,
            title,
            content,
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

// Получение документа по его ID
export async function showDocumentation(id) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM test WHERE id = ?', [id]);
            connection.release();

            if (rows.length === 0) {
                return {
                    status: 404,
                    body: { error: 'Document not found' }
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

// Удаление документа по его ID
export async function deleteDocumentation(id) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) AS count FROM documentation WHERE id = ?', [id]);
            const count = rows[0].count;

            if (count === 0) {
                connection.release();
                return { error: 'Document not found', status: 404 };
            }

            await connection.query('DELETE FROM documentation WHERE id = ?', [id]);

            const [updatedRows] = await connection.query('SELECT * FROM documentation');
            connection.release();

            return { message: 'Document deleted successfully', documents: updatedRows, status: 200 };

        } catch (error) {
            connection.release();
            console.error('Error deleting document:', error);
            return { error: 'Failed to delete document. Internal server error.', status: 500 };
        }
    } catch (error) {
        console.error('Error getting connection:', error);
        return { error: 'Error getting database connection', status: 500 };
    }
}

// Редактирование документа
export async function editDocumentation({ id, title, content }) {
    const pool = getPool();

    try {
        const connection = await pool.getConnection();
        try {
            const [existingDoc] = await connection.query(
                'SELECT COUNT(*) AS count FROM documentation WHERE id = ?',
                [id]
            );
            const count = existingDoc[0].count;

            if (count === 0) {
                connection.release();
                return {
                    status: 404,
                    body: { error: 'Document not found' }
                };
            }

            await connection.query(
                'UPDATE documentation SET title = ?, content = ? WHERE id = ?',
                [title, content, id]
            );

            connection.release();

            return {
                status: 200,
                body: {
                    success: true,
                    id,
                    title,
                    content
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
