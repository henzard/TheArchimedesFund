const { query } = require('./utils/db');

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

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

    // Create new session
    const result = await query(
      `INSERT INTO therapist_sessions (username, chat_name, status)
       VALUES ($1, $2, 'active')
       RETURNING id, username, chat_name, session_start`,
      [username.trim(), chatName.trim()]
    );

    const session = result.rows[0];

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
      body: JSON.stringify({ error: 'Failed to create session' }),
    };
  }
};
