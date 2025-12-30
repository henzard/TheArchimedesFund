import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import heroImage from '../assets/images/Gemini_Generated_Image_1i8pxi1i8pxi1i8p.png';
import './Home.css';

const Home = () => {
  const stats = [
    { number: '12', label: 'Week Intensive Program' },
    { number: '100%', label: 'Placement Rate' },
    { number: '3', label: 'Core Pillars' },
    { number: '∞', label: 'Potential Unlocked' },
  ];

  const pillars = [
    {
      icon: <Zap size={40} />,
      title: 'The Lever',
      subtitle: 'Technology',
      description: 'Hard technical skills that multiply your force in the digital economy.',
      points: ['Python, JavaScript, Rust', 'Data Science & AI', 'Cybersecurity'],
    },
    {
      icon: <Target size={40} />,
      title: 'The Fulcrum',
      subtitle: 'Capital',
      description: 'Deep financial literacy providing the foundation for growth.',
      points: ['Personal Finance', 'Investment Strategies', 'Wealth Building'],
      featured: true,
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'The Force',
      subtitle: 'Discipline',
      description: 'The mindset and drive to apply your skills effectively.',
      points: ['Stoic Philosophy', 'Goal Execution', 'Leadership'],
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
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
              Engineering a generation of men who possess the economic sovereignty
              and technical command necessary to build, sustain, and advance the modern world.
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
            <h2 className="section-title">Our Mission</h2>
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
                To provide the "place to stand" for men seeking to maximize their potential.
              </p>
              <p>
                We achieve this by deploying high-impact capital into educational pathways
                focused on financial mastery and advanced technology—turning raw human
                capability into compounded value.
              </p>
            </motion.div>

            <motion.div
              className="mission-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src={heroImage} alt="The Archimedes Fund" />
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
            <p className="section-subtitle">The Physics of The Fund</p>
            <div className="section-divider"></div>
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
            <h2>Ready to Begin?</h2>
            <p>Apply now to join the next cohort and unlock your full potential.</p>
            <div className="cta-features">
              <div className="cta-feature">
                <span>💼</span>
                <p>Money</p>
              </div>
              <div className="cta-feature">
                <span>💻</span>
                <p>Tech</p>
              </div>
              <div className="cta-feature">
                <span>🎯</span>
                <p>Mastery</p>
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

