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

-- Create books table (for reading library)
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255) NOT NULL,
  cover_image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  tags TEXT[], -- Array of tags like ['leadership', 'technical', 'philosophy']
  problems_solved TEXT[], -- Array of problems like ['team management', 'code quality']
  impact TEXT NOT NULL, -- The impact/review of the book
  key_takeaways TEXT, -- Bullet points or key lessons
  date_read DATE,
  goodreads_url TEXT,
  amazon_url TEXT,
  status VARCHAR(50) DEFAULT 'published', -- 'published', 'draft'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table (for GitHub projects showcase)
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL, -- URL-friendly identifier
  tagline VARCHAR(500), -- Short catchy tagline
  description TEXT NOT NULL, -- Full description/mini blog post
  github_url TEXT NOT NULL,
  demo_url TEXT, -- Live demo link
  image_url TEXT, -- Project screenshot/banner
  tech_stack TEXT[], -- Array of technologies like ['React', 'Node.js', 'PostgreSQL']
  tags TEXT[], -- Array of tags like ['web', 'mobile', 'api', 'tool']
  features TEXT[], -- Array of key features
  challenges TEXT, -- What challenges did you face?
  learnings TEXT, -- What did you learn?
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'archived', 'in-progress'
  visibility VARCHAR(50) DEFAULT 'published', -- 'published', 'draft'
  stars INTEGER DEFAULT 0, -- GitHub stars count
  date_completed DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX idx_investment_status ON investment_inquiries(status);
CREATE INDEX idx_investment_created ON investment_inquiries(created_at DESC);
CREATE INDEX idx_application_status ON application_submissions(status);
CREATE INDEX idx_application_created ON application_submissions(created_at DESC);
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_date_read ON books(date_read DESC);
CREATE INDEX idx_books_rating ON books(rating DESC);
CREATE INDEX idx_books_tags ON books USING GIN(tags);
CREATE INDEX idx_books_problems ON books USING GIN(problems_solved);
CREATE INDEX idx_projects_visibility ON projects(visibility);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_tech_stack ON projects USING GIN(tech_stack);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);
CREATE INDEX idx_projects_date_completed ON projects(date_completed DESC);

-- Insert your admin user (password will be hashed in the application)
-- Password: password
-- This is a placeholder - we'll handle hashing in the backend
INSERT INTO users (email, password_hash) 
VALUES ('myemail@hotmail.co.le', '$2b$10$placeholder')
ON CONFLICT (email) DO NOTHING;

