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

    const techStackArray = formatArray(tech_stack);
    const tagsArray = formatArray(tags);
    const featuresArray = formatArray(features);

    const query = `
      INSERT INTO projects (
        title, slug, tagline, description, github_url, demo_url, image_url,
        tech_stack, tags, features, challenges, learnings, status, visibility, stars, date_completed
      ) VALUES (
        '${escapeString(title)}',
        '${escapeString(slug)}',
        ${tagline ? `'${escapeString(tagline)}'` : 'NULL'},
        '${escapeString(description)}',
        '${github_url}',
        ${demo_url ? `'${demo_url}'` : 'NULL'},
        ${image_url ? `'${image_url}'` : 'NULL'},
        ${techStackArray},
        ${tagsArray},
        ${featuresArray},
        ${challenges ? `'${escapeString(challenges)}'` : 'NULL'},
        ${learnings ? `'${escapeString(learnings)}'` : 'NULL'},
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
