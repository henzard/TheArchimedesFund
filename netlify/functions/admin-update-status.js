// Update submission status (admin only)
import { getDb, headers } from './utils/db.js';
import { authenticateRequest } from './utils/auth.js';

export const handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Authenticate
  const auth = authenticateRequest(event);
  if (!auth.authenticated) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: auth.error || 'Unauthorized' }),
    };
  }

  try {
    const { type, id, status } = JSON.parse(event.body);

    if (!type || !id || !status) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Type, id, and status are required' }),
      };
    }

    const sql = getDb();
    let result;

    switch (type) {
      case 'contact':
        result = await sql`
          UPDATE contact_submissions 
          SET status = ${status} 
          WHERE id = ${id}
          RETURNING *
        `;
        break;
      case 'investment':
        result = await sql`
          UPDATE investment_inquiries 
          SET status = ${status} 
          WHERE id = ${id}
          RETURNING *
        `;
        break;
      case 'application':
        result = await sql`
          UPDATE application_submissions 
          SET status = ${status} 
          WHERE id = ${id}
          RETURNING *
        `;
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid type' }),
        };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: result[0],
      }),
    };
  } catch (error) {
    console.error('Update status error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update status' }),
    };
  }
};

