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
      title: 'The Lever: Technology',
      description: 'The tool that multiplies force.',
      modules: [
        {
          name: 'Programming Fundamentals',
          topics: ['Python Basics', 'JavaScript & Web Dev', 'Data Structures & Algorithms'],
        },
        {
          name: 'Advanced Development',
          topics: ['Full-Stack Development', 'API Design & Integration', 'Database Management'],
        },
        {
          name: 'Emerging Technologies',
          topics: ['AI & Machine Learning Basics', 'Cloud Computing (AWS/Azure)', 'Cybersecurity Essentials'],
        },
      ],
    },
    {
      icon: <DollarSign size={50} />,
      title: 'The Fulcrum: Capital',
      description: 'The stability that allows the lever to work.',
      modules: [
        {
          name: 'Personal Finance',
          topics: ['Budgeting & Cash Flow', 'Credit & Debt Management', 'Emergency Funds & Savings'],
        },
        {
          name: 'Investment Strategies',
          topics: ['Stock Market Fundamentals', 'Real Estate Investing', 'Retirement Accounts (401k/IRA)'],
        },
        {
          name: 'Wealth Building',
          topics: ['Entrepreneurship Basics', 'Tax Optimization', 'Asset Allocation'],
        },
      ],
    },
    {
      icon: <Brain size={50} />,
      title: 'The Force: Discipline',
      description: 'The energy applied to move the weight.',
      modules: [
        {
          name: 'Mindset & Philosophy',
          topics: ['Stoic Principles', 'Growth Mindset', 'Responsibility & Ownership'],
        },
        {
          name: 'Goal Setting & Execution',
          topics: ['SMART Goals', 'Time Management', 'Habit Formation'],
        },
        {
          name: 'Leadership Development',
          topics: ['Communication Skills', 'Team Collaboration', 'Decision Making'],
        },
      ],
    },
  ];

  const timeline = [
    {
      week: 'Weeks 1-4',
      phase: 'Foundation',
      focus: 'Building Your Base',
      description: 'Master the fundamentals of personal finance and programming. Learn budgeting, credit management, Python basics, and web development fundamentals.',
      deliverables: ['Personal budget created', 'First Python program', 'Financial health assessment', 'Goal-setting framework'],
    },
    {
      week: 'Weeks 5-8',
      phase: 'Acceleration',
      focus: 'Deep Dive',
      description: 'Advanced development skills and investment strategies. Build full applications, understand stock markets, and develop your investment thesis.',
      deliverables: ['Full-stack web app', 'Investment portfolio plan', 'Technical blog posts', 'Mock interviews'],
    },
    {
      week: 'Weeks 9-12',
      phase: 'Mastery',
      focus: 'Launch & Execute',
      description: 'Complete capstone projects, optimize your finances, and secure job placement. Demonstrate mastery across all three pillars.',
      deliverables: ['Capstone project', 'Job offers secured', 'Wealth-building plan', 'Alumni network integration'],
    },
  ];

  const benefits = [
    { icon: <CheckCircle />, text: 'Full scholarship opportunities available' },
    { icon: <Users />, text: 'Mentorship from industry leaders' },
    { icon: <Trophy />, text: 'Guaranteed job placement support' },
    { icon: <BookOpen />, text: 'Lifetime access to course materials' },
    { icon: <Users />, text: 'Exclusive alumni network' },
    { icon: <Calendar />, text: 'Flexible schedule options' },
  ];

  const faqs = [
    {
      question: 'Do I need prior programming experience?',
      answer: 'No! We welcome students of all levels. Our curriculum is designed to take you from beginner to job-ready in 12 weeks, regardless of your starting point.',
    },
    {
      question: 'How much does the program cost?',
      answer: 'We offer multiple payment options including scholarships, income share agreements (ISA), and upfront payment. Scholarships are awarded based on merit and need. Contact us to discuss your options.',
    },
    {
      question: 'What kind of jobs can I get after graduation?',
      answer: 'Our graduates secure roles as software developers, data analysts, financial analysts, and entrepreneurs. The average starting salary is $65,000+, with many earning significantly more.',
    },
    {
      question: 'Is this program online or in-person?',
      answer: 'We offer both hybrid and fully online options. Our in-person cohorts are held at our main campus, while online students receive the same curriculum and support remotely.',
    },
    {
      question: 'What is the time commitment?',
      answer: 'The program is intensive, requiring 40-60 hours per week. This includes live lectures, project work, mentorship sessions, and self-study. You should be prepared to commit fully for 12 weeks.',
    },
    {
      question: 'What happens after I graduate?',
      answer: 'You gain lifetime access to our alumni network, continued career support, advanced learning resources, and opportunities to give back as a mentor to future cohorts.',
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
            <h1>The 12-Week Program</h1>
            <p className="program-lead">
              An intensive bootcamp designed to transform you into a financially literate, 
              technically skilled builder ready to make an impact.
            </p>
            <div className="program-stats">
              <div className="stat"><strong>12</strong> Weeks</div>
              <div className="stat"><strong>3</strong> Pillars</div>
              <div className="stat"><strong>100%</strong> Placement</div>
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
            <h2 className="section-title">Program Overview</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Our curriculum is built on three pillars that work together to create 
              leverage—the ability to multiply your impact and move the world.
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
            <h2>Ready to Transform Your Life?</h2>
            <p>Join the next cohort and start building your future today.</p>
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
