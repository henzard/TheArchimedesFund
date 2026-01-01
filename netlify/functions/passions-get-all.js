// Get all published passions (public endpoint)
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
    
    const params = event.queryStringParameters || {};
    const category = params.category;
    const tag = params.tag;
    const search = params.search;
    const limit = parseInt(params.limit) || 100;
    const offset = parseInt(params.offset) || 0;

    let query = `
      SELECT id, title, slug, subtitle, category, icon_emoji, excerpt,
             cover_image_url, tags, reading_time, view_count, date_published, created_at
      FROM passions 
      WHERE status = 'published'
    `;
    
    const conditions = [];
    
    if (category) {
      conditions.push(`category = '${category}'`);
    }
    
    if (tag) {
      conditions.push(`'${tag}' = ANY(tags)`);
    }
    
    if (search) {
      conditions.push(`(
        title ILIKE '%${search}%' OR 
        subtitle ILIKE '%${search}%' OR 
        excerpt ILIKE '%${search}%'
      )`);
    }
    
    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }
    
    query += ` ORDER BY date_published DESC NULLS LAST, created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const passions = await sql(query);
    
    const countQuery = `SELECT COUNT(*) as count FROM passions WHERE status = 'published'`;
    const countResult = await sql(countQuery);
    const totalCount = parseInt(countResult[0].count);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        passions,
        total: totalCount,
        limit,
        offset 
      }),
    };
  } catch (error) {
    console.error('Error fetching passions:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch passions', details: error.message }),
    };
  }
};
