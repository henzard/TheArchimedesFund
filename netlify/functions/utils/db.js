// Database utility for Neon connection
import { neon } from '@neondatabase/serverless';

let sql;

export const getDb = () => {
  if (!sql) {
    const connectionString = process.env.NETLIFY_DATABASE_URL;
    if (!connectionString) {
      throw new Error('NETLIFY_DATABASE_URL environment variable is not set');
    }
    sql = neon(connectionString);
  }
  return sql;
};

export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json',
};

