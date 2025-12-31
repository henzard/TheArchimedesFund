import { motion } from 'framer-motion';
import { Users, Target, Code, BookOpen } from 'lucide-react';
import Card from '../components/Card';
import profileImage from '../assets/images/Gemini_Generated_Image_q6d921q6d921q6d9.png';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <Code size={40} />,
      title: 'Craftsmanship',
      description: 'Writing clean, maintainable code that solves real problems elegantly.',
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Continuous Learning',
      description: 'Always reading, always learning, always expanding my understanding.',
    },
    {
      icon: <Target size={40} />,
      title: 'Purpose',
      description: 'Building software that makes a meaningful difference in people\'s lives.',
    },
    {
      icon: <Users size={40} />,
      title: 'Mentorship',
      description: 'Sharing knowledge and helping others grow in their development journey.',
    },
  ];

  const timeline = [
    {
      year: '2010s',
      title: 'Beginning the Journey',
      description: 'Started software development career, specializing in C#/.NET and web technologies. Began contributing to open source projects and building professional solutions.',
    },
    {
      year: '2015+',
      title: 'Picahoo & Enterprise Development',
      description: 'Joined Picahoo, building enterprise solutions including XeroAPI integrations, business management systems, and full-stack web applications.',
    },
    {
      year: '2020+',
      title: 'Teaching & Mentorship',
      description: 'Created the Friday Training Project for teaching Angular. Started mentoring junior developers through hands-on apprenticeships and practical code reviews.',
    },
    {
      year: '2024',
      title: 'The Archimedes Fund',
      description: 'Launched this platform to formalize my approach to development and mentorship—creating a space for projects, learning, and professional apprenticeships.',
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
            className="about-hero-content"
          >
            <motion.div
              className="profile-image-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={profileImage} alt="Henzard Kruger" className="profile-image" />
            </motion.div>
            
            <h1>About Henzard Kruger</h1>
            <p className="about-lead">
              Full-stack developer from Bloemfontein, South Africa. Building software with C#/.NET, 
              JavaScript/Angular, and Laravel/PHP at Picahoo. Passionate about clean code, continuous 
              learning, and mentoring the next generation.
            </p>
            <div className="social-links" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href="https://github.com/henzard" target="_blank" rel="noopener noreferrer" className="social-link-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/henzard/" target="_blank" rel="noopener noreferrer" className="social-link-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </div>
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
                <h2>My Mission</h2>
                <p className="large-text">
                  To build elegant software solutions and share knowledge through hands-on mentorship.
                </p>
                <p>
                  I believe in writing clean, maintainable code that solves real business problems. 
                  At Picahoo, I work on full-stack applications, API integrations (like XeroAPI), and 
                  modern web solutions. Beyond building, I'm committed to helping junior developers level 
                  up through practical apprenticeships.
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
                <h2>My Vision</h2>
                <p className="large-text">
                  A world where knowledge and skills are freely shared, where learning never stops, 
                  and where everyone has access to quality mentorship.
                </p>
                <p>
                  Through apprenticeships, open-source contributions, and continuous education, 
                  I aim to create opportunities for others to develop their technical skills and 
                  pursue their own adventures in software development.
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
            <h2 className="section-title">My Story</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="story-content">
            <motion.div
              className="story-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ maxWidth: '100%' }}
            >
              <p className="quote-text">
                "Give me a place to stand, and I shall move the world."
              </p>
              <p>
                I'm Henzard Kruger, a full-stack developer based in Bloemfontein, South Africa. 
                I work at <strong>Picahoo</strong> (www.picahoo.co.za), where I build enterprise 
                solutions using modern technologies.
              </p>
              <ul className="principle-list">
                <li><strong>Code</strong> - C#/.NET, JavaScript/Angular, Laravel/PHP, API development</li>
                <li><strong>Books</strong> - Voracious reader across philosophy, technology, and history</li>
                <li><strong>Teaching</strong> - Mentoring developers through practical apprenticeships</li>
              </ul>
              <p>
                My GitHub showcases projects ranging from XeroAPI.Net integrations to Laravel packages 
                and Angular training applications. I've earned badges for collaboration (Pair Extraordinaire), 
                code contributions (Pull Shark), and taking risks (YOLO). The Archimedes Fund is my platform 
                for combining professional development work with my passion for teaching.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="leadership section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">What I Do</h2>
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
              I'm a full-stack developer with expertise across the Microsoft and web development ecosystems. 
              At Picahoo, I build enterprise solutions that integrate accounting platforms, manage business 
              workflows, and deliver exceptional user experiences.
            </p>
            <p>
              My tech stack includes <strong>C#/.NET</strong> for robust backend systems, <strong>JavaScript/Angular</strong> 
              for dynamic frontends, and <strong>Laravel/PHP</strong> for flexible web applications. I've contributed to 
              open source (like XeroAPI.Net), built training projects for teaching Angular, and developed communication 
              packages for Laravel.
            </p>
            <p>
              <strong>Teaching is where everything comes together.</strong> Through my Friday Training Project and other 
              initiatives, I've mentored developers in Angular, modern web development, and professional best practices. 
              My goal is to help others write better code, think critically about architecture, and build confidence in 
              their abilities.
            </p>
          </motion.div>

          <div className="leadership-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card padding="large" className="leader-card">
                <div className="value-icon"><Code size={50} /></div>
                <div className="leader-info">
                  <h3>Full-Stack Development</h3>
                  <p className="leader-bio">
                    <strong>C#/.NET:</strong> Enterprise backend systems, API development, XeroAPI integrations<br/>
                    <strong>JavaScript/Angular:</strong> Modern SPAs, component-based architecture, TypeScript<br/>
                    <strong>Laravel/PHP:</strong> Web applications, custom packages, communication integrations<br/>
                    Plus: Bootstrap, jQuery, version control with Git, and modern development workflows.
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
              <Card padding="large" className="leader-card">
                <div className="value-icon"><BookOpen size={50} /></div>
                <div className="leader-info">
                  <h3>Reading & Learning</h3>
                  <p className="leader-bio">
                    I've read over 1,000 books across diverse topics—from Stoic philosophy and ancient 
                    history to cutting-edge AI research and software architecture. Reading fuels my 
                    curiosity and shapes how I approach problems, both in code and in life.
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
              <Card padding="large" className="leader-card">
                <div className="value-icon"><Users size={50} /></div>
                <div className="leader-info">
                  <h3>Mentorship & Teaching</h3>
                  <p className="leader-bio">
                    Creator of the Friday Training Project (Angular tutorial app) and mentor to junior developers. 
                    I offer hands-on apprenticeships covering practical development skills, code review best practices, 
                    and career guidance. My teaching philosophy: learn by building real things, not just tutorials.
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
              <h3>My Philosophy: Build, Learn, Share</h3>
              <p>
                I believe the best way to learn is by building real things. The best way to grow is 
                through continuous reading and reflection. And the best way to solidify knowledge is 
                by teaching others. This cycle—build, learn, share—is what drives everything I do.
              </p>
              <p className="philosophy-quote">
                "The more I learn, the more I realize how much there is to know. And that's exciting."
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
            <h2 className="section-title">My Values</h2>
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
            <h2 className="section-title">My Journey</h2>
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
            <h2>Interested in Working Together?</h2>
            <p>Whether you're looking for an apprenticeship or want to support my work, I'd love to hear from you.</p>
            <div className="cta-buttons">
              <a href="/apply" className="btn btn-primary btn-large">Apply for Apprenticeship</a>
              <a href="/invest" className="btn btn-secondary btn-large">Support My Work</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

