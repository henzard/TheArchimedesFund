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
      title: 'Mission-Driven Impact',
      description: 'Invest in a fund that transforms lives by providing economic opportunity and technical skills to the next generation.',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Proven Model',
      description: '100% job placement rate, average starting salary of $65,000+, and strong return on investment for our students and backers.',
    },
    {
      icon: <Users size={40} />,
      title: 'Building the Future',
      description: 'Help create a network of financially literate, technically skilled men who will build companies, solve problems, and advance civilization.',
    },
  ];

  const investmentTiers = [
    {
      name: 'Supporter',
      amount: '$5,000 - $24,999',
      benefits: [
        'Recognition on our website',
        'Quarterly impact reports',
        'Invitation to annual showcase',
        'Access to alumni network events',
      ],
    },
    {
      name: 'Partner',
      amount: '$25,000 - $99,999',
      benefits: [
        'All Supporter benefits',
        'Named scholarship opportunity',
        'Quarterly meetings with leadership',
        'Early access to hiring pipeline',
        'Advisory board consideration',
      ],
      featured: true,
    },
    {
      name: 'Founder',
      amount: '$100,000+',
      benefits: [
        'All Partner benefits',
        'Seat on advisory board',
        'Named cohort sponsorship',
        'Strategic partnership opportunities',
        'Direct mentorship involvement',
        'Co-branding opportunities',
      ],
    },
  ];

  const impact = [
    { number: '100+', label: 'Lives Transformed' },
    { number: '$6.5M+', label: 'Annual Earning Power Created' },
    { number: '95%', label: 'Student Satisfaction' },
    { number: '50+', label: 'Hiring Partners' },
  ];

  const useOfFunds = [
    {
      category: 'Scholarships & Financial Aid',
      percentage: 50,
      description: 'Direct student support including tuition, materials, and living stipends.',
    },
    {
      category: 'Curriculum & Instruction',
      percentage: 25,
      description: 'Expert instructors, course development, and learning resources.',
    },
    {
      category: 'Career Services & Placement',
      percentage: 15,
      description: 'Job placement support, employer partnerships, and career coaching.',
    },
    {
      category: 'Operations & Growth',
      percentage: 10,
      description: 'Administrative costs, marketing, and program expansion.',
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
              <h1>Invest in the Builders</h1>
              <p className="hero-lead">
                Partner with us to empower the next generation of financially literate, 
                technically skilled men who will build the future.
              </p>
              <p>
                Your investment creates opportunities for men to develop the skills, capital 
                knowledge, and discipline needed to transform their lives and contribute to society.
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
            <h2 className="section-title">Why Invest in The Archimedes Fund?</h2>
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
            <h2 className="section-title">Our Impact</h2>
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
            <h2 className="section-title">Investment Opportunities</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Choose the level of investment that aligns with your goals and capacity to make an impact.
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
            <h2 className="section-title">How Your Investment is Used</h2>
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
            <h2>Ready to Make an Impact?</h2>
            <p>
              Let's discuss how your investment can transform lives and build the future. 
              Contact us today to learn more about partnership opportunities.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:invest@archimedesfund.org">invest@archimedesfund.org</a>
                </div>
              </div>
            </div>
            <Button variant="primary" size="large">
              Schedule a Meeting
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Invest;
