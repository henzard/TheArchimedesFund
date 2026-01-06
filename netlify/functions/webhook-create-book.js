import { getDb, headers } from './utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { username, password, book } = JSON.parse(event.body);

    // Validate required fields
    if (!username || !password || !book) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: username, password, book' })
      };
    }

    // Verify admin credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username !== adminEmail) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    const isValidPassword = await bcrypt.compare(password, adminPassword);
    if (!isValidPassword) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    // Validate book fields
    const { title, author, rating, tags, problems_solved, impact, status } = book;
    
    if (!title || !author || !impact) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Book must have title, author, and impact' })
      };
    }

    // Insert book into database
    const sql = getDb();
    const result = await sql`
      INSERT INTO books (
        title, author, cover_image_url, rating, tags, problems_solved,
        impact, key_takeaways, date_read, goodreads_url, amazon_url, status
      ) VALUES (
        ${title},
        ${author},
        ${book.cover_image_url || null},
        ${rating || 5},
        ${tags || []},
        ${problems_solved || []},
        ${impact},
        ${book.key_takeaways || null},
        ${book.date_read || null},
        ${book.goodreads_url || null},
        ${book.amazon_url || null},
        ${status || 'draft'}
      )
      RETURNING *
    `;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Book created successfully',
        book: result[0]
      })
    };

  } catch (error) {
    console.error('Webhook create book error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create book', details: error.message })
    };
  }
};
