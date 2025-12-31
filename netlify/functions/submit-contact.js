// Submit contact form
import { getDb, headers } from './utils/db.js';

export const handler = async (event) => {
  // Handle preflight
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

  try {
    const { name, email, phone, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email, and message are required' }),
      };
    }

    const sql = getDb();
    
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, message, submission_type)
      VALUES (${name}, ${email}, ${phone || null}, ${message}, 'contact')
      RETURNING id, created_at
    `;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        id: result[0].id,
      }),
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to submit contact form' }),
    };
  }
};

