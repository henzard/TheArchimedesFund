import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Search, Filter, Star, ExternalLink, Calendar, Tag, Github } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import logo from '../assets/images/Gemini_Generated_Image_viq1aaviq1aaviq1.png';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [allTech, setAllTech] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [selectedTag, selectedTech, searchTerm]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTag) params.append('tag', selectedTag);
      if (selectedTech) params.append('tech', selectedTech);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/.netlify/functions/projects-get-all?${params}`);
      if (response.ok) {
        const result = await response.json();
        setProjects(result.projects || []);
        
        // Extract unique tags and tech
        const tags = new Set();
        const tech = new Set();
        result.projects.forEach(project => {
          project.tags?.forEach(tag => tags.add(tag));
          project.tech_stack?.forEach(t => tech.add(t));
        });
        setAllTags(Array.from(tags).sort());
        setAllTech(Array.from(tech).sort());
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setSelectedTech('');
  };

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="projects-hero-logo"
          >
            <img src={logo} alt="The Archimedes Fund" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="projects-hero-content"
          >
            <h1>
              <Code className="hero-icon" />
              Project Portfolio
            </h1>
            <p className="projects-lead">
              {projects.length} projects built and counting. Each one a lever to solve real problems.
            </p>
            <p className="projects-subtitle">
              Explore my GitHub projects with detailed insights, tech stacks, challenges faced, and lessons learned. Mini blog posts about what I've built.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container">
        {/* Filters Section */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card padding="large" className="filters-card">
            <div className="filters-header">
              <Filter size={24} />
              <h2>Find a Project</h2>
            </div>
            
            <div className="filters-grid">
              {/* Search */}
              <div className="filter-group">
                <label>
                  <Search size={18} />
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by title, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Tag Filter */}
              <div className="filter-group">
                <label>
                  <Tag size={18} />
                  Category
                </label>
                <select 
                  value={selectedTag} 
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              {/* Tech Filter */}
              <div className="filter-group">
                <label>
                  <Code size={18} />
                  Technology
                </label>
                <select 
                  value={selectedTech} 
                  onChange={(e) => setSelectedTech(e.target.value)}
                >
                  <option value="">All Technologies</option>
                  {allTech.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>

            {(searchTerm || selectedTag || selectedTech) && (
              <Button variant="secondary" size="small" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </Card>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="loading-state">
            <Code size={48} />
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <Code size={64} />
            <h3>No projects found</h3>
            <p>Try adjusting your filters or search term</p>
            <Button variant="primary" onClick={clearFilters}>
              Show All Projects
            </Button>
          </div>
        ) : (
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card padding="large" className="project-card-public">
                    {project.image_url && (
                      <div className="project-image-container">
                        <img src={project.image_url} alt={project.title} className="project-image-public" />
                      </div>
                    )}

                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      {project.tagline && <p className="project-tagline-public">{project.tagline}</p>}

                      <div className="project-meta-public">
                        <span className={`project-status project-status-${project.status}`}>
                          {project.status}
                        </span>
                        {project.stars > 0 && (
                          <div className="project-stars-public">
                            <Star size={14} fill="var(--secondary-color)" color="var(--secondary-color)" />
                            {project.stars}
                          </div>
                        )}
                        {project.date_completed && (
                          <div className="project-date-public">
                            <Calendar size={14} />
                            {new Date(project.date_completed).toLocaleDateString('en-US', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </div>
                        )}
                      </div>

                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="tech-stack-public">
                          {project.tech_stack.map((tech, i) => (
                            <span key={i} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                      )}

                      {project.tags && project.tags.length > 0 && (
                        <div className="tags-public">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="tag-public">{tag}</span>
                          ))}
                        </div>
                      )}

                      <div className="project-description-public">
                        <p>{project.description}</p>
                      </div>

                      {project.features && project.features.length > 0 && (
                        <div className="project-features-public">
                          <h4>Key Features</h4>
                          <ul>
                            {project.features.slice(0, 3).map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.challenges && (
                        <div className="project-challenge-public">
                          <h4>💪 Challenge</h4>
                          <p>{project.challenges}</p>
                        </div>
                      )}

                      {project.learnings && (
                        <div className="project-learning-public">
                          <h4>💡 What I Learned</h4>
                          <p>{project.learnings}</p>
                        </div>
                      )}

                      <div className="project-links-public">
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link-public project-link-github"
                        >
                          <Github size={16} />
                          View Code
                        </a>
                        {project.demo_url && (
                          <a 
                            href={project.demo_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link-public project-link-demo"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
