import { getDb, headers } from './utils/db.js';
import { verifyAdmin } from './utils/auth.js';

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
    const { username, password, passion } = JSON.parse(event.body);

    // Validate required fields
    if (!username || !password || !passion) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: username, password, passion' })
      };
    }

    // Verify admin credentials
    if (!verifyAdmin(username, password)) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    // Validate passion fields
    const { title, slug, markdown_content } = passion;
    
    if (!title || !slug || !markdown_content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Passion must have title, slug, and markdown_content' })
      };
    }

    // Insert passion into database
    const sql = getDb();
    const result = await sql`
      INSERT INTO passions (
        title, slug, subtitle, category, icon_emoji, markdown_content,
        excerpt, cover_image_url, tags, reading_time, status, date_published
      ) VALUES (
        ${title},
        ${slug},
        ${passion.subtitle || null},
        ${passion.category || null},
        ${passion.icon_emoji || null},
        ${markdown_content},
        ${passion.excerpt || null},
        ${passion.cover_image_url || null},
        ${passion.tags || []},
        ${passion.reading_time || 5},
        ${passion.status || 'draft'},
        ${passion.date_published || null}
      )
      RETURNING *
    `;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Passion created successfully',
        passion: result[0]
      })
    };

  } catch (error) {
    console.error('Webhook create passion error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create passion', details: error.message })
    };
  }
};
