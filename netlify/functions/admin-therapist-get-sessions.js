const { query } = require('./utils/db');
const { verifyToken } = require('./utils/auth');

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

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

    // Get all therapist sessions with message counts
    const sessionsResult = await query(
      `SELECT 
        ts.id,
        ts.username,
        ts.chat_name,
        ts.session_start,
        ts.last_activity,
        ts.status,
        COUNT(tm.id) as message_count,
        MAX(tm.created_at) as last_message_at
       FROM therapist_sessions ts
       LEFT JOIN therapist_messages tm ON ts.id = tm.session_id
       GROUP BY ts.id
       ORDER BY ts.last_activity DESC`
    );

    // Get stats
    const statsResult = await query(
      `SELECT 
        COUNT(DISTINCT id) as total_sessions,
        COUNT(DISTINCT CASE WHEN status = 'active' THEN id END) as active_sessions,
        COUNT(DISTINCT CASE WHEN session_start > NOW() - INTERVAL '7 days' THEN id END) as sessions_this_week
       FROM therapist_sessions`
    );

    const messageStatsResult = await query(
      `SELECT COUNT(*) as total_messages
       FROM therapist_messages`
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessions: sessionsResult.rows,
        stats: {
          ...statsResult.rows[0],
          total_messages: parseInt(messageStatsResult.rows[0].total_messages),
        },
      }),
    };
  } catch (error) {
    console.error('Admin get sessions error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve sessions' }),
    };
  }
};
