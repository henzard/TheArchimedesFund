// Create therapist session
import { getDb, headers } from './utils/db.js';

export const handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { username, chatName } = JSON.parse(event.body);

    // Validate input
    if (!username || !chatName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Username and chat name are required' }),
      };
    }

    const sql = getDb();
    
    // Create new session
    const result = await sql`
      INSERT INTO therapist_sessions (username, chat_name, status)
      VALUES (${username.trim()}, ${chatName.trim()}, 'active')
      RETURNING id, username, chat_name, session_start
    `;

    const session = result[0];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        username: session.username,
        chatName: session.chat_name,
        sessionStart: session.session_start,
      }),
    };
  } catch (error) {
    console.error('Create session error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create session', details: error.message }),
    };
  }
};
