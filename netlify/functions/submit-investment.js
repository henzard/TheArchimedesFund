// Submit investment inquiry
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
    const { name, email, phone, company, investment_tier, investment_amount, message } = JSON.parse(event.body);

    if (!name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and email are required' }),
      };
    }

    const sql = getDb();
    
    const result = await sql`
      INSERT INTO investment_inquiries (
        name, email, phone, company, investment_tier, investment_amount, message
      )
      VALUES (
        ${name}, ${email}, ${phone || null}, ${company || null}, 
        ${investment_tier || null}, ${investment_amount || null}, ${message || null}
      )
      RETURNING id, created_at
    `;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Investment inquiry submitted successfully',
        id: result[0].id,
      }),
    };
  } catch (error) {
    console.error('Investment inquiry error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to submit investment inquiry' }),
    };
  }
};

