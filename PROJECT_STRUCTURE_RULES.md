# Project Structure & Organization Rules

## 📁 Root Directory Structure

```
TheArchimedesFund/
├── docs/                          # 📚 All documentation
│   ├── deployment/               # Deployment guides
│   ├── features/                 # Feature documentation
│   ├── development/              # Development guides
│   └── architecture/             # Architecture docs
├── assets/                        # 🎨 Project-level assets
│   ├── images/                   # Marketing/branding images
│   └── mockups/                  # Design mockups
├── archimedes-fund-app/          # ⚛️ Frontend React app
├── netlify/                      # ☁️ Backend serverless functions
├── database_schema.sql           # 🗄️ Database schema
├── package.json                  # 📦 Root package.json
├── netlify.toml                  # ⚙️ Netlify config
├── README.md                     # 📖 Main project README
├── .gitignore                    # 🚫 Git ignore rules
└── .cursorignore                 # 🚫 Cursor ignore rules
```

## 🗂️ Documentation Organization

### `/docs/deployment/`
- `netlify-deployment.md` - Netlify deployment guide
- `github-pages.md` - GitHub Pages deployment
- `deployment-checklist.md` - Pre-deployment checklist

### `/docs/features/`
- `therapist-feature.md` - Therapist chat feature
- `admin-dashboard.md` - Admin dashboard usage
- `passions-system.md` - Passions content system

### `/docs/development/`
- `backend-setup.md` - Backend setup guide
- `quick-start.md` - Quick start guide
- `database-setup.md` - Database configuration

### `/docs/architecture/`
- `admin-refactoring.md` - Admin dashboard refactoring plan
- `tech-stack.md` - Technology stack overview
- `api-documentation.md` - API endpoints documentation

## 🎨 Assets Organization

### `/assets/images/`
- Brand images
- Marketing materials
- Screenshots for documentation

### `/assets/mockups/`
- Design mockups
- Wireframes

## 🚫 What Should NOT Be in Root

❌ Individual markdown files scattered around
❌ Random image files (Gemini_Generated_Image_*.png)
❌ Loose HTML/CSS/JS files (unless they're landing pages)
❌ Build artifacts
❌ Temporary files

## ✅ What SHOULD Be in Root

✅ Main README.md
✅ Configuration files (package.json, netlify.toml, .gitignore)
✅ Main folders (docs, assets, app folders)
✅ Critical files (database_schema.sql)

## 📝 File Naming Conventions

### Documentation Files
- Use kebab-case: `deployment-guide.md`
- Be descriptive: `backend-setup-guide.md` not `setup.md`
- Include version if needed: `api-v1-documentation.md`

### Image Files
- Use descriptive names: `hero-banner.png` not `image1.png`
- Include dimensions if relevant: `logo-512x512.png`
- Use prefixes for categories: `icon-user.svg`, `screenshot-dashboard.png`

## 🔄 Migration Rules

When adding new documentation:
1. Determine the category (deployment/features/development/architecture)
2. Place in appropriate `/docs/` subfolder
3. Update main README.md with link if it's important
4. Remove from root if moving existing file

When adding new images:
1. Determine if it's project-level or app-level
2. Project-level → `/assets/images/`
3. App-level → `/archimedes-fund-app/src/assets/images/`
4. Update references in documentation

## 🧹 Regular Cleanup Tasks

### Weekly
- [ ] Check root for new loose files
- [ ] Move documentation to appropriate folders
- [ ] Update README if structure changes

### Monthly
- [ ] Review documentation for outdated content
- [ ] Archive old deployment guides
- [ ] Consolidate duplicate information

### Before Each Release
- [ ] Verify all docs are up to date
- [ ] Remove temporary files
- [ ] Update main README
- [ ] Run structure audit

## 🛠️ Enforcement

### Pre-commit Hook (Future)
```bash
# Check for loose .md files in root (except README.md)
# Check for image files in root
# Suggest proper location
```

### CI/CD Check (Future)
```bash
# Fail build if structure violations found
# Generate structure report
```

## 📊 Current State Assessment

**Files to Move:**
- All `*_GUIDE.md` → `/docs/development/` or `/docs/deployment/`
- All `*_CHECKLIST.md` → `/docs/deployment/`
- All `Gemini_Generated_Image_*.png` → `/assets/images/` or delete if unused
- `website.md` → `/docs/` or delete if redundant
- Loose `index.html`, `script.js`, `styles.css` → Archive or move to landing page folder

**Files to Keep in Root:**
- `README.md`
- `package.json`
- `netlify.toml`
- `database_schema.sql` (or move to `/docs/architecture/`)
- `.gitignore`

## 🎯 Goals

1. **Clarity**: Anyone should understand project structure instantly
2. **Maintainability**: Easy to find and update documentation
3. **Scalability**: Structure supports project growth
4. **Professional**: Organized like production-grade projects
5. **Developer Experience**: Less clutter = better focus

## 📚 References

This structure follows best practices from:
- React/Next.js project conventions
- Monorepo patterns (docs separate from code)
- Open source project standards
- Professional software development practices
