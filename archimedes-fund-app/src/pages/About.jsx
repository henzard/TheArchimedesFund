import { motion } from 'framer-motion';
import { Award, Users, Target, TrendingUp, Code, BookOpen } from 'lucide-react';
import Card from '../components/Card';
import investorImage from '../assets/images/Gemini_Generated_Image_vp4rzcvp4rzcvp4r.png';
import studentImage from '../assets/images/Gemini_Generated_Image_1i8pxi1i8pxi1i8p.png';
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
      year: '2015',
      title: 'Beginning the Journey',
      description: 'Started my software development career, discovering a passion for building things that solve real problems. Began my reading habit in earnest.',
    },
    {
      year: '2018',
      title: 'Full-Stack Developer',
      description: 'Expanded into full-stack development, working with modern frameworks and cloud platforms. Crossed the 500-book milestone in my reading journey.',
    },
    {
      year: '2021',
      title: 'First Apprentice',
      description: 'Started mentoring my first apprentice, discovering that teaching is one of the best ways to solidify and expand your own knowledge.',
    },
    {
      year: '2024',
      title: 'The Archimedes Fund',
      description: 'Launched this platform to formalize my approach to code, books, and teaching—creating a space for projects, learning, and apprenticeships.',
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
            <h1>About Henzard Kruger</h1>
            <p className="about-lead">
              Software developer, lifelong learner, and mentor passionate about building things 
              that matter—whether that's code, skills, or meaningful connections.
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
                <h2>My Mission</h2>
                <p className="large-text">
                  To continuously learn, build meaningful software, and share knowledge with others.
                </p>
                <p>
                  I believe in the power of code to solve real problems, the importance of reading 
                  widely to gain perspective, and the responsibility to mentor those who want to 
                  learn. The Archimedes Fund is my platform for making this happen.
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
            >
              <p className="quote-text">
                "Give me a place to stand, and I shall move the world."
              </p>
              <p>
                I'm Henzard Kruger, a software developer who believes in the power of continuous 
                learning and knowledge sharing. My journey combines three essential elements:
              </p>
              <ul className="principle-list">
                <li><strong>Code</strong> - Building software that solves real problems</li>
                <li><strong>Books</strong> - Reading voraciously across disciplines to gain perspective</li>
                <li><strong>Teaching</strong> - Mentoring others and sharing what I've learned</li>
              </ul>
              <p>
                The Archimedes Fund is my personal platform for pursuing these passions. Through 
                apprenticeships, I offer hands-on mentorship to developers looking to level up their 
                skills. Through my projects, I explore new technologies and ideas. And through reading, 
                I constantly expand my understanding of the world.
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
              I'm a full-stack developer with a passion for building elegant solutions to complex problems. 
              My work spans web development, automation, data processing, and AI integration—always focused 
              on creating practical, user-friendly applications.
            </p>
            <p>
              Beyond coding, I'm a voracious reader. Books across philosophy, history, science, and biography 
              inform my thinking and broaden my perspective. I believe that being a well-rounded developer 
              means understanding not just how to code, but why we code and what impact our work has on the world.
            </p>
            <p>
              <strong>Teaching is where code and books come together.</strong> Through apprenticeships, I share 
              practical development skills while encouraging critical thinking and continuous learning. My goal 
              isn't just to teach syntax—it's to help others become thoughtful, capable developers who can solve 
              real problems.
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
                  <h3>Software Development</h3>
                  <p className="leader-bio">
                    Full-stack web applications, API development, automation tools, and AI integration. 
                    I work with Python, JavaScript, React, Node.js, and modern cloud platforms. Every 
                    project is an opportunity to learn something new and build something useful.
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
                  <h3>Mentorship & Apprenticeships</h3>
                  <p className="leader-bio">
                    I offer hands-on apprenticeships for aspiring developers—teaching practical skills, 
                    guiding through real projects, and sharing the lessons I've learned along the way. 
                    My approach combines technical training with broader thinking about software's role in society.
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

