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
    const { username, password, project } = JSON.parse(event.body);

    // Validate required fields
    if (!username || !password || !project) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: username, password, project' })
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

    // Validate project fields
    const { title, slug, description, github_url } = project;
    
    if (!title || !slug || !description || !github_url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Project must have title, slug, description, and github_url' })
      };
    }

    // Insert project into database
    const sql = getDb();
    const result = await sql`
      INSERT INTO projects (
        title, slug, tagline, description, github_url, demo_url, image_url,
        tech_stack, tags, features, challenges, learnings, status, visibility,
        stars, date_completed
      ) VALUES (
        ${title},
        ${slug},
        ${project.tagline || null},
        ${description},
        ${github_url},
        ${project.demo_url || null},
        ${project.image_url || null},
        ${project.tech_stack || []},
        ${project.tags || []},
        ${project.features || []},
        ${project.challenges || null},
        ${project.learnings || null},
        ${project.status || 'active'},
        ${project.visibility || 'draft'},
        ${project.stars || 0},
        ${project.date_completed || null}
      )
      RETURNING *
    `;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Project created successfully',
        project: result[0]
      })
    };

  } catch (error) {
    console.error('Webhook create project error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create project', details: error.message })
    };
  }
};
