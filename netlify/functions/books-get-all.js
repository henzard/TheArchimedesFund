// Get all published books (public endpoint)
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
    const problem = params.problem;
    const search = params.search;
    const limit = parseInt(params.limit) || 100;
    const offset = parseInt(params.offset) || 0;

    let query = `
      SELECT id, title, author, cover_image_url, rating, tags, problems_solved, 
             impact, key_takeaways, date_read, goodreads_url, amazon_url, created_at
      FROM books 
      WHERE status = 'published'
    `;
    
    const conditions = [];
    
    // Filter by tag
    if (tag) {
      conditions.push(`'${tag}' = ANY(tags)`);
    }
    
    // Filter by problem
    if (problem) {
      conditions.push(`'${problem}' = ANY(problems_solved)`);
    }
    
    // Search in title, author, or impact
    if (search) {
      conditions.push(`(
        title ILIKE '%${search}%' OR 
        author ILIKE '%${search}%' OR 
        impact ILIKE '%${search}%'
      )`);
    }
    
    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }
    
    query += ` ORDER BY date_read DESC NULLS LAST, created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const books = await sql(query);
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM books WHERE status = 'published'`;
    const countResult = await sql(countQuery);
    const totalCount = parseInt(countResult[0].count);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        books,
        total: totalCount,
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
