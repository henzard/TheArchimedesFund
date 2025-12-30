import { motion } from 'framer-motion';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import investorImage from '../assets/images/Gemini_Generated_Image_vp4rzcvp4rzcvp4r.png';
import studentImage from '../assets/images/Gemini_Generated_Image_1i8pxi1i8pxi1i8p.png';
import johnMiller from '../assets/images/Gemini_Generated_Image_7sscru7sscru7ssc.png';
import jimHenderson from '../assets/images/Gemini_Generated_Image_dqd7kidqd7kidqd7.png';
import barryJenkins from '../assets/images/Gemini_Generated_Image_g50qpg50qpg50qpg.png';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Excellence',
      description: 'We pursue the highest standards in education, mentorship, and outcomes.',
    },
    {
      icon: <Users size={40} />,
      title: 'Community',
      description: 'Building a network of capable men who support and elevate each other.',
    },
    {
      icon: <Target size={40} />,
      title: 'Purpose',
      description: 'Focused on developing economic sovereignty and technical mastery.',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Growth',
      description: 'Continuous improvement through discipline, learning, and execution.',
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Foundation',
      description: 'The Archimedes Fund was established with a clear mission: to provide educational pathways for men seeking financial mastery and technical excellence.',
    },
    {
      year: '2025',
      title: 'First Cohort',
      description: 'Launched our inaugural 12-week intensive program with a pilot group of 20 students. Achieved 100% placement rate.',
    },
    {
      year: '2026',
      title: 'Expansion',
      description: 'Scaling to multiple cohorts per year, expanding curriculum, and building strategic partnerships with leading tech companies.',
    },
    {
      year: 'Future',
      title: 'Impact at Scale',
      description: 'Creating a global network of financially literate, technically skilled men who build the future.',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About The Archimedes Fund</h1>
            <p className="about-lead">
              Engineering a generation of men who possess the economic sovereignty and 
              technical command necessary to build, sustain, and advance the modern world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision section">
        <div className="container">
          <div className="mission-vision-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card padding="large" className="mission-card">
                <h2>Our Mission</h2>
                <p className="large-text">
                  To provide the "place to stand" for men seeking to maximize their potential.
                </p>
                <p>
                  We achieve this by deploying high-impact capital into educational pathways 
                  focused on financial mastery and advanced technology—turning raw human 
                  capability into compounded value.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card padding="large" className="vision-card">
                <h2>Our Vision</h2>
                <p className="large-text">
                  A world where every man has access to the tools, knowledge, and support 
                  needed to achieve economic independence and technical mastery.
                </p>
                <p>
                  We envision communities of builders, innovators, and leaders who use their 
                  skills to create value, solve problems, and advance civilization.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="story section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">The Archimedes Principle</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="story-content">
            <motion.div
              className="story-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="quote-text">
                "Give me a place to stand, and I shall move the world."
              </p>
              <p>
                Archimedes understood a fundamental truth: with the right leverage point, 
                anything is possible. Our fund embodies this principle by providing young men 
                with three essential elements:
              </p>
              <ul className="principle-list">
                <li><strong>The Lever</strong> - Technology skills that multiply your force</li>
                <li><strong>The Fulcrum</strong> - Financial knowledge that provides stability</li>
                <li><strong>The Force</strong> - Discipline and mindset to apply your power</li>
              </ul>
              <p>
                Together, these three pillars create the leverage needed to move mountains, 
                build companies, and transform lives.
              </p>
            </motion.div>

            <motion.div
              className="story-images"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="story-image">
                <img src={studentImage} alt="Student Success" />
              </div>
              <div className="story-image">
                <img src={investorImage} alt="Building the Future" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="leadership section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Leadership</h2>
            <div className="section-divider"></div>
          </motion.div>

          <motion.div
            className="leadership-story"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="leadership-intro">
              The Archimedes Fund was founded by three men who came to a profound realization: 
              the advantages they had received—access to capital, networks, education, and 
              opportunity—weren't inherent virtues, but structural privileges that needed to be 
              acknowledged and redirected.
            </p>
            <p>
              Rather than deny or downplay these advantages, they chose a different path: to build 
              a system that teaches the next generation not just to benefit from opportunity, but 
              to wield it responsibly, share it generously, and use it to create value for others.
            </p>
            <p>
              <strong>This isn't about guilt or charity—it's about leverage and responsibility.</strong> 
              {' '}We believe that those who have been given much should build much. The Archimedes Fund 
              exists to ensure that young men understand both the power and the duty that comes with 
              economic freedom and technical capability.
            </p>
          </motion.div>

          <div className="leadership-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card padding="none" className="leader-card">
                <div className="leader-image">
                  <img src={johnMiller} alt="John Miller" />
                </div>
                <div className="leader-info">
                  <h3>John Miller</h3>
                  <p className="leader-title">Director</p>
                  <p className="leader-bio">
                    30+ years in private equity and venture capital. John recognized that the 
                    networks and capital access he inherited opened doors that talent alone never 
                    could. He founded The Archimedes Fund to democratize access to financial literacy 
                    and create a meritocratic path to wealth building.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card padding="none" className="leader-card">
                <div className="leader-image">
                  <img src={jimHenderson} alt="Jim Henderson" />
                </div>
                <div className="leader-info">
                  <h3>Jim Henderson</h3>
                  <p className="leader-title">Chairman</p>
                  <p className="leader-bio">
                    Former tech executive and startup founder. Jim built three successful companies, 
                    each time leveraging connections from elite institutions. He now dedicates his 
                    time to ensuring that drive, discipline, and skill—not pedigree—determine 
                    success for the next generation.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card padding="none" className="leader-card">
                <div className="leader-image">
                  <img src={barryJenkins} alt="Barry Jenkins" />
                </div>
                <div className="leader-info">
                  <h3>Barry Jenkins</h3>
                  <p className="leader-title">Chief Operating Officer</p>
                  <p className="leader-bio">
                    Operations strategist and former management consultant. Barry witnessed firsthand 
                    how access to opportunity compounds over time. He manages our day-to-day operations, 
                    ensuring every student receives the same caliber of mentorship, resources, and 
                    network access that traditionally required family connections.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="leadership-philosophy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card padding="large" className="philosophy-card">
              <h3>Our Philosophy: Privilege as Responsibility</h3>
              <p>
                We don't ask our students to feel guilty about advantages they may have. Instead, 
                we teach them to recognize opportunity, respect it, and use it to build something 
                meaningful. We believe that economic sovereignty isn't just about personal wealth—it's 
                about the ability to create jobs, solve problems, and contribute to civilization.
              </p>
              <p className="philosophy-quote">
                "To whom much is given, much will be required. We're not here to redistribute 
                guilt—we're here to redistribute knowledge, capital, and opportunity."
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="values section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Values</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card padding="large" className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Journey</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="timeline-container">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="timeline-year">{item.year}</div>
                <Card padding="large" className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Join Us?</h2>
            <p>Become part of a community dedicated to excellence, growth, and building the future.</p>
            <div className="cta-buttons">
              <a href="/apply" className="btn btn-primary btn-large">Apply Now</a>
              <a href="/program" className="btn btn-secondary btn-large">View Program</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

