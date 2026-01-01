// Update a project (admin only)
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
        body: JSON.stringify({ error: 'Project ID is required' }),
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
    
    // Build update query dynamically
    const updateFields = [];
    
    if (updates.title !== undefined) {
      updateFields.push(`title = '${escapeString(updates.title)}'`);
    }
    if (updates.slug !== undefined) {
      updateFields.push(`slug = '${escapeString(updates.slug)}'`);
    }
    if (updates.tagline !== undefined) {
      updateFields.push(`tagline = ${updates.tagline ? `'${escapeString(updates.tagline)}'` : 'NULL'}`);
    }
    if (updates.description !== undefined) {
      updateFields.push(`description = '${escapeString(updates.description)}'`);
    }
    if (updates.github_url !== undefined) {
      updateFields.push(`github_url = '${updates.github_url}'`);
    }
    if (updates.demo_url !== undefined) {
      updateFields.push(`demo_url = ${updates.demo_url ? `'${updates.demo_url}'` : 'NULL'}`);
    }
    if (updates.image_url !== undefined) {
      updateFields.push(`image_url = ${updates.image_url ? `'${updates.image_url}'` : 'NULL'}`);
    }
    if (updates.tech_stack !== undefined) {
      updateFields.push(`tech_stack = ${formatArray(updates.tech_stack)}`);
    }
    if (updates.tags !== undefined) {
      updateFields.push(`tags = ${formatArray(updates.tags)}`);
    }
    if (updates.features !== undefined) {
      updateFields.push(`features = ${formatArray(updates.features)}`);
    }
    if (updates.challenges !== undefined) {
      updateFields.push(`challenges = ${updates.challenges ? `'${escapeString(updates.challenges)}'` : 'NULL'}`);
    }
    if (updates.learnings !== undefined) {
      updateFields.push(`learnings = ${updates.learnings ? `'${escapeString(updates.learnings)}'` : 'NULL'}`);
    }
    if (updates.status !== undefined) {
      updateFields.push(`status = '${updates.status}'`);
    }
    if (updates.visibility !== undefined) {
      updateFields.push(`visibility = '${updates.visibility}'`);
    }
    if (updates.stars !== undefined) {
      updateFields.push(`stars = ${updates.stars}`);
    }
    if (updates.date_completed !== undefined) {
      updateFields.push(`date_completed = ${updates.date_completed ? `'${updates.date_completed}'` : 'NULL'}`);
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
      UPDATE projects 
      SET ${updateFields.join(', ')}
      WHERE id = ${id}
      RETURNING *
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
      body: JSON.stringify({ message: 'Project updated successfully', project: result[0] }),
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update project', details: error.message }),
    };
  }
};
