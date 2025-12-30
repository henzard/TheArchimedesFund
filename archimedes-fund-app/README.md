# The Archimedes Fund - React Application

A modern React application for The Archimedes Fund, built with Vite, React Router, Framer Motion, and React Hook Form.

## 🚀 Features

### Core Technologies
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router v6** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful, consistent icons

### Application Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth page transitions and animations
- ✅ Form validation with real-time error messages
- ✅ Modern component architecture
- ✅ Accessible navigation with mobile menu
- ✅ SEO-friendly routing
- ✅ Production-ready build configuration

## 📁 Project Structure

```
archimedes-fund-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx       # Button component with variants
│   │   ├── Card.jsx         # Card container component
│   │   ├── Navbar.jsx       # Navigation header
│   │   └── Footer.jsx       # Site footer
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── About.jsx        # About page
│   │   ├── Program.jsx      # Program details
│   │   ├── Apply.jsx        # Application form
│   │   └── Invest.jsx       # Investor information
│   ├── assets/              # Static assets
│   │   └── images/          # Brand images
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # Global app styles
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles & CSS variables
├── public/                  # Static public assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Component Library

### Button Component
```jsx
<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`  
**Sizes:** `small`, `medium`, `large`

### Card Component
```jsx
<Card padding="large" hover={true}>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Padding:** `none`, `small`, `default`, `large`  
**Classes:** `card-dark`, `card-featured`

## 🛠️ Development

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
cd archimedes-fund-app
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 📝 Form Validation

The application uses Zod schemas for form validation. Example from Apply page:

```javascript
const applySchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  commitment: z.boolean().refine(val => val === true, 'You must commit'),
});
```

## 🎭 Animations

Framer Motion provides smooth animations:

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {content}
</motion.div>
```

## 🎨 Theming

CSS variables defined in `index.css`:

```css
:root {
  --primary-color: #1e3a5f;
  --secondary-color: #c9a961;
  --accent-color: #d4af37;
  --dark-bg: #0f1419;
  --light-bg: #f5f5f5;
}
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### Netlify
```bash
npm run build
# Drag and drop the `dist` folder to Netlify
```

### Vercel
```bash
npm i -g vercel
vercel
```

### Traditional Hosting
```bash
npm run build
# Upload contents of `dist` folder to your web server
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Vite Config (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Change for subdirectory deployment
})
```

## 📄 Environment Variables

Create `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.archimedesfund.org
VITE_CONTACT_EMAIL=info@archimedesfund.org
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check ESLint errors
npm run lint
# Type check (if using TypeScript)
npm run type-check
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Hook Form Documentation](https://react-hook-form.com/)

## 🎯 Next Steps

- [ ] Connect forms to backend API
- [ ] Add user authentication
- [ ] Implement applicant dashboard
- [ ] Add blog/news section
- [ ] Set up analytics
- [ ] Add email notifications
- [ ] Implement payment processing
- [ ] Create admin panel

## 📞 Support

For questions or issues, contact: info@archimedesfund.org

---

**The Archimedes Fund** - Engineering the future, one builder at a time.
