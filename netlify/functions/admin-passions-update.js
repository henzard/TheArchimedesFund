// Update a passion (admin only)
import { getSql } from './utils/db.js';
import { verifyToken } from './utils/auth.js';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'PUT') {
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
    const { id, ...updates } = data;

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Passion ID is required' }),
      };
    }

    const sql = getSql();
    const updateFields = [];
    
    if (updates.title !== undefined) {
      updateFields.push(`title = '${updates.title.replace(/'/g, "''")}'`);
    }
    if (updates.slug !== undefined) {
      updateFields.push(`slug = '${updates.slug.replace(/'/g, "''")}'`);
    }
    if (updates.subtitle !== undefined) {
      updateFields.push(`subtitle = ${updates.subtitle ? `'${updates.subtitle.replace(/'/g, "''")}'` : 'NULL'}`);
    }
    if (updates.category !== undefined) {
      updateFields.push(`category = ${updates.category ? `'${updates.category}'` : 'NULL'}`);
    }
    if (updates.icon_emoji !== undefined) {
      updateFields.push(`icon_emoji = ${updates.icon_emoji ? `'${updates.icon_emoji}'` : 'NULL'}`);
    }
    if (updates.markdown_content !== undefined) {
      updateFields.push(`markdown_content = '${updates.markdown_content.replace(/'/g, "''")}'`);
    }
    if (updates.excerpt !== undefined) {
      updateFields.push(`excerpt = ${updates.excerpt ? `'${updates.excerpt.replace(/'/g, "''")}'` : 'NULL'}`);
    }
    if (updates.cover_image_url !== undefined) {
      updateFields.push(`cover_image_url = ${updates.cover_image_url ? `'${updates.cover_image_url}'` : 'NULL'}`);
    }
    if (updates.tags !== undefined) {
      const tagsArray = updates.tags && updates.tags.length > 0 ? `'{${updates.tags.join(',')}}'` : 'NULL';
      updateFields.push(`tags = ${tagsArray}`);
    }
    if (updates.reading_time !== undefined) {
      updateFields.push(`reading_time = ${updates.reading_time || 'NULL'}`);
    }
    if (updates.status !== undefined) {
      updateFields.push(`status = '${updates.status}'`);
    }
    if (updates.date_published !== undefined) {
      updateFields.push(`date_published = ${updates.date_published ? `'${updates.date_published}'` : 'NULL'}`);
    }
    
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (updateFields.length === 1) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No fields to update' }),
      };
    }

    const query = `
      UPDATE passions 
      SET ${updateFields.join(', ')}
      WHERE id = ${id}
      RETURNING *
    `;

    const result = await sql(query);
    
    if (result.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Passion not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Passion updated successfully', passion: result[0] }),
    };
  } catch (error) {
    console.error('Error updating passion:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update passion', details: error.message }),
    };
  }
};
