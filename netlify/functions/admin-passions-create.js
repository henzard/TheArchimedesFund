// Create a new passion (admin only)
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
      slug,
      subtitle,
      category,
      icon_emoji,
      markdown_content,
      excerpt,
      cover_image_url,
      tags,
      reading_time,
      status = 'draft',
      date_published
    } = data;

    if (!title || !slug || !markdown_content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Title, slug, and markdown content are required' }),
      };
    }

    const sql = getSql();
    
    const tagsArray = tags && tags.length > 0 ? `'{${tags.join(',')}}'` : 'NULL';

    const query = `
      INSERT INTO passions (
        title, slug, subtitle, category, icon_emoji, markdown_content, excerpt,
        cover_image_url, tags, reading_time, status, date_published
      ) VALUES (
        '${title.replace(/'/g, "''")}',
        '${slug.replace(/'/g, "''")}',
        ${subtitle ? `'${subtitle.replace(/'/g, "''")}'` : 'NULL'},
        ${category ? `'${category}'` : 'NULL'},
        ${icon_emoji ? `'${icon_emoji}'` : 'NULL'},
        '${markdown_content.replace(/'/g, "''")}',
        ${excerpt ? `'${excerpt.replace(/'/g, "''")}'` : 'NULL'},
        ${cover_image_url ? `'${cover_image_url}'` : 'NULL'},
        ${tagsArray},
        ${reading_time || 'NULL'},
        '${status}',
        ${date_published ? `'${date_published}'` : 'NULL'}
      )
      RETURNING *
    `;

    const result = await sql(query);
    const passion = result[0];

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'Passion created successfully', passion }),
    };
  } catch (error) {
    console.error('Error creating passion:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create passion', details: error.message }),
    };
  }
};
