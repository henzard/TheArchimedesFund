import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Search, Tag, BookOpen, Calendar, Eye } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import logo from '../assets/images/Gemini_Generated_Image_viq1aaviq1aaviq1.png';
import ReactMarkdown from 'react-markdown';
import './Passions.css';

const Passions = () => {
  const [passions, setPassions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchPassions = async () => {
      try {
        const response = await fetch('/.netlify/functions/passions-get-all');
        if (response.ok) {
          const data = await response.json();
          setPassions(data);

          // Extract unique tags and categories
          const tags = new Set();
          const categories = new Set();
          data.forEach(passion => {
            passion.tags?.forEach(tag => tags.add(tag));
            if (passion.category) categories.add(passion.category);
          });
          setAllTags(Array.from(tags).sort());
          setAllCategories(Array.from(categories).sort());
        } else {
          console.error('Failed to fetch passions:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch passions error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPassions();
  }, []);

  const filteredPassions = passions.filter(passion => {
    const matchesSearch = searchTerm
      ? passion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passion.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        passion.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesTag = selectedTag
      ? passion.tags?.includes(selectedTag)
      : true;

    const matchesCategory = selectedCategory
      ? passion.category === selectedCategory
      : true;

    return matchesSearch && matchesTag && matchesCategory && passion.status === 'published';
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setSelectedCategory('');
  };

  if (loading) {
    return (
      <div className="passions-page container">
        <div className="loading">Loading passions...</div>
      </div>
    );
  }

  return (
    <div className="passions-page">
      <section className="passions-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="passions-hero-content"
          >
            <motion.img
              src={logo}
              alt="Passions Logo"
              className="passions-hero-logo"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 150 }}
            />
            <h1>Core Passions & Guides</h1>
            <p className="passions-lead">
              Deep dives into the topics I'm passionate about. From AI to development practices,
              these guides capture what I'm learning and exploring right now.
            </p>
            <p className="passions-subtitle">
              Currently sharing {filteredPassions.length} published guide{filteredPassions.length !== 1 ? 's' : ''}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="passions-content section">
        <div className="container">
          <div className="passions-filters">
            <div className="filter-group">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by title, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Tag size={20} />
              <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <Lightbulb size={20} />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            {(searchTerm || selectedTag || selectedCategory) && (
              <Button variant="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          <div className="passions-grid">
            {filteredPassions.length > 0 ? (
              filteredPassions.map(passion => (
                <motion.div
                  key={passion.id}
                  className="passion-card-public"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card padding="large">
                    {passion.cover_image_url && (
                      <div className="passion-cover-public">
                        <img src={passion.cover_image_url} alt={passion.title} />
                      </div>
                    )}
                    
                    <div className="passion-content-public">
                      <h3 className="passion-title-public">
                        {passion.icon_emoji && <span className="passion-emoji-public">{passion.icon_emoji}</span>}
                        {passion.title}
                      </h3>
                      
                      {passion.subtitle && (
                        <p className="passion-subtitle-public">{passion.subtitle}</p>
                      )}

                      <div className="passion-meta-public">
                        {passion.category && (
                          <span className="passion-category-public">{passion.category}</span>
                        )}
                        {passion.reading_time && (
                          <span className="passion-reading-time-public">
                            <BookOpen size={14} /> {passion.reading_time} min read
                          </span>
                        )}
                        {passion.view_count > 0 && (
                          <span className="passion-views-public">
                            <Eye size={14} /> {passion.view_count} views
                          </span>
                        )}
                        {passion.date_published && (
                          <span className="passion-date-public">
                            <Calendar size={14} /> {new Date(passion.date_published).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {passion.tags && passion.tags.length > 0 && (
                        <div className="passion-tags-public">
                          {passion.tags.map(tag => (
                            <span key={tag} className="passion-tag-public">{tag}</span>
                          ))}
                        </div>
                      )}

                      {passion.excerpt && (
                        <div className="passion-excerpt-public">
                          <p>{passion.excerpt}</p>
                        </div>
                      )}

                      {passion.markdown_content && (
                        <div className="passion-markdown-public">
                          <ReactMarkdown>{passion.markdown_content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="empty-state">No passions found matching your criteria.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Passions;
