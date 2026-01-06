const { query } = require('./utils/db');

// Fun therapist responses
const THERAPIST_RESPONSES = [
  "That's interesting. Tell me more about that.",
  "How does that make you feel?",
  "I see. And why do you think that is?",
  "Fascinating. When did you first notice this?",
  "Have you considered looking at it from another perspective?",
  "That sounds challenging. What do you think you should do?",
  "Mmm-hmm. Please, continue.",
  "Very interesting. What else is on your mind?",
  "I understand. How long has this been bothering you?",
  "Let's explore that feeling a bit more.",
  "That's quite normal. Don't be so hard on yourself.",
  "Sometimes we all feel that way. What can you do about it?",
  "I see a pattern here. Do you see it too?",
  "How do you think your past experiences relate to this?",
  "What would your ideal outcome look like?",
  "That's a valid concern. Have you talked to anyone else about this?",
  "Interesting. What do you think I should tell you?",
  "You seem to be making progress. How do you feel about that?",
  "Let's break that down. What's the core issue here?",
  "I hear you. What's stopping you from moving forward?",
  "Have you thought about what you really want?",
  "That's a lot to process. Take your time.",
  "What would happen if you tried something different?",
  "I sense some resistance. What are you afraid of?",
  "You're doing great by talking about this.",
  "How would your future self handle this situation?",
  "That's very insightful. What else have you discovered?",
  "Let me ask you this: What if you're right?",
  "Hmm. And what if you're wrong?",
  "Your feelings are valid. What can you control here?",
];

const getRandomResponse = () => {
  return THERAPIST_RESPONSES[Math.floor(Math.random() * THERAPIST_RESPONSES.length)];
};

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

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
    const { sessionId, message } = JSON.parse(event.body);

    // Validate input
    if (!sessionId || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Session ID and message are required' }),
      };
    }

    // Verify session exists
    const sessionCheck = await query(
      'SELECT id FROM therapist_sessions WHERE id = $1 AND status = $2',
      [sessionId, 'active']
    );

    if (sessionCheck.rows.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Session not found or inactive' }),
      };
    }

    // Save user message
    const userMsgResult = await query(
      `INSERT INTO therapist_messages (session_id, sender, message)
       VALUES ($1, 'user', $2)
       RETURNING id, created_at`,
      [sessionId, message.trim()]
    );

    // Generate random therapist response
    const therapistResponse = getRandomResponse();

    // Save therapist response
    const therapistMsgResult = await query(
      `INSERT INTO therapist_messages (session_id, sender, message)
       VALUES ($1, 'therapist', $2)
       RETURNING id, created_at`,
      [sessionId, therapistResponse]
    );

    // Update session last activity
    await query(
      'UPDATE therapist_sessions SET last_activity = CURRENT_TIMESTAMP WHERE id = $1',
      [sessionId]
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        messageId: therapistMsgResult.rows[0].id,
        therapistResponse,
        timestamp: therapistMsgResult.rows[0].created_at,
      }),
    };
  } catch (error) {
    console.error('Send message error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }
};
