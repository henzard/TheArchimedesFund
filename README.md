# The Archimedes Fund

A modern, full-stack web application for The Archimedes Fund - an educational initiative focused on financial mastery and technical excellence.

## 🎯 Overview

The Archimedes Fund provides educational pathways for men seeking to maximize their potential through:
- **The Lever (Technology)**: Hard technical skills in coding, AI, and engineering
- **The Fulcrum (Capital)**: Deep financial literacy and wealth-building strategies
- **The Force (Discipline)**: Mindset, responsibility, and leadership development

## 📁 Project Structure

```
TheArchimedesFund/
├── docs/                          # 📚 All documentation
│   ├── deployment/               # Deployment guides
│   ├── features/                 # Feature documentation
│   ├── development/              # Development guides
│   └── architecture/             # Architecture docs
├── assets/                        # 🎨 Project-level assets
│   └── images/                   # Brand images & mockups
├── archimedes-fund-app/          # ⚛️ Frontend React application
│   ├── src/                      # Source code
│   ├── public/                   # Static assets
│   └── dist/                     # Build output
├── netlify/                      # ☁️ Backend serverless functions
│   └── functions/                # API endpoints
├── database_schema.sql           # 🗄️ PostgreSQL schema
├── package.json                  # 📦 Dependencies
├── netlify.toml                  # ⚙️ Deployment config
└── README.md                     # 📖 This file
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/TheArchimedesFund.git
cd TheArchimedesFund

# Install dependencies
cd archimedes-fund-app
npm install

# Start development server
npm run dev
```

For detailed setup instructions, see **[Quick Start Guide](docs/development/quick-start.md)**.

## 🌟 Features

### User-Facing
- **Responsive Design**: Mobile-first, works on all devices
- **Content Management**: Books, Projects, Passions sections
- **Application System**: Apply to the program
- **Investment Inquiry**: Connect with potential investors
- **Therapist Chat**: AI-powered conversation feature
- **Contact Forms**: Multiple touchpoints for engagement

### Admin Dashboard
- **Content Management**: CRUD operations for all content types
- **Application Review**: Manage program applications
- **Search & Filters**: Advanced filtering on all sections
- **Pagination**: Handle large datasets efficiently
- **Analytics**: Track submissions and engagement

### Technical
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations
- **Netlify Functions**: Serverless backend
- **PostgreSQL (Neon)**: Managed database
- **Markdown Support**: Rich content authoring

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[📖 Documentation Index](docs/README.md)** - Start here!
- **[🚀 Deployment Guide](docs/deployment/netlify-deployment.md)** - Deploy to Netlify
- **[💻 Backend Setup](docs/development/backend-setup.md)** - Configure serverless functions
- **[✨ Features](docs/features/)** - Feature-specific documentation
- **[🏗️ Architecture](docs/architecture/)** - System design & refactoring plans

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **ReactMarkdown** - Markdown rendering
- **Vite** - Build tool

### Backend
- **Netlify Functions** - Serverless API
- **PostgreSQL** - Database (Neon)
- **Node.js** - Runtime

### Styling
- **CSS3** - Custom styling
- **Playfair Display** - Heading font
- **Inter** - Body font

## 🎨 Design System

- **Primary Color**: `#1e3a5f` (Navy Blue)
- **Secondary Color**: `#c9a961` (Gold)
- **Typography**: Playfair Display (headings), Inter (body)
- **Layout**: Mobile-first, responsive grid
- **Theme**: Dark blue/gold, professional & elegant

## 🚀 Deployment

### Prerequisites
1. Netlify account
2. Neon database account
3. GitHub repository

### Steps
1. Connect repository to Netlify
2. Set up environment variables
3. Configure Neon database
4. Deploy!

See **[Deployment Guide](docs/deployment/netlify-deployment.md)** for detailed instructions.

## 📝 Environment Variables

Create `.env` file in `archimedes-fund-app/`:

```env
VITE_API_URL=your-netlify-url
```

Netlify environment variables:
- `NETLIFY_DATABASE_URL` - Neon connection string
- `ADMIN_TOKEN` - Admin authentication token

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Project Status

- ✅ Core website (all pages)
- ✅ Admin dashboard with full CRUD
- ✅ Content management (Books, Projects, Passions)
- ✅ Application & contact systems
- ✅ Therapist chat feature
- ✅ Search, filters & pagination
- ✅ Responsive design
- ✅ Premium styling
- 🚧 Admin dashboard refactoring (in progress)
- 📅 Additional features (planned)

## 🤝 Contributing

1. Check **[Project Structure Rules](PROJECT_STRUCTURE_RULES.md)**
2. Follow the established patterns
3. Document new features
4. Test thoroughly
5. Submit PR

## 📜 License

All rights reserved - The Archimedes Fund

## 🆘 Support

- **Documentation**: Check `/docs` directory
- **Issues**: Create GitHub issue
- **Email**: support@thearchimedesfund.com

## 🎯 Key Messaging

**Tagline**: "Money. Tech. Mastery."

**Quote**: "Give me a place to stand, and I shall move the world." - Archimedes

**Mission**: To provide the "place to stand" for men seeking to maximize their potential through financial mastery and advanced technology.

**Vision**: To engineer a generation of men who possess the economic sovereignty and technical command necessary to build, sustain, and advance the modern world.

---

**The Archimedes Fund** - Engineering the future, one builder at a time.
