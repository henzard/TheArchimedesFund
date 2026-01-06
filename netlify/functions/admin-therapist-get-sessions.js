// Admin: Get all therapist sessions
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

    const sql = getDb();

    // Get all therapist sessions with message counts
    const sessionsResult = await sql`
      SELECT 
        ts.id,
        ts.username,
        ts.chat_name,
        ts.session_start,
        ts.last_activity,
        ts.status,
        COUNT(tm.id)::int as message_count,
        MAX(tm.created_at) as last_message_at
      FROM therapist_sessions ts
      LEFT JOIN therapist_messages tm ON ts.id = tm.session_id
      GROUP BY ts.id
      ORDER BY ts.last_activity DESC
    `;

    // Get stats
    const statsResult = await sql`
      SELECT 
        COUNT(DISTINCT id)::int as total_sessions,
        COUNT(DISTINCT CASE WHEN status = 'active' THEN id END)::int as active_sessions,
        COUNT(DISTINCT CASE WHEN session_start > NOW() - INTERVAL '7 days' THEN id END)::int as sessions_this_week
      FROM therapist_sessions
    `;

    const messageStatsResult = await sql`
      SELECT COUNT(*)::int as total_messages
      FROM therapist_messages
    `;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessions: sessionsResult,
        stats: {
          ...statsResult[0],
          total_messages: messageStatsResult[0].total_messages,
        },
      }),
    };
  } catch (error) {
    console.error('Admin get sessions error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve sessions', details: error.message }),
    };
  }
};
