import { Link } from 'react-router-dom';
import logo from '../assets/images/Gemini_Generated_Image_viq1aaviq1aaviq1.png';
import './Footer.css';

const Footer = () => {
  const footerLinks = {
    program: [
      { name: 'About', path: '/about' },
      { name: 'The Pillars', path: '/program#pillars' },
      { name: 'Curriculum', path: '/program' },
      { name: 'Apply', path: '/apply' },
    ],
    investors: [
      { name: 'Investment Info', path: '/invest' },
      { name: 'Partner With Us', path: '/invest#partner' },
    ],
    connect: [
      { name: 'Contact', path: '/contact' },
    ],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={logo} alt="The Archimedes Fund" />
            <p className="footer-quote">
              "Give me a place to stand, and I shall move the world."
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Program</h4>
              <ul>
                {footerLinks.program.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Investors</h4>
              <ul>
                {footerLinks.investors.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <ul>
                {footerLinks.connect.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} The Archimedes Fund. All rights reserved.</p>
            <p className="footer-tagline">Code. Books. Teaching.</p>
          </div>
          <div className="footer-acknowledgment">
            <p>
              Built by Henzard Kruger—a developer who believes in continuous learning, 
              quality craftsmanship, and sharing knowledge freely.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

