// Get a single passion by slug with full markdown content (public endpoint)
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
    const params = event.queryStringParameters || {};
    const slug = params.slug;

    if (!slug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Passion slug is required' }),
      };
    }

    const sql = getSql();
    
    const query = `
      SELECT *
      FROM passions 
      WHERE slug = '${slug}' AND status = 'published'
    `;

    const result = await sql(query);

    if (result.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Passion not found' }),
      };
    }

    // Increment view count
    const updateQuery = `
      UPDATE passions 
      SET view_count = view_count + 1 
      WHERE slug = '${slug}'
    `;
    await sql(updateQuery);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ passion: result[0] }),
    };
  } catch (error) {
    console.error('Error fetching passion:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch passion', details: error.message }),
    };
  }
};
