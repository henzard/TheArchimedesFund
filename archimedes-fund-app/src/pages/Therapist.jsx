import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, User } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './Therapist.css';

// Fun therapist responses like the toy
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

const Therapist = () => {
  const [username, setUsername] = useState('');
  const [chatName, setChatName] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = () => {
    return THERAPIST_RESPONSES[Math.floor(Math.random() * THERAPIST_RESPONSES.length)];
  };

  const handleStartSession = async (e) => {
    e.preventDefault();
    if (!username.trim() || !chatName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/therapist-create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          chatName: chatName.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        setShowWelcome(false);
        
        // Add welcome message
        setMessages([{
          id: 'welcome',
          sender: 'therapist',
          message: `Hello ${username}! Welcome to "${chatName}". I'm here to listen. What's on your mind?`,
          created_at: new Date().toISOString(),
        }]);
      } else {
        alert('Failed to start session. Please try again.');
      }
    } catch (error) {
      console.error('Start session error:', error);
      alert('Failed to start session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !sessionId) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to UI immediately
    const newUserMsg = {
      id: `temp-${Date.now()}`,
      sender: 'user',
      message: userMessage,
      created_at: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    try {
      // Send message to backend
      const response = await fetch('/.netlify/functions/therapist-send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add therapist response after a short delay (more realistic)
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: data.messageId,
            sender: 'therapist',
            message: data.therapistResponse,
            created_at: new Date().toISOString(),
          }]);
          setLoading(false);
        }, 800);
      } else {
        alert('Failed to send message. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Send message error:', error);
      alert('Failed to send message. Please try again.');
      setLoading(false);
    }
  };

  const handleLoadSession = async () => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const response = await fetch(`/.netlify/functions/therapist-get-history?sessionId=${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Load history error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="therapist-page">
      <div className="therapist-hero">
        <div className="container">
          <div className="therapist-hero-content">
            <h1>🛋️ The Digital Therapist</h1>
            <p className="therapist-tagline">
              Sometimes you just need someone to listen... even if it's a quirky AI therapist!
            </p>
            <p className="therapist-disclaimer">
              <em>Note: This is a fun, lighthearted feature inspired by toy therapists. Not a replacement for real professional help!</em>
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {showWelcome ? (
          <div className="therapist-welcome">
            <Card padding="large" className="welcome-card">
              <div className="welcome-icon">
                <MessageCircle size={64} />
              </div>
              <h2>Start Your Therapy Session</h2>
              <p>Share your thoughts, problems, or just vent. The therapist is here to listen and respond with... interesting insights.</p>
              
              <form onSubmit={handleStartSession} className="session-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <User size={18} /> Your Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    required
                    maxLength={50}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="chatName">
                    <MessageCircle size={18} /> Chat Session Name
                  </label>
                  <input
                    id="chatName"
                    type="text"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    placeholder="e.g., Monday Blues, Work Stress, Life Decisions"
                    required
                    maxLength={100}
                  />
                  <small>Give your session a name so you can identify it later</small>
                </div>
                
                <Button type="submit" variant="primary" size="large" fullWidth disabled={loading}>
                  {loading ? 'Starting Session...' : 'Start Talking'}
                </Button>
              </form>
            </Card>
          </div>
        ) : (
          <div className="therapist-chat">
            <Card padding="none" className="chat-card">
              <div className="chat-header">
                <div className="chat-header-info">
                  <h3>🛋️ Therapy Session: {chatName}</h3>
                  <p>Talking to the therapist as <strong>{username}</strong></p>
                </div>
              </div>
              
              <div className="chat-messages">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.sender === 'user' ? 'message-user' : 'message-therapist'}`}
                  >
                    <div className="message-avatar">
                      {msg.sender === 'user' ? (
                        <User size={20} />
                      ) : (
                        <span className="therapist-emoji">🧠</span>
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-sender">
                          {msg.sender === 'user' ? username : 'Dr. Therapist'}
                        </span>
                        <span className="message-time">
                          {new Date(msg.created_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="message-text">{msg.message}</p>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="message message-therapist">
                    <div className="message-avatar">
                      <span className="therapist-emoji">🧠</span>
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-sender">Dr. Therapist</span>
                      </div>
                      <p className="message-text typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="chat-input"
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={loading || !inputMessage.trim()}
                  className="send-button"
                >
                  <Send size={20} />
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Therapist;
