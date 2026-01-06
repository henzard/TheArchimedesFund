# 🛋️ Therapist Feature - Complete Setup Guide

## Overview

The **Therapist** feature is a fun, interactive chat interface inspired by toy therapists (like the Amazon product reference). Users can share their thoughts, problems, or just vent to a quirky AI therapist that responds with random, humorous therapeutic messages.

## Features

### User Experience
- ✅ **Anonymous Sessions**: Users only need to pick a username and chat name - no registration required
- ✅ **Random Responses**: Dr. Therapist responds with 30+ pre-defined quirky therapeutic messages
- ✅ **Chat History**: All conversations are saved in the database
- ✅ **Beautiful UI**: Purple gradient theme with smooth animations and typing indicators
- ✅ **Real-time Chat**: Modern chat interface with message history
- ✅ **Responsive Design**: Works perfectly on mobile and desktop

### Admin Dashboard
- ✅ **View All Sessions**: See all therapy sessions with stats
- ✅ **Session Details**: View full conversation history for any session
- ✅ **Statistics**: Track total sessions, messages, and weekly activity
- ✅ **Session Management**: Monitor active vs archived sessions

## Database Schema

The feature adds two new tables to your PostgreSQL database:

### `therapist_sessions` Table
```sql
CREATE TABLE IF NOT EXISTS therapist_sessions (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  chat_name VARCHAR(200) NOT NULL,
  session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active'
);
```

### `therapist_messages` Table
```sql
CREATE TABLE IF NOT EXISTS therapist_messages (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES therapist_sessions(id) ON DELETE CASCADE,
  sender VARCHAR(20) NOT NULL, -- 'user' or 'therapist'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Files Created/Modified

### New Files Created

#### Frontend
1. **`archimedes-fund-app/src/pages/Therapist.jsx`**
   - Main therapist page component
   - Chat interface with welcome screen
   - Session creation and messaging logic
   - 30+ random therapist responses

2. **`archimedes-fund-app/src/pages/Therapist.css`**
   - Beautiful purple gradient theme
   - Chat bubble animations
   - Typing indicator animations
   - Responsive mobile design

#### Backend Functions
3. **`netlify/functions/therapist-create-session.js`**
   - Creates new therapy sessions
   - Validates username and chat name
   - Returns session ID for chat

4. **`netlify/functions/therapist-send-message.js`**
   - Saves user messages
   - Generates random therapist responses
   - Updates session activity timestamp
   - Returns therapist response

5. **`netlify/functions/therapist-get-history.js`**
   - Retrieves session information
   - Gets all messages for a session
   - Public endpoint (no auth required)

6. **`netlify/functions/admin-therapist-get-sessions.js`**
   - Admin-only endpoint (requires auth)
   - Lists all therapy sessions
   - Provides statistics and message counts

7. **`netlify/functions/admin-therapist-get-messages.js`**
   - Admin-only endpoint (requires auth)
   - Gets full conversation history
   - Shows session details

### Modified Files

8. **`archimedes-fund-app/src/components/Navbar.jsx`**
   - Added "Therapist" link to navigation menu

9. **`archimedes-fund-app/src/App.jsx`**
   - Added route for `/therapist` page
   - Imported Therapist component

10. **`archimedes-fund-app/src/pages/AdminDashboard.jsx`**
    - Added therapist sessions tab
    - Added therapist stats card
    - Added session list and detail views
    - Integrated therapist API calls

11. **`archimedes-fund-app/src/pages/AdminDashboard.css`**
    - Added styles for therapist management section
    - Session card styling
    - Message thread styling

12. **`database_schema.sql`**
    - Added therapist_sessions table
    - Added therapist_messages table
    - Added indexes for performance

## Deployment Steps

### 1. Update Database Schema

Run the updated `database_schema.sql` to create the new tables:

```bash
# Connect to your PostgreSQL database
psql -h [YOUR_DB_HOST] -U [YOUR_DB_USER] -d [YOUR_DB_NAME] -f database_schema.sql
```

Or run just the therapist tables:

```sql
CREATE TABLE IF NOT EXISTS therapist_sessions (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  chat_name VARCHAR(200) NOT NULL,
  session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS therapist_messages (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES therapist_sessions(id) ON DELETE CASCADE,
  sender VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_therapist_sessions_status ON therapist_sessions(status);
CREATE INDEX idx_therapist_sessions_created ON therapist_sessions(session_start DESC);
CREATE INDEX idx_therapist_messages_session ON therapist_messages(session_id);
CREATE INDEX idx_therapist_messages_created ON therapist_messages(created_at DESC);
```

### 2. Deploy to Netlify

The Netlify functions will be automatically deployed when you push to your repository. Make sure these environment variables are set in Netlify:

```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_secret_key_here
```

### 3. Test the Feature

#### Test User Flow:
1. Visit `/therapist` on your website
2. Enter a username (e.g., "John")
3. Enter a chat name (e.g., "Monday Blues")
4. Click "Start Talking"
5. Send a message to the therapist
6. See the random response

#### Test Admin Flow:
1. Login to admin dashboard at `/admin/login`
2. Navigate to the "Therapist" tab
3. View all sessions and statistics
4. Click "View Conversation" on any session
5. See full message history

## API Endpoints

### Public Endpoints

#### Create Session
```
POST /.netlify/functions/therapist-create-session
Body: {
  "username": "string",
  "chatName": "string"
}
Response: {
  "sessionId": number,
  "username": "string",
  "chatName": "string",
  "sessionStart": "timestamp"
}
```

#### Send Message
```
POST /.netlify/functions/therapist-send-message
Body: {
  "sessionId": number,
  "message": "string"
}
Response: {
  "messageId": number,
  "therapistResponse": "string",
  "timestamp": "timestamp"
}
```

#### Get History
```
GET /.netlify/functions/therapist-get-history?sessionId=123
Response: {
  "session": { session object },
  "messages": [ array of messages ]
}
```

### Admin Endpoints (Require Authorization Header)

#### Get All Sessions
```
GET /.netlify/functions/admin-therapist-get-sessions
Headers: { "Authorization": "Bearer [token]" }
Response: {
  "sessions": [ array of sessions ],
  "stats": {
    "total_sessions": number,
    "active_sessions": number,
    "sessions_this_week": number,
    "total_messages": number
  }
}
```

#### Get Session Messages
```
GET /.netlify/functions/admin-therapist-get-messages?sessionId=123
Headers: { "Authorization": "Bearer [token]" }
Response: {
  "session": { session object },
  "messages": [ array of messages ]
}
```

## Therapist Responses

The therapist has 30 pre-defined responses that are randomly selected:

- "That's interesting. Tell me more about that."
- "How does that make you feel?"
- "I see. And why do you think that is?"
- "Fascinating. When did you first notice this?"
- "Have you considered looking at it from another perspective?"
- "That sounds challenging. What do you think you should do?"
- ... and 24 more!

## Customization

### Adding More Responses

To add more therapist responses, edit the `THERAPIST_RESPONSES` array in:
- `archimedes-fund-app/src/pages/Therapist.jsx` (frontend - for display)
- `netlify/functions/therapist-send-message.js` (backend - for actual responses)

### Changing the Theme

The therapist page uses a purple gradient theme. To change it, edit:
- `archimedes-fund-app/src/pages/Therapist.css`
- Look for `.therapist-page` background gradient
- Look for `.chat-header` background gradient

### Session Limits

Currently, there are no limits on sessions or messages. To add limits:
1. Add a check in `therapist-create-session.js` to limit sessions per IP/user
2. Add a check in `therapist-send-message.js` to limit messages per session
3. Consider adding rate limiting using Netlify Edge Functions

## Future Enhancements

Potential improvements for the feature:

1. **AI Integration**: Replace random responses with actual AI (OpenAI, Claude, etc.)
2. **Session Recovery**: Allow users to continue previous sessions with a session code
3. **Export Chat**: Let users download their therapy conversations
4. **Sentiment Analysis**: Track user sentiment over time in admin dashboard
5. **Themed Responses**: Different therapist "personalities" users can choose
6. **Voice Input**: Allow users to speak their problems
7. **Anonymity Options**: Add encryption for extra privacy
8. **Session Timer**: Show how long the therapy session has been going
9. **User Ratings**: Let users rate the helpfulness of responses
10. **Scheduled Sessions**: Remind users to check in with the therapist

## Troubleshooting

### Sessions not creating
- Check database connection in Netlify environment variables
- Verify `therapist_sessions` table exists
- Check Netlify function logs for errors

### Messages not sending
- Verify session exists in database
- Check that session status is 'active'
- Review `therapist_messages` table structure

### Admin can't see sessions
- Verify JWT token is being sent correctly
- Check authorization middleware in admin functions
- Ensure admin is logged in

### Styling issues
- Clear browser cache
- Check that CSS file is imported correctly
- Verify responsive breakpoints match your device

## Support

For issues or questions:
1. Check Netlify function logs
2. Review browser console for errors
3. Verify database tables exist and have correct structure
4. Test API endpoints with Postman or curl

## Credits

Inspired by toy therapists like the [NPW Therapist Toy on Amazon](https://www.amazon.com/NPW-Therapist-Emotional-Batteries-Included/dp/B0BGXLMHRV) - a fun, lighthearted take on therapy that provides random responses to help you laugh about your problems!

---

**Note**: This is a fun feature for entertainment purposes only. It is NOT a replacement for real professional mental health support. If users need actual therapy, please encourage them to seek help from licensed professionals.
