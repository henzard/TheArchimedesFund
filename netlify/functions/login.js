// Login endpoint
import { headers } from './utils/db.js';
import { generateToken, verifyAdmin } from './utils/auth.js';

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
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password are required' }),
      };
    }

    // Verify admin credentials
    if (verifyAdmin(email, password)) {
      const token = generateToken(email);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token,
          user: { email },
        }),
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

