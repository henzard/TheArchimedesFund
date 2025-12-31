// Authentication utility
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'henzardkruger@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Alicia07';

export const generateToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyAdmin = (email, password) => {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};

export const authenticateRequest = (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, error: 'No token provided' };
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return { authenticated: false, error: 'Invalid token' };
  }

  return { authenticated: true, email: decoded.email };
};

