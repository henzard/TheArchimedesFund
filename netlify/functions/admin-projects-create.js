// Create a new project (admin only)
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
      slug,
      tagline,
      description,
      github_url,
      demo_url,
      image_url,
      tech_stack,
      tags,
      features,
      challenges,
      learnings,
      status = 'active',
      visibility = 'draft',
      stars = 0,
      date_completed
    } = data;

    // Validate required fields
    if (!title || !slug || !description || !github_url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Title, slug, description, and GitHub URL are required' }),
      };
    }

    const sql = getSql();
    
    // Convert arrays to PostgreSQL array format
    const techStackArray = tech_stack && tech_stack.length > 0 ? `'{${tech_stack.join(',')}}'` : 'NULL';
    const tagsArray = tags && tags.length > 0 ? `'{${tags.join(',')}}'` : 'NULL';
    const featuresArray = features && features.length > 0 ? `'{${features.join(',')}}'` : 'NULL';

    const query = `
      INSERT INTO projects (
        title, slug, tagline, description, github_url, demo_url, image_url,
        tech_stack, tags, features, challenges, learnings, status, visibility, stars, date_completed
      ) VALUES (
        '${title.replace(/'/g, "''")}',
        '${slug.replace(/'/g, "''")}',
        ${tagline ? `'${tagline.replace(/'/g, "''")}'` : 'NULL'},
        '${description.replace(/'/g, "''")}',
        '${github_url}',
        ${demo_url ? `'${demo_url}'` : 'NULL'},
        ${image_url ? `'${image_url}'` : 'NULL'},
        ${techStackArray},
        ${tagsArray},
        ${featuresArray},
        ${challenges ? `'${challenges.replace(/'/g, "''")}'` : 'NULL'},
        ${learnings ? `'${learnings.replace(/'/g, "''")}'` : 'NULL'},
        '${status}',
        '${visibility}',
        ${stars},
        ${date_completed ? `'${date_completed}'` : 'NULL'}
      )
      RETURNING *
    `;

    const result = await sql(query);
    const project = result[0];

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'Project created successfully', project }),
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create project', details: error.message }),
    };
  }
};
