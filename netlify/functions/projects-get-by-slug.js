// Get a single project by slug (public endpoint)
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
        body: JSON.stringify({ error: 'Project slug is required' }),
      };
    }

    const sql = getSql();
    
    const query = `
      SELECT id, title, slug, tagline, description, github_url, demo_url, image_url,
             tech_stack, tags, features, challenges, learnings, status, stars,
             date_completed, created_at, updated_at
      FROM projects 
      WHERE slug = '${slug}' AND visibility = 'published'
    `;

    const result = await sql(query);

    if (result.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Project not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ project: result[0] }),
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch project', details: error.message }),
    };
  }
};
