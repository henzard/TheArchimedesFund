// Update a book (admin only)
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
    const { id, ...updates } = data;

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Book ID is required' }),
      };
    }

    const sql = getSql();
    
    // Build update query dynamically
    const updateFields = [];
    
    if (updates.title !== undefined) {
      updateFields.push(`title = '${updates.title.replace(/'/g, "''")}'`);
    }
    if (updates.author !== undefined) {
      updateFields.push(`author = '${updates.author.replace(/'/g, "''")}'`);
    }
    if (updates.cover_image_url !== undefined) {
      updateFields.push(`cover_image_url = ${updates.cover_image_url ? `'${updates.cover_image_url}'` : 'NULL'}`);
    }
    if (updates.rating !== undefined) {
      updateFields.push(`rating = ${updates.rating || 'NULL'}`);
    }
    if (updates.tags !== undefined) {
      const tagsArray = updates.tags && updates.tags.length > 0 ? `'{${updates.tags.join(',')}}'` : 'NULL';
      updateFields.push(`tags = ${tagsArray}`);
    }
    if (updates.problems_solved !== undefined) {
      const problemsArray = updates.problems_solved && updates.problems_solved.length > 0 
        ? `'{${updates.problems_solved.join(',')}}'` 
        : 'NULL';
      updateFields.push(`problems_solved = ${problemsArray}`);
    }
    if (updates.impact !== undefined) {
      updateFields.push(`impact = '${updates.impact.replace(/'/g, "''")}'`);
    }
    if (updates.key_takeaways !== undefined) {
      updateFields.push(`key_takeaways = ${updates.key_takeaways ? `'${updates.key_takeaways.replace(/'/g, "''")}'` : 'NULL'}`);
    }
    if (updates.date_read !== undefined) {
      updateFields.push(`date_read = ${updates.date_read ? `'${updates.date_read}'` : 'NULL'}`);
    }
    if (updates.goodreads_url !== undefined) {
      updateFields.push(`goodreads_url = ${updates.goodreads_url ? `'${updates.goodreads_url}'` : 'NULL'}`);
    }
    if (updates.amazon_url !== undefined) {
      updateFields.push(`amazon_url = ${updates.amazon_url ? `'${updates.amazon_url}'` : 'NULL'}`);
    }
    if (updates.status !== undefined) {
      updateFields.push(`status = '${updates.status}'`);
    }
    
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (updateFields.length === 1) { // Only updated_at
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No fields to update' }),
      };
    }

    const query = `
      UPDATE books 
      SET ${updateFields.join(', ')}
      WHERE id = ${id}
      RETURNING *
    `;

    const result = await sql(query);
    
    if (result.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Book not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Book updated successfully', book: result[0] }),
    };
  } catch (error) {
    console.error('Error updating book:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update book', details: error.message }),
    };
  }
};
