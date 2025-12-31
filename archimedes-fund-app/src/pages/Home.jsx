import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import fulcrumImage from '../assets/images/Gemini_Generated_Image_ibwplbibwplbibwp.png';
import logo from '../assets/images/Gemini_Generated_Image_viq1aaviq1aaviq1.png';
import './Home.css';

const Home = () => {
  const stats = [
    { number: '1000+', label: 'Books Read' },
    { number: '50+', label: 'Projects Built' },
    { number: '3', label: 'Core Passions' },
    { number: '∞', label: 'Ideas Explored' },
  ];

  const pillars = [
    {
      icon: <Zap size={40} />,
      title: 'The Lever',
      subtitle: 'Code',
      description: 'Building software with C#, JavaScript, Angular, and Laravel.',
      points: ['C# & .NET', 'JavaScript & Angular', 'Laravel & PHP'],
    },
    {
      icon: <Target size={40} />,
      title: 'The Fulcrum',
      subtitle: 'Books',
      description: 'Continuous learning through reading across multiple disciplines.',
      points: ['Philosophy & Stoicism', 'Technology & Science', 'Biography & History'],
      featured: true,
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'The Force',
      subtitle: 'Teaching',
      description: 'Mentoring developers through hands-on apprenticeships.',
      points: ['1-on-1 Mentorship', 'Real Project Experience', 'Career Guidance'],
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <img src={fulcrumImage} alt="The Modern Fulcrum - Leverage for Innovation" className="hero-bg-image" />
        </motion.div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">A Place To Stand.</h1>
            <p className="hero-subtitle">
              Give me a place to stand, and I shall move the world.
            </p>
            <p className="hero-description">
              Software developer from Bloemfontein, South Africa. Working at Picahoo, building with 
              C#/.NET and JavaScript/Angular, and mentoring the next generation of developers.
            </p>
            <div className="hero-cta">
              <Link to="/apply">
                <Button variant="primary" size="large">
                  Start Your Journey <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="large">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">My Mission</h2>
            <div className="section-divider"></div>
          </motion.div>
          
          <div className="mission-content">
            <motion.div
              className="mission-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="lead-text">
                Building great software, continuously learning, and sharing knowledge with the next generation.
              </p>
              <p>
                Based in Bloemfontein, South Africa, I work at Picahoo building solutions with C#/.NET, 
                JavaScript/Angular, and Laravel/PHP. From XeroAPI integrations to full-stack applications, 
                I love solving complex problems with elegant code. The Archimedes Fund is my platform for 
                mentoring aspiring developers through hands-on apprenticeships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="pillars section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">The Three Pillars</h2>
            <p className="section-subtitle">Code, Books, and Teaching</p>
            <motion.div 
              className="logo-divider"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img src={logo} alt="The Archimedes Fund" />
            </motion.div>
          </motion.div>

          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`pillar-card ${pillar.featured ? 'pillar-featured' : 'pillar-dark'}`}
                  padding="large"
                >
                  <div className="pillar-icon">{pillar.icon}</div>
                  <h3>{pillar.title}</h3>
                  <h4>{pillar.subtitle}</h4>
                  <p>{pillar.description}</p>
                  <ul className="pillar-list">
                    {pillar.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Interested in Learning?</h2>
            <p>Apply for an apprenticeship or reach out to support my work.</p>
            <div className="cta-features">
              <div className="cta-feature">
                <span>📚</span>
                <p>Books</p>
              </div>
              <div className="cta-feature">
                <span>💻</span>
                <p>Code</p>
              </div>
              <div className="cta-feature">
                <span>🎯</span>
                <p>Teaching</p>
              </div>
            </div>
            <Link to="/apply">
              <Button variant="primary" size="large">
                Apply Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

