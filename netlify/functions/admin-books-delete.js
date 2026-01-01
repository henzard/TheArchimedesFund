// Delete a book (admin only)
import { getSql } from './utils/db.js';
import { verifyToken } from './utils/auth.js';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Verify admin token
  const token = event.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyToken(token)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { id } = data;

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Book ID is required' }),
      };
    }

    const sql = getSql();
    
    const query = `DELETE FROM books WHERE id = ${id} RETURNING id`;
    const result = await sql(query);

    if (result.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Book not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Book deleted successfully' }),
    };
  } catch (error) {
    console.error('Error deleting book:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to delete book', details: error.message }),
    };
  }
};
