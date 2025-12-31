// Submit student application
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
    const data = JSON.parse(event.body);

    const required = ['fullName', 'email', 'phone', 'dateOfBirth', 'address', 'educationLevel', 
                     'currentSituation', 'programmingExperience', 'financialSituation', 
                     'whyApply', 'goals', 'commitment'];
    
    const missing = required.filter(field => !data[field]);
    if (missing.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
      };
    }

    const sql = getDb();
    
    const result = await sql`
      INSERT INTO application_submissions (
        full_name, email, phone, date_of_birth, address, education_level,
        current_situation, programming_experience, financial_situation,
        why_apply, goals, commitment, hear_about_us
      )
      VALUES (
        ${data.fullName}, ${data.email}, ${data.phone}, ${data.dateOfBirth},
        ${data.address}, ${data.educationLevel}, ${data.currentSituation},
        ${data.programmingExperience}, ${data.financialSituation},
        ${data.whyApply}, ${data.goals}, ${data.commitment}, ${data.hearAboutUs || null}
      )
      RETURNING id, created_at
    `;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Application submitted successfully',
        id: result[0].id,
      }),
    };
  } catch (error) {
    console.error('Application submission error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to submit application' }),
    };
  }
};

