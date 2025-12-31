import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, DollarSign, Briefcase, Heart, Mail } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import investorImage from '../assets/images/Gemini_Generated_Image_vp4rzcvp4rzcvp4r.png';
import './Invest.css';

const Invest = () => {
  const whyInvest = [
    {
      icon: <Target size={40} />,
      title: 'Open Source Projects',
      description: 'Support the development of tools and libraries that help developers build better software, freely available to everyone.',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Knowledge Sharing',
      description: 'Help create educational content, tutorials, and documentation that make programming more accessible to learners.',
    },
    {
      icon: <Users size={40} />,
      title: 'Apprenticeships',
      description: 'Enable me to offer more affordable (or free) apprenticeships to talented developers who might not otherwise have access to mentorship.',
    },
  ];

  const investmentTiers = [
    {
      name: 'Supporter',
      amount: '$50 - $249/month',
      benefits: [
        'Recognition on the website',
        'Early access to new projects',
        'Monthly progress updates',
        'Direct email support',
      ],
    },
    {
      name: 'Contributor',
      amount: '$250 - $999/month',
      benefits: [
        'All Supporter benefits',
        'Influence on project priorities',
        'Access to premium content',
        'Quarterly video calls',
        'Priority apprenticeship consideration',
      ],
      featured: true,
    },
    {
      name: 'Partner',
      amount: '$1,000+/month',
      benefits: [
        'All Contributor benefits',
        'Collaboration on specific projects',
        'Consulting hours included',
        'Co-creation opportunities',
        'Direct ongoing mentorship',
        'Strategic partnership discussions',
      ],
    },
  ];

  const impact = [
    { number: '50+', label: 'Projects Built' },
    { number: '1000+', label: 'Books Read' },
    { number: '10+', label: 'Apprentices Mentored' },
    { number: '∞', label: 'Ideas Explored' },
  ];

  const useOfFunds = [
    {
      category: 'Open Source Development',
      percentage: 40,
      description: 'Building and maintaining open-source projects, tools, and libraries.',
    },
    {
      category: 'Apprenticeship Program',
      percentage: 30,
      description: 'Subsidizing apprenticeships, creating learning materials, and mentorship time.',
    },
    {
      category: 'Learning & Research',
      percentage: 20,
      description: 'Books, courses, conferences, and exploring new technologies.',
    },
    {
      category: 'Infrastructure & Operations',
      percentage: 10,
      description: 'Hosting, tools, software licenses, and platform maintenance.',
    },
  ];

  return (
    <div className="invest-page">
      {/* Hero */}
      <section className="invest-hero">
        <div className="container">
          <div className="hero-content-grid">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Support My Work</h1>
              <p className="hero-lead">
                Help fund my ongoing projects, learning, and apprenticeship program through 
                direct support or collaboration opportunities.
              </p>
              <p>
                Your support allows me to dedicate more time to building open-source projects, 
                creating educational content, offering affordable apprenticeships, and exploring 
                new technologies that benefit the broader developer community.
              </p>
              <div className="hero-cta">
                <a href="#contact">
                  <Button variant="primary" size="large">
                    <Mail size={20} /> Get In Touch
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-image"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={investorImage} alt="Invest in the Future" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="why-invest section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Support This Work?</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="why-invest-grid">
            {whyInvest.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card padding="large" className="why-card">
                  <div className="why-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-stats section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">What I'm Working On</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="stats-grid">
            {impact.map((stat, index) => (
              <motion.div
                key={index}
                className="impact-stat"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="investment-tiers section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Support Options</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Choose a support level that works for you—every contribution helps me dedicate 
              more time to building, learning, and teaching.
            </p>
          </motion.div>

          <div className="tiers-grid">
            {investmentTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card 
                  padding="large" 
                  className={`tier-card ${tier.featured ? 'tier-featured' : ''}`}
                >
                  {tier.featured && <div className="featured-badge">Most Popular</div>}
                  <h3>{tier.name}</h3>
                  <div className="tier-amount">{tier.amount}</div>
                  <ul className="tier-benefits">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="use-of-funds section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">How Support is Used</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="funds-list">
            {useOfFunds.map((fund, index) => (
              <motion.div
                key={index}
                className="fund-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="fund-header">
                  <h3>{fund.category}</h3>
                  <div className="fund-percentage">{fund.percentage}%</div>
                </div>
                <div className="fund-bar">
                  <motion.div
                    className="fund-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${fund.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p>{fund.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="invest-contact section">
        <div className="container">
          <motion.div
            className="contact-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Briefcase size={60} />
            <h2>Want to Support or Collaborate?</h2>
            <p>
              Whether you'd like to become a regular supporter, sponsor a specific project, 
              or explore collaboration opportunities, I'd love to hear from you.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:henzardkruger@gmail.com">henzardkruger@gmail.com</a>
                </div>
              </div>
            </div>
            <Button variant="primary" size="large">
              Schedule a Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Invest;
