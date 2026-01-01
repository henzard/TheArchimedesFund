// Get all published projects (public endpoint)
import { getSql } from './utils/db.js';

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

  try {
    const sql = getSql();
    
    // Parse query parameters
    const params = event.queryStringParameters || {};
    const tag = params.tag;
    const tech = params.tech;
    const search = params.search;
    const status = params.status;
    const limit = parseInt(params.limit) || 100;
    const offset = parseInt(params.offset) || 0;

    let query = `
      SELECT id, title, slug, tagline, description, github_url, demo_url, image_url,
             tech_stack, tags, features, challenges, learnings, status, stars,
             date_completed, created_at, updated_at
      FROM projects 
      WHERE visibility = 'published'
    `;
    
    const conditions = [];
    
    // Filter by tag
    if (tag) {
      conditions.push(`'${tag}' = ANY(tags)`);
    }
    
    // Filter by tech stack
    if (tech) {
      conditions.push(`'${tech}' = ANY(tech_stack)`);
    }
    
    // Filter by status
    if (status) {
      conditions.push(`status = '${status}'`);
    }
    
    // Search in title, tagline, or description
    if (search) {
      conditions.push(`(
        title ILIKE '%${search}%' OR 
        tagline ILIKE '%${search}%' OR 
        description ILIKE '%${search}%'
      )`);
    }
    
    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }
    
    query += ` ORDER BY date_completed DESC NULLS LAST, created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const projects = await sql(query);
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM projects WHERE visibility = 'published'`;
    const countResult = await sql(countQuery);
    const totalCount = parseInt(countResult[0].count);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        projects,
        total: totalCount,
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
