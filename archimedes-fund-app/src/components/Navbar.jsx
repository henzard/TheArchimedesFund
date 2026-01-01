import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import logo from '../assets/images/Gemini_Generated_Image_viq1aaviq1aaviq1.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Program', path: '/program' },
    { name: 'Books', path: '/books' },
    { name: 'Apply', path: '/apply' },
    { name: 'Invest', path: '/invest' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="The Archimedes Fund" />
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <Button variant="primary" size="small" onClick={() => window.location.href = '/apply'}>
              Apply Now
            </Button>
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="navbar-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="navbar-mobile-actions">
                <Button variant="primary" size="medium" fullWidth onClick={() => window.location.href = '/apply'}>
                  Apply Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

