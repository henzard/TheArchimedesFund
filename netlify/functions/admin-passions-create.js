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
    
    // Helper function to safely escape strings for PostgreSQL
    const escapeString = (str) => {
      if (!str) return null;
      return str.replace(/'/g, "''").replace(/\\/g, '\\\\');
    };
    
    // Helper function to format arrays for PostgreSQL
    const formatArray = (arr) => {
      if (!arr || arr.length === 0) return 'NULL';
      const escapedItems = arr.map(item => escapeString(item.toString()));
      return `ARRAY[${escapedItems.map(item => `'${item}'`).join(',')}]`;
    };

    const tagsArray = formatArray(tags);

    const query = `
      INSERT INTO passions (
        title, slug, subtitle, category, icon_emoji, markdown_content, excerpt,
        cover_image_url, tags, reading_time, status, date_published
      ) VALUES (
        '${escapeString(title)}',
        '${escapeString(slug)}',
        ${subtitle ? `'${escapeString(subtitle)}'` : 'NULL'},
        ${category ? `'${category}'` : 'NULL'},
        ${icon_emoji ? `'${icon_emoji}'` : 'NULL'},
        '${escapeString(markdown_content)}',
        ${excerpt ? `'${escapeString(excerpt)}'` : 'NULL'},
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
