// Admin: Get therapist session messages
import { getDb, headers } from './utils/db.js';
import { verifyToken } from './utils/auth.js';

export const handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Verify admin token
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' }),
      };
    }

    const sessionId = event.queryStringParameters?.sessionId;

    if (!sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Session ID is required' }),
      };
    }

    const sql = getDb();

    // Get session info
    const sessionResult = await sql`
      SELECT * FROM therapist_sessions 
      WHERE id = ${sessionId}
    `;

    if (sessionResult.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Session not found' }),
      };
    }

    // Get all messages for this session
    const messagesResult = await sql`
      SELECT id, sender, message, created_at
      FROM therapist_messages
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        session: sessionResult[0],
        messages: messagesResult,
      }),
    };
  } catch (error) {
    console.error('Admin get messages error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve messages', details: error.message }),
    };
  }
};
