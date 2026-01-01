// Get all books including drafts (admin only)
import { getSql } from './utils/db.js';
import { verifyToken } from './utils/auth.js';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

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
    const sql = getSql();
    
    const params = event.queryStringParameters || {};
    const limit = parseInt(params.limit) || 50;
    const offset = parseInt(params.offset) || 0;
    const status = params.status || 'all'; // 'all', 'published', 'draft'

    let query = `
      SELECT id, title, author, cover_image_url, rating, tags, problems_solved, 
             impact, key_takeaways, date_read, goodreads_url, amazon_url, status, 
             created_at, updated_at
      FROM books
    `;
    
    if (status !== 'all') {
      query += ` WHERE status = '${status}'`;
    }
    
    query += ` ORDER BY updated_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const books = await sql(query);
    
    // Get counts by status
    const statsQuery = `
      SELECT 
        status,
        COUNT(*) as count
      FROM books
      GROUP BY status
    `;
    const stats = await sql(statsQuery);
    
    const countByStatus = {
      published: 0,
      draft: 0
    };
    
    stats.forEach(stat => {
      countByStatus[stat.status] = parseInt(stat.count);
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        books,
        stats: countByStatus,
        total: countByStatus.published + countByStatus.draft,
        limit,
        offset 
      }),
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch books', details: error.message }),
    };
  }
};
