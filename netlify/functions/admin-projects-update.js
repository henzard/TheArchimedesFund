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
    
    // Build update query dynamically
    const updateFields = [];
    
    if (updates.title !== undefined) {
      updateFields.push(`title = '${updates.title.replace(/'/g, "''")}'`);
    }
    if (updates.slug !== undefined) {
      updateFields.push(`slug = '${updates.slug.replace(/'/g, "''")}'`);
    }
    if (updates.tagline !== undefined) {
      updateFields.push(`tagline = ${updates.tagline ? `'${updates.tagline.replace(/'/g, "''")}'` : 'NULL'}`);
    }
    if (updates.description !== undefined) {
      updateFields.push(`description = '${updates.description.replace(/'/g, "''")}'`);
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
      const techStackArray = updates.tech_stack && updates.tech_stack.length > 0 
        ? `'{${updates.tech_stack.join(',')}}'` 
        : 'NULL';
      updateFields.push(`tech_stack = ${techStackArray}`);
    }
    if (updates.tags !== undefined) {
      const tagsArray = updates.tags && updates.tags.length > 0 ? `'{${updates.tags.join(',')}}'` : 'NULL';
      updateFields.push(`tags = ${tagsArray}`);
    }
    if (updates.features !== undefined) {
      const featuresArray = updates.features && updates.features.length > 0 
        ? `'{${updates.features.join(',')}}'` 
        : 'NULL';
      updateFields.push(`features = ${featuresArray}`);
    }
    if (updates.challenges !== undefined) {
      updateFields.push(`challenges = ${updates.challenges ? `'${updates.challenges.replace(/'/g, "''")}'` : 'NULL'}`);
    }
    if (updates.learnings !== undefined) {
      updateFields.push(`learnings = ${updates.learnings ? `'${updates.learnings.replace(/'/g, "''")}'` : 'NULL'}`);
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
