# Webhook API Documentation

## 🎯 Purpose
Remote API endpoints for creating books, projects, and passions via authenticated webhooks.

## 🔐 Authentication
All webhooks require admin credentials (username/password) in the request body.

## 📍 Endpoints

### 1. Create Book
**POST** `/.netlify/functions/webhook-create-book`

Creates a new book entry in the library.

#### Request Body
```json
{
  "username": "admin@example.com",
  "password": "your-admin-password",
  "book": {
    "title": "The Phoenix Project",
    "author": "Gene Kim",
    "cover_image_url": "https://example.com/cover.jpg",
    "rating": 5,
    "tags": ["devops", "leadership", "technical"],
    "problems_solved": ["team management", "workflow optimization"],
    "impact": "Transformed how I think about DevOps and team collaboration...",
    "key_takeaways": "1. Theory of Constraints\n2. Three Ways of DevOps",
    "date_read": "2024-01-15",
    "goodreads_url": "https://goodreads.com/...",
    "amazon_url": "https://amazon.com/...",
    "status": "published"
  }
}
```

#### Required Fields
- `username` (string) - Admin email
- `password` (string) - Admin password
- `book.title` (string) - Book title
- `book.author` (string) - Book author
- `book.impact` (string) - Impact/review text

#### Optional Fields
- `book.cover_image_url` (string)
- `book.rating` (number, 1-5, default: 5)
- `book.tags` (array of strings)
- `book.problems_solved` (array of strings)
- `book.key_takeaways` (string)
- `book.date_read` (date string, YYYY-MM-DD)
- `book.goodreads_url` (string)
- `book.amazon_url` (string)
- `book.status` (string: "draft" | "published", default: "draft")

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "Book created successfully",
  "book": {
    "id": 1,
    "title": "The Phoenix Project",
    "author": "Gene Kim",
    ...
  }
}
```

#### Response (Error - 401)
```json
{
  "error": "Invalid credentials"
}
```

---

### 2. Create Project
**POST** `/.netlify/functions/webhook-create-project`

Creates a new GitHub project showcase entry.

#### Request Body
```json
{
  "username": "admin@example.com",
  "password": "your-admin-password",
  "project": {
    "title": "AI Code Assistant",
    "slug": "ai-code-assistant",
    "tagline": "Your intelligent coding companion",
    "description": "A comprehensive AI-powered code assistant that helps developers write better code faster...",
    "github_url": "https://github.com/username/ai-code-assistant",
    "demo_url": "https://demo.example.com",
    "image_url": "https://example.com/project-screenshot.png",
    "tech_stack": ["React", "Node.js", "OpenAI", "PostgreSQL"],
    "tags": ["ai", "productivity", "developer-tools"],
    "features": ["Code completion", "Bug detection", "Documentation generation"],
    "challenges": "Integrating with multiple IDEs was complex...",
    "learnings": "Learned about LLM fine-tuning and prompt engineering...",
    "status": "active",
    "visibility": "published",
    "stars": 250,
    "date_completed": "2024-01-20"
  }
}
```

#### Required Fields
- `username` (string) - Admin email
- `password` (string) - Admin password
- `project.title` (string) - Project title
- `project.slug` (string) - URL-friendly slug
- `project.description` (string) - Project description
- `project.github_url` (string) - GitHub repository URL

#### Optional Fields
- `project.tagline` (string)
- `project.demo_url` (string)
- `project.image_url` (string)
- `project.tech_stack` (array of strings)
- `project.tags` (array of strings)
- `project.features` (array of strings)
- `project.challenges` (string)
- `project.learnings` (string)
- `project.status` (string: "active" | "in-progress" | "archived", default: "active")
- `project.visibility` (string: "draft" | "published", default: "draft")
- `project.stars` (number, default: 0)
- `project.date_completed` (date string, YYYY-MM-DD)

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "Project created successfully",
  "project": {
    "id": 1,
    "title": "AI Code Assistant",
    "slug": "ai-code-assistant",
    ...
  }
}
```

---

### 3. Create Passion
**POST** `/.netlify/functions/webhook-create-passion`

Creates a new passion/guide article with markdown content.

#### Request Body
```json
{
  "username": "admin@example.com",
  "password": "your-admin-password",
  "passion": {
    "title": "How to Use AI Effectively",
    "slug": "how-to-use-ai-effectively",
    "subtitle": "A practical guide to leveraging AI in your daily workflow",
    "category": "AI & Productivity",
    "icon_emoji": "🤖",
    "markdown_content": "# Introduction\n\nAI tools have transformed...\n\n## Getting Started\n\n1. Choose the right tool\n2. Learn prompt engineering...",
    "excerpt": "Learn practical strategies for integrating AI into your workflow",
    "cover_image_url": "https://example.com/ai-guide.jpg",
    "tags": ["ai", "productivity", "automation"],
    "reading_time": 8,
    "status": "published",
    "date_published": "2024-01-25"
  }
}
```

#### Required Fields
- `username` (string) - Admin email
- `password` (string) - Admin password
- `passion.title` (string) - Passion title
- `passion.slug` (string) - URL-friendly slug
- `passion.markdown_content` (string) - Full content in markdown

#### Optional Fields
- `passion.subtitle` (string)
- `passion.category` (string)
- `passion.icon_emoji` (string - single emoji)
- `passion.excerpt` (string - short summary)
- `passion.cover_image_url` (string)
- `passion.tags` (array of strings)
- `passion.reading_time` (number in minutes, default: 5)
- `passion.status` (string: "draft" | "published", default: "draft")
- `passion.date_published` (date string, YYYY-MM-DD)

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "Passion created successfully",
  "passion": {
    "id": 1,
    "title": "How to Use AI Effectively",
    "slug": "how-to-use-ai-effectively",
    ...
  }
}
```

---

## 🔧 Usage Examples

### Using cURL

```bash
# Create a Book
curl -X POST https://thearchimedesfund.netlify.app/.netlify/functions/webhook-create-book \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@example.com",
    "password": "your-password",
    "book": {
      "title": "Atomic Habits",
      "author": "James Clear",
      "rating": 5,
      "tags": ["habits", "productivity", "self-improvement"],
      "impact": "Changed how I think about building habits...",
      "status": "published"
    }
  }'

# Create a Project
curl -X POST https://thearchimedesfund.netlify.app/.netlify/functions/webhook-create-project \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@example.com",
    "password": "your-password",
    "project": {
      "title": "Portfolio Website",
      "slug": "portfolio-website",
      "description": "My personal portfolio built with React and Vite",
      "github_url": "https://github.com/username/portfolio",
      "tech_stack": ["React", "Vite", "Tailwind CSS"],
      "visibility": "published"
    }
  }'

# Create a Passion
curl -X POST https://thearchimedesfund.netlify.app/.netlify/functions/webhook-create-passion \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@example.com",
    "password": "your-password",
    "passion": {
      "title": "Getting Started with Docker",
      "slug": "getting-started-with-docker",
      "markdown_content": "# Docker Basics\n\nDocker is a platform...",
      "tags": ["docker", "devops", "containers"],
      "reading_time": 10,
      "status": "published"
    }
  }'
```

### Using JavaScript/Fetch

```javascript
async function createBook(username, password, bookData) {
  const response = await fetch('https://thearchimedesfund.netlify.app/.netlify/functions/webhook-create-book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      book: bookData
    })
  });

  const result = await response.json();
  return result;
}

// Example usage
const book = await createBook(
  'admin@example.com',
  'your-password',
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    rating: 5,
    impact: 'Helped me focus better and be more productive...',
    status: 'published'
  }
);
```

### Using Python

```python
import requests
import json

def create_project(username, password, project_data):
    url = 'https://thearchimedesfund.netlify.app/.netlify/functions/webhook-create-project'
    
    payload = {
        'username': username,
        'password': password,
        'project': project_data
    }
    
    response = requests.post(url, json=payload)
    return response.json()

# Example usage
project = create_project(
    'admin@example.com',
    'your-password',
    {
        'title': 'Task Manager App',
        'slug': 'task-manager-app',
        'description': 'A modern task management application',
        'github_url': 'https://github.com/username/task-manager',
        'tech_stack': ['React', 'Firebase', 'Material-UI'],
        'visibility': 'published'
    }
)
```

---

## 🛡️ Security

### Authentication
- All requests must include valid admin credentials
- Password is compared using bcrypt
- Invalid credentials return 401 Unauthorized

### Best Practices
1. **Never commit credentials**: Use environment variables
2. **Use HTTPS**: All requests should be over HTTPS
3. **Rotate passwords**: Change admin password regularly
4. **Rate limiting**: Consider implementing rate limiting for production
5. **IP whitelisting**: Optionally restrict access to specific IPs

### Environment Variables Required
```bash
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=$2a$10$hashedPasswordHere
JWT_SECRET=your-jwt-secret
NETLIFY_DATABASE_URL=your-database-url
```

---

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 201  | Created - Resource successfully created |
| 400  | Bad Request - Missing or invalid fields |
| 401  | Unauthorized - Invalid credentials |
| 405  | Method Not Allowed - Only POST is accepted |
| 500  | Server Error - Database or processing error |

---

## 🧪 Testing

### Test Endpoint Availability
```bash
curl -X POST https://thearchimedesfund.netlify.app/.netlify/functions/webhook-create-book \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test","book":{"title":"test"}}'
```

Expected response: `401 Unauthorized` or `400 Bad Request` (confirms endpoint is working)

---

## 📝 Notes

- **Timestamps**: `created_at` and `updated_at` are automatically managed by the database
- **Slug uniqueness**: Ensure project/passion slugs are unique (database has unique constraint)
- **Arrays**: Use proper JSON arrays for `tags`, `tech_stack`, `features`, etc.
- **Markdown**: Passion content supports full markdown syntax including code blocks
- **Status values**: Use exact strings ("draft", "published", "active", etc.)

---

## 🔗 Related Documentation

- [Admin Dashboard User Guide](./admin-dashboard.md)
- [Database Schema](../../database_schema.sql)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)

---

**Last Updated**: January 6, 2026  
**API Version**: 1.0.0  
**Base URL**: https://thearchimedesfund.netlify.app/.netlify/functions/
