import { motion } from 'framer-motion';
import { Code, DollarSign, Brain, Calendar, CheckCircle, Users, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import './Program.css';

const Program = () => {
  const pillars = [
    {
      icon: <Code size={50} />,
      title: 'Technical Skills',
      description: 'Master modern development practices through real projects.',
      modules: [
        {
          name: 'Full-Stack Development',
          topics: ['React & Modern JavaScript', 'Node.js & APIs', 'Database Design'],
        },
        {
          name: 'Best Practices',
          topics: ['Clean Code Principles', 'Testing & Debugging', 'Git & Version Control'],
        },
        {
          name: 'Advanced Topics',
          topics: ['Cloud Deployment', 'API Integration', 'Performance Optimization'],
        },
      ],
    },
    {
      icon: <BookOpen size={50} />,
      title: 'Problem Solving',
      description: 'Learn to think critically about code and its impact.',
      modules: [
        {
          name: 'Software Architecture',
          topics: ['System Design', 'Design Patterns', 'Scalability Considerations'],
        },
        {
          name: 'Code Quality',
          topics: ['Readability & Maintainability', 'Documentation', 'Code Reviews'],
        },
        {
          name: 'Critical Thinking',
          topics: ['Requirements Analysis', 'Technical Decision Making', 'Trade-off Evaluation'],
        },
      ],
    },
    {
      icon: <Brain size={50} />,
      title: 'Professional Growth',
      description: 'Develop the mindset and habits of a successful developer.',
      modules: [
        {
          name: 'Career Development',
          topics: ['Portfolio Building', 'Technical Interviews', 'Networking'],
        },
        {
          name: 'Continuous Learning',
          topics: ['Learning Strategies', 'Staying Current', 'Finding Resources'],
        },
        {
          name: 'Communication',
          topics: ['Technical Writing', 'Explaining Concepts', 'Collaboration Skills'],
        },
      ],
    },
  ];

  const timeline = [
    {
      week: 'Month 1',
      phase: 'Foundation',
      focus: 'Getting Started',
      description: 'We start with the basics—understanding your current skill level, setting clear goals, and beginning work on your first real project together.',
      deliverables: ['Skills assessment', 'Learning roadmap', 'First project milestone', 'Code review sessions'],
    },
    {
      week: 'Months 2-3',
      phase: 'Development',
      focus: 'Building Skills',
      description: 'Dive deeper into full-stack development, best practices, and problem-solving. Work on increasingly complex features and learn through doing.',
      deliverables: ['Multiple projects completed', 'Portfolio development', 'Regular code reviews', 'Technical writing practice'],
    },
    {
      week: 'Months 4+',
      phase: 'Mastery',
      focus: 'Independence',
      description: 'Take on larger projects with less guidance. Focus on advanced topics, career development, and preparing for professional opportunities.',
      deliverables: ['Capstone project', 'Polished portfolio', 'Interview preparation', 'Continued mentorship'],
    },
  ];

  const benefits = [
    { icon: <CheckCircle />, text: 'Flexible scheduling to fit your life' },
    { icon: <Users />, text: '1-on-1 personalized mentorship' },
    { icon: <Trophy />, text: 'Work on real, portfolio-worthy projects' },
    { icon: <BookOpen />, text: 'Access to curated learning resources' },
    { icon: <Users />, text: 'Code reviews and feedback' },
    { icon: <Calendar />, text: 'Ongoing support even after completion' },
  ];

  const faqs = [
    {
      question: 'Do I need prior programming experience?',
      answer: 'Some basic programming knowledge is helpful, but not strictly required. The apprenticeship is tailored to your current skill level. Whether you\'re a beginner looking to solidify fundamentals or an intermediate developer wanting to level up, we can work together.',
    },
    {
      question: 'How much does it cost?',
      answer: 'Pricing varies based on the length and intensity of the apprenticeship. I offer flexible options including hourly rates, monthly packages, and project-based arrangements. Contact me to discuss what works for your situation and budget.',
    },
    {
      question: 'What will I build during the apprenticeship?',
      answer: 'You\'ll work on real projects—either your own ideas, contributions to open source, or practical applications I provide. Projects range from full-stack web apps to automation tools, always focused on building your portfolio and practical skills.',
    },
    {
      question: 'Is this remote or in-person?',
      answer: 'Apprenticeships are primarily remote, conducted via video calls, screen sharing, and collaborative coding sessions. This allows flexibility and makes the program accessible regardless of location.',
    },
    {
      question: 'What is the time commitment?',
      answer: 'It\'s flexible! Some apprentices work with me for a few hours per week, others dedicate more time. We\'ll establish a schedule that works for both of us, typically starting with 4-8 hours per week for regular mentorship sessions and project work.',
    },
    {
      question: 'What happens after the apprenticeship ends?',
      answer: 'You\'ll have a solid portfolio, improved skills, and a clearer career direction. I also provide ongoing support—you can reach out with questions, get feedback on future projects, or just stay connected as you grow in your career.',
    },
  ];

  return (
    <div className="program-page">
      {/* Hero */}
      <section className="program-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Apprenticeships</h1>
            <p className="program-lead">
              Hands-on mentorship for developers who want to level up their skills through 
              real projects, code reviews, and practical guidance.
            </p>
            <div className="program-stats">
              <div className="stat"><strong>1-on-1</strong> Mentorship</div>
              <div className="stat"><strong>Real</strong> Projects</div>
              <div className="stat"><strong>Flexible</strong> Schedule</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="program-overview section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">How It Works</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              My apprenticeship program is built on three core areas—each designed to make 
              you a more capable, thoughtful developer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars Detailed */}
      <section className="pillars-detailed section">
        <div className="container">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="pillar-section"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="pillar-header">
                <div className="pillar-icon-large">{pillar.icon}</div>
                <div>
                  <h2>{pillar.title}</h2>
                  <p className="pillar-tagline">{pillar.description}</p>
                </div>
              </div>

              <div className="modules-grid">
                {pillar.modules.map((module, idx) => (
                  <Card key={idx} padding="large" className="module-card">
                    <h3>{module.name}</h3>
                    <ul>
                      {module.topics.map((topic, topicIdx) => (
                        <li key={topicIdx}>{topic}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="program-timeline section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Your Journey</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="timeline-grid">
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card padding="large" className="timeline-card">
                  <div className="phase-number">{index + 1}</div>
                  <h4 className="phase-week">{phase.week}</h4>
                  <h3 className="phase-title">{phase.phase}</h3>
                  <p className="phase-focus">{phase.focus}</p>
                  <p className="phase-description">{phase.description}</p>
                  <div className="deliverables">
                    <strong>Key Deliverables:</strong>
                    <ul>
                      {phase.deliverables.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">What You Get</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <p>{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card padding="large" className="faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="program-cta section">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Learning?</h2>
            <p>Apply for an apprenticeship and let's build something great together.</p>
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

export default Program;
