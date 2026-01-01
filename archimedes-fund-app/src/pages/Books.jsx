import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, Star, ExternalLink, Calendar, Tag } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import logo from '../assets/images/Gemini_Generated_Image_viq1aaviq1aaviq1.png';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [allProblems, setAllProblems] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [selectedTag, selectedProblem, searchTerm]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTag) params.append('tag', selectedTag);
      if (selectedProblem) params.append('problem', selectedProblem);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/.netlify/functions/books-get-all?${params}`);
      if (response.ok) {
        const result = await response.json();
        setBooks(result.books || []);
        
        // Extract unique tags and problems
        const tags = new Set();
        const problems = new Set();
        result.books.forEach(book => {
          book.tags?.forEach(tag => tags.add(tag));
          book.problems_solved?.forEach(problem => problems.add(problem));
        });
        setAllTags(Array.from(tags).sort());
        setAllProblems(Array.from(problems).sort());
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setSelectedProblem('');
  };

  return (
    <div className="books-page">
      {/* Hero Section */}
      <section className="books-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="books-hero-logo"
          >
            <img src={logo} alt="The Archimedes Fund" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="books-hero-content"
          >
            <h1>
              <BookOpen className="hero-icon" />
              Reading Library
            </h1>
            <p className="books-lead">
              {books.length} books read and counting. Each one a lever to move my world forward.
            </p>
            <p className="books-subtitle">
              Explore insights from leadership, technical deep-dives, philosophy, and more. 
              Filter by tags or problems solved to find exactly what you need.
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
              <h2>Find Your Next Read</h2>
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
                  placeholder="Search by title, author, or impact..."
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

              {/* Problem Filter */}
              <div className="filter-group">
                <label>
                  <Filter size={18} />
                  Solves Problem
                </label>
                <select 
                  value={selectedProblem} 
                  onChange={(e) => setSelectedProblem(e.target.value)}
                >
                  <option value="">All Problems</option>
                  {allProblems.map(problem => (
                    <option key={problem} value={problem}>{problem}</option>
                  ))}
                </select>
              </div>
            </div>

            {(searchTerm || selectedTag || selectedProblem) && (
              <Button variant="secondary" size="small" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </Card>
        </motion.div>

        {/* Books Grid */}
        {loading ? (
          <div className="loading-state">
            <BookOpen size={48} />
            <p>Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={64} />
            <h3>No books found</h3>
            <p>Try adjusting your filters or search term</p>
            <Button variant="primary" onClick={clearFilters}>
              Show All Books
            </Button>
          </div>
        ) : (
          <motion.div
            className="books-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence>
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card padding="large" className="book-card-public">
                    <div className="book-spine">
                      {book.cover_image_url ? (
                        <img src={book.cover_image_url} alt={book.title} className="book-cover-public" />
                      ) : (
                        <div className="book-cover-placeholder">
                          <BookOpen size={48} />
                        </div>
                      )}
                    </div>

                    <div className="book-content">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">by {book.author}</p>

                      <div className="book-meta-public">
                        {book.rating && (
                          <div className="book-rating-public">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < book.rating ? 'var(--secondary-color)' : 'none'}
                                color="var(--secondary-color)"
                              />
                            ))}
                          </div>
                        )}
                        {book.date_read && (
                          <div className="book-date-public">
                            <Calendar size={14} />
                            {new Date(book.date_read).toLocaleDateString('en-US', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </div>
                        )}
                      </div>

                      {book.tags && book.tags.length > 0 && (
                        <div className="book-tags-public">
                          {book.tags.map((tag, i) => (
                            <span key={i} className="tag-public">{tag}</span>
                          ))}
                        </div>
                      )}

                      {book.problems_solved && book.problems_solved.length > 0 && (
                        <div className="book-problems-public">
                          <strong>Solves:</strong>
                          <div className="problem-tags-public">
                            {book.problems_solved.map((problem, i) => (
                              <span key={i} className="problem-tag-public">{problem}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="book-impact-public">
                        <h4>Impact</h4>
                        <p>{book.impact}</p>
                      </div>

                      {book.key_takeaways && (
                        <div className="book-takeaways-public">
                          <h4>Key Takeaways</h4>
                          <p>{book.key_takeaways}</p>
                        </div>
                      )}

                      {(book.goodreads_url || book.amazon_url) && (
                        <div className="book-links">
                          {book.goodreads_url && (
                            <a 
                              href={book.goodreads_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="book-link"
                            >
                              <ExternalLink size={16} />
                              Goodreads
                            </a>
                          )}
                          {book.amazon_url && (
                            <a 
                              href={book.amazon_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="book-link"
                            >
                              <ExternalLink size={16} />
                              Amazon
                            </a>
                          )}
                        </div>
                      )}
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

export default Books;
