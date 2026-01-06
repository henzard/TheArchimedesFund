import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, DollarSign, Briefcase, Heart, Mail } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import visionImage from '../assets/images/Gemini_Generated_Image_xspd33xspd33xspd.png';
import './Invest.css';

const Invest = () => {
  const whyInvest = [
    {
      icon: <Target size={40} />,
      title: 'Open Source Projects',
      description: 'Support development of tools and libraries in the .NET, Angular, and Laravel ecosystems—freely available to the community.',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Knowledge Sharing',
      description: 'Help create tutorials, documentation, and training materials that make enterprise development more accessible to learners.',
    },
    {
      icon: <Users size={40} />,
      title: 'Apprenticeships',
      description: 'Enable me to offer more affordable mentorships to talented developers who might not otherwise have access to professional guidance.',
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
    { number: '43', label: 'GitHub Repositories' },
    { number: '1000+', label: 'Books Read' },
    { number: '10+', label: 'Developers Mentored' },
    { number: '∞', label: 'Ideas Explored' },
  ];

  const useOfFunds = [
    {
      category: 'Open Source & Projects',
      percentage: 40,
      description: 'Building and maintaining open-source projects, tools, and libraries for the developer community.',
    },
    {
      category: 'Apprenticeship Program',
      percentage: 30,
      description: 'Subsidizing apprenticeships, creating learning materials, and one-on-one mentorship time.',
    },
    {
      category: 'Learning & Professional Development',
      percentage: 20,
      description: 'Books, courses, conferences, certifications, and exploring emerging technologies.',
    },
    {
      category: 'Infrastructure & Tools',
      percentage: 10,
      description: 'Cloud hosting, development tools, software licenses, and platform maintenance.',
    },
  ];

  return (
    <div className="invest-page">
      {/* Hero */}
      <section className="invest-hero">
        <motion.div 
          className="vision-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 5.5 }}
        >
          <img src={visionImage} alt="The Future of Innovation" className="vision-bg-image" />
        </motion.div>
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
          >
            <h1>Support My Work</h1>
            <p className="hero-lead">
              Help fund ongoing development projects, mentorship programs, and open-source contributions 
              in the C#/.NET, Angular, and Laravel ecosystems.
            </p>
            <p>
              Your support allows me to dedicate more time to building quality software, creating 
              educational resources, offering affordable apprenticeships, and contributing to the 
              developer community through open-source projects and knowledge sharing.
            </p>
            <div className="hero-cta">
              <a href="#contact">
                <Button variant="primary" size="large">
                  <Mail size={20} /> Get In Touch
                </Button>
              </a>
            </div>
          </motion.div>
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
            <a href="mailto:henzardkruger@gmail.com?subject=Investment%20%26%20Collaboration%20Inquiry&body=Hi%20Henzard%2C%0A%0AI'm%20interested%20in%20supporting%20your%20work%20and%20would%20like%20to%20schedule%20a%20call.%20Here's%20some%20information%20about%20my%20interest%3A%0A%0A%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%0A%0A%F0%9F%91%A4%20NAME%20%2F%20COMPANY%3A%20%5BYour%20name%20or%20company%20name%5D%0A%0A%F0%9F%92%BC%20SUPPORT%20TIER%20OF%20INTEREST%3A%0A%E2%98%90%20Supporter%20(%24%2450-249%2Fmonth)%0A%E2%98%90%20Contributor%20(%24%24250-999%2Fmonth)%0A%E2%98%90%20Partner%20(%24%241%2C000%2B%2Fmonth)%0A%E2%98%90%20Custom%20arrangement%0A%0A%F0%9F%92%B0%20EXPECTED%20MONTHLY%20COMMITMENT%3A%20%24%5BAmount%5D%0A%0A%F0%9F%8E%AF%20PRIMARY%20AREAS%20OF%20INTEREST%20(check%20all%20that%20apply)%3A%0A%E2%98%90%20Open%20source%20project%20development%0A%E2%98%90%20Supporting%20apprenticeship%20programs%0A%E2%98%90%20Knowledge%20sharing%20%2F%20educational%20content%0A%E2%98%90%20Specific%20project%20collaboration%0A%E2%98%90%20General%20support%20of%20your%20work%0A%E2%98%90%20Other%3A%20%5Bplease%20specify%5D%0A%0A%F0%9F%92%A1%20SPECIFIC%20PROJECTS%20OR%20TECHNOLOGIES%20OF%20INTEREST%3A%0A%5Be.g.%2C%20.NET%20libraries%2C%20Angular%20tools%2C%20Laravel%20packages%2C%20budgeting%20apps%2C%20etc.%5D%0A%0A%F0%9F%A4%9D%20COLLABORATION%20IDEAS%20(if%20applicable)%3A%0A%5BAny%20specific%20projects%20or%20initiatives%20you'd%20like%20to%20explore%20together%5D%0A%0A%F0%9F%93%85%20PREFERRED%20CALL%20TIME%3A%0A%5BYour%20timezone%20and%20availability%20-%20e.g.%2C%20%22EST%20afternoons%22%20or%20%22Weekday%20mornings%20PST%22%5D%0A%0A%E2%9D%93%20QUESTIONS%20OR%20ADDITIONAL%20CONTEXT%3A%0A%5BAny%20questions%20or%20additional%20information%20you'd%20like%20to%20share%5D%0A%0A%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%E2%80%94%0A%0ALooking%20forward%20to%20connecting!%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D">
              <Button variant="primary" size="large">
                Schedule a Call
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Invest;
