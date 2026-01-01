// Get all projects including drafts (admin only)
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
    const visibility = params.visibility || 'all'; // 'all', 'published', 'draft'

    let query = `
      SELECT id, title, slug, tagline, description, github_url, demo_url, image_url,
             tech_stack, tags, features, challenges, learnings, status, visibility, stars,
             date_completed, created_at, updated_at
      FROM projects
    `;
    
    if (visibility !== 'all') {
      query += ` WHERE visibility = '${visibility}'`;
    }
    
    query += ` ORDER BY updated_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const projects = await sql(query);
    
    // Get counts by visibility
    const statsQuery = `
      SELECT 
        visibility,
        COUNT(*) as count
      FROM projects
      GROUP BY visibility
    `;
    const stats = await sql(statsQuery);
    
    const countByVisibility = {
      published: 0,
      draft: 0
    };
    
    stats.forEach(stat => {
      countByVisibility[stat.visibility] = parseInt(stat.count);
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        projects,
        stats: countByVisibility,
        total: countByVisibility.published + countByVisibility.draft,
        limit,
        offset 
      }),
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch projects', details: error.message }),
    };
  }
};
