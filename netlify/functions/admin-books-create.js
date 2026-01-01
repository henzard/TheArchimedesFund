// Create a new book (admin only)
import { getSql } from './utils/db.js';
import { verifyToken } from './utils/auth.js';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

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
    const data = JSON.parse(event.body);
    const {
      title,
      author,
      cover_image_url,
      rating,
      tags,
      problems_solved,
      impact,
      key_takeaways,
      date_read,
      goodreads_url,
      amazon_url,
      status = 'draft'
    } = data;

    // Validate required fields
    if (!title || !author || !impact) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Title, author, and impact are required' }),
      };
    }

    const sql = getSql();
    
    // Convert arrays to PostgreSQL array format
    const tagsArray = tags && tags.length > 0 ? `'{${tags.join(',')}}'` : 'NULL';
    const problemsArray = problems_solved && problems_solved.length > 0 ? `'{${problems_solved.join(',')}}'` : 'NULL';

    const query = `
      INSERT INTO books (
        title, author, cover_image_url, rating, tags, problems_solved, 
        impact, key_takeaways, date_read, goodreads_url, amazon_url, status
      ) VALUES (
        '${title.replace(/'/g, "''")}',
        '${author.replace(/'/g, "''")}',
        ${cover_image_url ? `'${cover_image_url}'` : 'NULL'},
        ${rating || 'NULL'},
        ${tagsArray},
        ${problemsArray},
        '${impact.replace(/'/g, "''")}',
        ${key_takeaways ? `'${key_takeaways.replace(/'/g, "''")}'` : 'NULL'},
        ${date_read ? `'${date_read}'` : 'NULL'},
        ${goodreads_url ? `'${goodreads_url}'` : 'NULL'},
        ${amazon_url ? `'${amazon_url}'` : 'NULL'},
        '${status}'
      )
      RETURNING *
    `;

    const result = await sql(query);
    const book = result[0];

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'Book created successfully', book }),
    };
  } catch (error) {
    console.error('Error creating book:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create book', details: error.message }),
    };
  }
};
