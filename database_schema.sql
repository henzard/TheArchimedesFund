-- Create users table (just for your admin account)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  submission_type VARCHAR(50) DEFAULT 'contact', -- 'contact' or 'general'
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'read', 'responded', 'archived'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create investment inquiries table
CREATE TABLE IF NOT EXISTS investment_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  investment_tier VARCHAR(50), -- 'supporter', 'partner', 'founder'
  investment_amount VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'meeting_scheduled', 'closed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create application submissions table (for students applying)
CREATE TABLE IF NOT EXISTS application_submissions (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT NOT NULL,
  education_level VARCHAR(100) NOT NULL,
  current_situation TEXT NOT NULL,
  programming_experience VARCHAR(50) NOT NULL,
  financial_situation TEXT NOT NULL,
  why_apply TEXT NOT NULL,
  goals TEXT NOT NULL,
  commitment VARCHAR(50) NOT NULL,
  hear_about_us VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'reviewing', 'interview', 'accepted', 'rejected'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX idx_investment_status ON investment_inquiries(status);
CREATE INDEX idx_investment_created ON investment_inquiries(created_at DESC);
CREATE INDEX idx_application_status ON application_submissions(status);
CREATE INDEX idx_application_created ON application_submissions(created_at DESC);

-- Insert your admin user (password will be hashed in the application)
-- Password: password
-- This is a placeholder - we'll handle hashing in the backend
INSERT INTO users (email, password_hash) 
VALUES ('myemail@hotmail.co.le', '$2b$10$placeholder')
ON CONFLICT (email) DO NOTHING;

