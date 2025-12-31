// Get all submissions (admin only)
import { getDb, headers } from './utils/db.js';
import { authenticateRequest } from './utils/auth.js';

export const handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Authenticate
  const auth = authenticateRequest(event);
  if (!auth.authenticated) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: auth.error || 'Unauthorized' }),
    };
  }

  try {
    const sql = getDb();
    
    // Get all contact submissions
    const contacts = await sql`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC
    `;

    // Get all investment inquiries
    const investments = await sql`
      SELECT * FROM investment_inquiries 
      ORDER BY created_at DESC
    `;

    // Get all applications
    const applications = await sql`
      SELECT * FROM application_submissions 
      ORDER BY created_at DESC
    `;

    // Get counts by status
    const contactStats = await sql`
      SELECT status, COUNT(*) as count 
      FROM contact_submissions 
      GROUP BY status
    `;

    const investmentStats = await sql`
      SELECT status, COUNT(*) as count 
      FROM investment_inquiries 
      GROUP BY status
    `;

    const applicationStats = await sql`
      SELECT status, COUNT(*) as count 
      FROM application_submissions 
      GROUP BY status
    `;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        contacts,
        investments,
        applications,
        stats: {
          contacts: contactStats,
          investments: investmentStats,
          applications: applicationStats,
        },
      }),
    };
  } catch (error) {
    console.error('Get submissions error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch submissions' }),
    };
  }
};

