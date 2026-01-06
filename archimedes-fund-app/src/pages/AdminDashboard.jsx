import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, DollarSign, FileText, BookOpen, Plus, Edit, Trash2, Save, X, Code, ExternalLink, Heart, Eye, Lightbulb, MessageCircle, User, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './AdminDashboard.css';

// BookForm Component
const BookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card padding="large" className="book-form">
      <form onSubmit={handleSubmit}>
        <h3>{book.id ? 'Edit Book' : 'Add New Book'}</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Cover Image URL</label>
            <input
              type="url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          
          <div className="form-group">
            <label>Rating</label>
            <select name="rating" value={formData.rating} onChange={handleChange}>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Date Read</label>
            <input
              type="date"
              name="date_read"
              value={formData.date_read}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'tags')}
            placeholder="leadership, technical, philosophy, productivity"
          />
          <small>Examples: leadership, technical, philosophy, productivity, mindset, business</small>
        </div>
        
        <div className="form-group">
          <label>Problems Solved (comma-separated)</label>
          <input
            type="text"
            value={formData.problems_solved?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'problems_solved')}
            placeholder="team management, code quality, time management"
          />
          <small>Examples: team management, code quality, time management, decision-making</small>
        </div>
        
        <div className="form-group">
          <label>Impact / Review *</label>
          <textarea
            name="impact"
            value={formData.impact}
            onChange={handleChange}
            rows="4"
            required
            placeholder="What impact did this book have on you? How did it change your thinking or approach?"
          />
        </div>
        
        <div className="form-group">
          <label>Key Takeaways</label>
          <textarea
            name="key_takeaways"
            value={formData.key_takeaways}
            onChange={handleChange}
            rows="3"
            placeholder="Bullet points or key lessons from the book"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Goodreads URL</label>
            <input
              type="url"
              name="goodreads_url"
              value={formData.goodreads_url}
              onChange={handleChange}
              placeholder="https://goodreads.com/..."
            />
          </div>
          
          <div className="form-group">
            <label>Amazon URL</label>
            <input
              type="url"
              name="amazon_url"
              value={formData.amazon_url}
              onChange={handleChange}
              placeholder="https://amazon.com/..."
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft (not visible to public)</option>
            <option value="published">Published (visible to public)</option>
          </select>
        </div>
        
        <div className="form-actions">
          <Button type="submit" variant="primary">
            <Save size={18} /> Save Book
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            <X size={18} /> Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

// ProjectForm Component
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(project);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card padding="large" className="project-form">
      <form onSubmit={handleSubmit}>
        <h3>{project.id ? 'Edit Project' : 'Add New Project'}</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="My Awesome Project"
            />
          </div>
          
          <div className="form-group">
            <label>URL Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="my-awesome-project"
            />
            <small>URL-friendly version (lowercase, hyphens)</small>
          </div>
        </div>

        <div className="form-group">
          <label>Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="A catchy one-liner about your project"
          />
        </div>
        
        <div className="form-group">
          <label>Description / Mini Blog Post *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Write about your project like a mini blog post. What is it? Why did you build it? What problem does it solve?"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>GitHub URL *</label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              required
              placeholder="https://github.com/username/repo"
            />
          </div>
          
          <div className="form-group">
            <label>Live Demo URL</label>
            <input
              type="url"
              name="demo_url"
              value={formData.demo_url}
              onChange={handleChange}
              placeholder="https://myproject.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Project Image/Screenshot URL</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://... (banner or screenshot)"
          />
        </div>
        
        <div className="form-group">
          <label>Tech Stack (comma-separated)</label>
          <input
            type="text"
            value={formData.tech_stack?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'tech_stack')}
            placeholder="React, Node.js, PostgreSQL, Docker"
          />
          <small>Technologies and frameworks used</small>
        </div>
        
        <div className="form-group">
          <label>Tags/Categories (comma-separated)</label>
          <input
            type="text"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'tags')}
            placeholder="web, mobile, api, tool, game"
          />
          <small>Project categories for filtering</small>
        </div>

        <div className="form-group">
          <label>Key Features (comma-separated)</label>
          <input
            type="text"
            value={formData.features?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'features')}
            placeholder="Real-time chat, User authentication, API integration"
          />
          <small>Bullet points of main features</small>
        </div>
        
        <div className="form-group">
          <label>Challenges Faced</label>
          <textarea
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows="3"
            placeholder="What obstacles did you encounter while building this?"
          />
        </div>
        
        <div className="form-group">
          <label>What I Learned</label>
          <textarea
            name="learnings"
            value={formData.learnings}
            onChange={handleChange}
            rows="3"
            placeholder="Key insights and skills gained from this project"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Project Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active (maintained)</option>
              <option value="in-progress">In Progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="form-group">
            <label>Visibility</label>
            <select name="visibility" value={formData.visibility} onChange={handleChange}>
              <option value="draft">Draft (not visible)</option>
              <option value="published">Published (public)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>GitHub Stars</label>
            <input
              type="number"
              name="stars"
              value={formData.stars}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Date Completed</label>
            <input
              type="date"
              name="date_completed"
              value={formData.date_completed}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <Button type="submit" variant="primary">
            <Save size={18} /> Save Project
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            <X size={18} /> Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};


// PassionForm Component
const PassionForm = ({ passion, onSave, onCancel }) => {
  const [formData, setFormData] = useState(passion);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card padding="large" className="passion-form">
      <form onSubmit={handleSubmit}>
        <h3>{passion.id ? 'Edit Passion' : 'Add New Passion'}</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="How to Use AI Effectively"
            />
          </div>
          
          <div className="form-group">
            <label>Slug * (URL-friendly)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="how-to-use-ai-effectively"
            />
            <small>Used in URL (e.g., /passions/how-to-use-ai)</small>
          </div>
        </div>
        
        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="A practical guide to leveraging AI in your daily workflow"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="AI, Development, Leadership, Learning"
            />
          </div>
          
          <div className="form-group">
            <label>Icon Emoji</label>
            <input
              type="text"
              name="icon_emoji"
              value={formData.icon_emoji}
              onChange={handleChange}
              maxLength="10"
              placeholder="🤖"
            />
            <small>A single emoji to represent this passion</small>
          </div>
        </div>
        
        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="url"
            name="cover_image_url"
            value={formData.cover_image_url}
            onChange={handleChange}
            placeholder="https://... (optional hero image)"
          />
        </div>
        
        <div className="form-group">
          <label>Excerpt (Short Summary)</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="2"
            placeholder="A brief preview of what this guide covers (displayed in cards)"
          />
        </div>
        
        <div className="form-group">
          <label>Markdown Content *</label>
          <textarea
            name="markdown_content"
            value={formData.markdown_content}
            onChange={handleChange}
            rows="20"
            required
            placeholder="# Introduction&#10;&#10;Write your full content here using **Markdown** formatting.&#10;&#10;## Section 1&#10;- Bullet point&#10;- Another point&#10;&#10;Code example:&#10;```javascript&#10;const example = 'code';&#10;```"
          />
          <small>Use Markdown for formatting. Supports headings, lists, code blocks, links, etc.</small>
        </div>
        
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => handleArrayChange(e, 'tags')}
            placeholder="AI, productivity, automation, tools"
          />
          <small>Tags for filtering and discovery</small>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Reading Time (minutes)</label>
            <input
              type="number"
              name="reading_time"
              value={formData.reading_time}
              onChange={handleChange}
              min="1"
              placeholder="5"
            />
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="draft">Draft (not visible)</option>
              <option value="published">Published (public)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Date Published</label>
            <input
              type="date"
              name="date_published"
              value={formData.date_published}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <Button type="submit" variant="primary">
            <Save size={18} /> Save Passion
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            <X size={18} /> Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};


// Search and Filter Component
const SearchFilterBar = ({ searchTerm, onSearchChange, statusFilter, onStatusChange, statuses, onClearFilters }) => {
  return (
    <div className="search-filter-bar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {statuses && (
        <div className="filter-dropdown">
          <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      )}
      {(searchTerm || statusFilter !== 'all') && (
        <button className="clear-filters-btn" onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-bar">
      <div className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} /> Prev
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          // Show first, last, current, and pages around current
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNum}
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
            return <span key={pageNum}>...</span>;
          }
          return null;
        })}
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [books, setBooks] = useState([]);
  const [booksStats, setBooksStats] = useState({ published: 0, draft: 0 });
  const [editingBook, setEditingBook] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsStats, setProjectsStats] = useState({ published: 0, draft: 0 });
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [passions, setPassions] = useState([]);
  const [passionsStats, setPassionsStats] = useState({ published: 0, draft: 0 });
  const [editingPassion, setEditingPassion] = useState(null);
  const [showPassionForm, setShowPassionForm] = useState(false);
  const [therapistSessions, setTherapistSessions] = useState([]);
  const [therapistStats, setTherapistStats] = useState({ total_sessions: 0, active_sessions: 0, sessions_this_week: 0, total_messages: 0 });
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionMessages, setSessionMessages] = useState([]);
  const navigate = useNavigate();

  // Reset pagination when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, statusFilter]);

  // Filter and paginate data based on active tab
  const getFilteredData = (items, searchFields) => {
    if (!items) return [];
    
    let filtered = items;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        searchFields.some(field => 
          item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter || item.visibility === statusFilter);
    }
    
    return filtered;
  };

  const getPaginatedData = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Filtered data for each section
  const filteredContacts = useMemo(() => 
    data ? getFilteredData(data.contacts, ['name', 'email', 'message']) : [],
    [data, searchTerm, statusFilter]
  );

  const filteredInvestments = useMemo(() => 
    data ? getFilteredData(data.investments, ['name', 'email', 'company', 'message']) : [],
    [data, searchTerm, statusFilter]
  );

  const filteredApplications = useMemo(() => 
    data ? getFilteredData(data.applications, ['full_name', 'email', 'why_apply', 'goals']) : [],
    [data, searchTerm, statusFilter]
  );

  const filteredBooks = useMemo(() => 
    getFilteredData(books, ['title', 'author', 'tags']),
    [books, searchTerm, statusFilter]
  );

  const filteredProjects = useMemo(() => 
    getFilteredData(projects, ['title', 'description', 'tags']),
    [projects, searchTerm, statusFilter]
  );

  const filteredPassions = useMemo(() => 
    getFilteredData(passions, ['title', 'subtitle', 'category', 'tags']),
    [passions, searchTerm, statusFilter]
  );

  const filteredTherapistSessions = useMemo(() => 
    getFilteredData(therapistSessions, ['username', 'chat_name']),
    [therapistSessions, searchTerm, statusFilter]
  );

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  // Navigation sections for sidebar
  const navSections = [
    {
      title: "Overview",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Eye, badge: null }
      ]
    },
    {
      title: "Submissions",
      items: [
        { id: 'contacts', label: 'Contacts', icon: Mail, badge: data?.contacts?.filter(c => c.status === 'new').length || 0 },
        { id: 'investments', label: 'Investments', icon: DollarSign, badge: data?.investments?.filter(i => i.status === 'new').length || 0 },
        { id: 'applications', label: 'Applications', icon: FileText, badge: data?.applications?.filter(a => a.status === 'new').length || 0 }
      ]
    },
    {
      title: "Content Management",
      items: [
        { id: 'books', label: 'Books', icon: BookOpen, badge: null },
        { id: 'projects', label: 'Projects', icon: Code, badge: null },
        { id: 'passions', label: 'Passions', icon: Lightbulb, badge: null }
      ]
    },
    {
      title: "Support",
      items: [
        { id: 'therapist', label: 'Therapist', icon: MessageCircle, badge: null }
      ]
    }
  ];

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
    fetchBooks();
    fetchProjects();
    fetchPassions();
    fetchTherapistSessions();
  }, [navigate]);

  const fetchPassions = async () => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch('/.netlify/functions/admin-passions-get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPassions(result.passions || []);
        setPassionsStats(result.stats || { published: 0, draft: 0 });
      }
    } catch (error) {
      console.error('Fetch passions error:', error);
    }
  };

  const fetchTherapistSessions = async () => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch('/.netlify/functions/admin-therapist-get-sessions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setTherapistSessions(result.sessions || []);
        setTherapistStats(result.stats || { total_sessions: 0, active_sessions: 0, sessions_this_week: 0, total_messages: 0 });
      }
    } catch (error) {
      console.error('Fetch therapist sessions error:', error);
    }
  };

  const fetchSessionMessages = async (sessionId) => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch(`/.netlify/functions/admin-therapist-get-messages?sessionId=${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSelectedSession(result.session);
        setSessionMessages(result.messages || []);
      }
    } catch (error) {
      console.error('Fetch session messages error:', error);
    }
  };

  const fetchProjects = async () => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch('/.netlify/functions/admin-projects-get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setProjects(result.projects || []);
        setProjectsStats(result.stats || { published: 0, draft: 0 });
      }
    } catch (error) {
      console.error('Fetch projects error:', error);
    }
  };

  const fetchBooks = async () => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch('/.netlify/functions/admin-books-get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setBooks(result.books || []);
        setBooksStats(result.stats || { published: 0, draft: 0 });
      }
    } catch (error) {
      console.error('Fetch books error:', error);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch('/.netlify/functions/admin-get-submissions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        // Token invalid, redirect to login
        handleLogout();
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (type, id, status) => {
    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch('/.netlify/functions/admin-update-status', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, id, status }),
      });

      if (response.ok) {
        // Refresh data
        fetchData();
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    navigate('/admin/login');
  };

  const handleSaveBook = async (bookData) => {
    const token = localStorage.getItem('admin_token');
    const isNew = !bookData.id;

    try {
      const endpoint = isNew 
        ? '/.netlify/functions/admin-books-create'
        : '/.netlify/functions/admin-books-update';
      
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        await fetchBooks();
        setShowBookForm(false);
        setEditingBook(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Save book error:', error);
      alert('Failed to save book');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch('/.netlify/functions/admin-books-delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchBooks();
      }
    } catch (error) {
      console.error('Delete book error:', error);
    }
  };

  const handleSaveProject = async (projectData) => {
    const token = localStorage.getItem('admin_token');
    const isNew = !projectData.id;

    try {
      const endpoint = isNew 
        ? '/.netlify/functions/admin-projects-create'
        : '/.netlify/functions/admin-projects-update';
      
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await fetchProjects();
        setShowProjectForm(false);
        setEditingProject(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Save project error:', error);
      alert('Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch('/.netlify/functions/admin-projects-delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchProjects();
      }
    } catch (error) {
      console.error('Delete project error:', error);
    }
  };

  const handleSavePassion = async (passionData) => {
    const token = localStorage.getItem('admin_token');
    const isNew = !passionData.id;

    try {
      const endpoint = isNew 
        ? '/.netlify/functions/admin-passions-create'
        : '/.netlify/functions/admin-passions-update';
      
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passionData),
      });

      if (response.ok) {
        await fetchPassions();
        setShowPassionForm(false);
        setEditingPassion(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Save passion error:', error);
      alert('Failed to save passion');
    }
  };

  const handleDeletePassion = async (id) => {
    if (!confirm('Are you sure you want to delete this passion?')) return;

    const token = localStorage.getItem('admin_token');

    try {
      const response = await fetch('/.netlify/functions/admin-passions-delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchPassions();
      }
    } catch (error) {
      console.error('Delete passion error:', error);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#3498db';
      case 'read': case 'contacted': case 'reviewing': return '#f39c12';
      case 'responded': case 'meeting_scheduled': case 'interview': return '#9b59b6';
      case 'accepted': case 'closed': return '#27ae60';
      case 'rejected': case 'archived': return '#95a5a6';
      default: return '#7f8c8d';
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">⚡</div>
          <h2 className="sidebar-title">Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          {navSections.map((section, idx) => (
            <div key={idx} className="nav-section">
              <div className="nav-section-title">{section.title}</div>
              {section.items.map(item => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setCurrentPage(1);
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="nav-item-badge">{item.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <div className="topbar-title">
              <h2>{navSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || 'Dashboard'}</h2>
              <div className="topbar-breadcrumb">
                <span>Admin</span> / <span>{navSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || 'Dashboard'}</span>
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <span style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>
              {localStorage.getItem('admin_email')}
            </span>
            <button className="topbar-btn logout" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );

  // Helper function to render content based on active tab
  function renderContent() {
    if (activeTab === 'dashboard') {
      return renderDashboardOverview();
    } else if (activeTab === 'contacts') {
      return renderContactsPage();
    } else if (activeTab === 'investments') {
      return renderInvestmentsPage();
    } else if (activeTab === 'applications') {
      return renderApplicationsPage();
    } else if (activeTab === 'books') {
      return renderBooksPage();
    } else if (activeTab === 'projects') {
      return renderProjectsPage();
    } else if (activeTab === 'passions') {
      return renderPassionsPage();
    } else if (activeTab === 'therapist') {
      return renderTherapistPage();
    }
  }

  // Dashboard Overview Page
  function renderDashboardOverview() {
    return (
      <>
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-card-header">
              <div className="stat-icon">
                <Mail size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>Contact Submissions</h3>
              <p className="stat-value">{data.contacts.length}</p>
              <div className="stat-change positive">
                <span>{data.contacts.filter(c => c.status === 'new').length} new</span>
              </div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-card-header">
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>Investment Inquiries</h3>
              <p className="stat-value">{data.investments.length}</p>
              <div className="stat-change positive">
                <span>{data.investments.filter(i => i.status === 'new').length} new</span>
              </div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-card-header">
              <div className="stat-icon">
                <FileText size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>Applications</h3>
              <p className="stat-value">{data.applications.length}</p>
              <div className="stat-change positive">
                <span>{data.applications.filter(a => a.status === 'new').length} new</span>
              </div>
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-card-header">
              <div className="stat-icon">
                <BookOpen size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>Books Library</h3>
              <p className="stat-value">{booksStats.published + booksStats.draft}</p>
              <div className="stat-change">
                <span>{booksStats.published} published</span>
              </div>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-card-header">
              <div className="stat-icon">
                <Code size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>GitHub Projects</h3>
              <p className="stat-value">{projectsStats.published + projectsStats.draft}</p>
              <div className="stat-change">
                <span>{projectsStats.published} published</span>
              </div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-card-header">
              <div className="stat-icon">
                <Lightbulb size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>Passions & Guides</h3>
              <p className="stat-value">{passionsStats.published + passionsStats.draft}</p>
              <div className="stat-change">
                <span>{passionsStats.published} published</span>
              </div>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-card-header">
              <div className="stat-icon">
                <MessageCircle size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>Therapist Sessions</h3>
              <p className="stat-value">{therapistStats.total_sessions}</p>
              <div className="stat-change">
                <span>{therapistStats.total_messages} messages</span>
              </div>
            </div>
          </div>
        </div>

        <div className="data-section">
          <div className="section-header">
            <h3 className="section-title">Quick Actions</h3>
          </div>
          <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Button variant="primary" onClick={() => setActiveTab('books')}>
              <Plus size={18} /> Add New Book
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('projects')}>
              <Plus size={18} /> Add New Project
            </Button>
            <Button variant="primary" onClick={() => setActiveTab('passions')}>
              <Plus size={18} /> Add New Passion
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Contacts Page (keeping original logic)
  function renderContactsPage() {
    return (
      <div className="data-section">
        <div className="section-header">
          <h3 className="section-title">
            <Mail size={24} /> Contact Submissions
          </h3>
          <div className="section-actions">
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        </div>
        
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statuses={['new', 'read', 'responded', 'archived']}
          onClearFilters={clearFilters}
        />
        
        {filteredContacts.length > 0 && (
          <div className="results-count">
            Found <strong>{filteredContacts.length}</strong> contact{filteredContacts.length !== 1 ? 's' : ''}
          </div>
        )}

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData(filteredContacts).map((contact) => (
                <tr key={contact.id}>
                  <td><strong>{contact.name}</strong></td>
                  <td>{contact.email}</td>
                  <td>{contact.phone || '-'}</td>
                  <td style={{ maxWidth: '300px' }}>{contact.message.substring(0, 100)}...</td>
                  <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${contact.status}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusUpdate('contact', contact.id, e.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredContacts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <Mail size={48} />
              </div>
              <h3>No contacts found</h3>
              <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No contact submissions yet.'}</p>
            </div>
          )}
        </div>

        {filteredContacts.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredContacts.length / itemsPerPage)}
            totalItems={filteredContacts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  }

  // Investments Page
  function renderInvestmentsPage() {
    return (
      <div className="data-section">
        <div className="section-header">
          <h3 className="section-title">
            <DollarSign size={24} /> Investment Inquiries
          </h3>
        </div>
        
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statuses={['new', 'contacted', 'in-discussion', 'closed']}
          onClearFilters={clearFilters}
        />
        
        {filteredInvestments.length > 0 && (
          <div className="results-count">
            Found <strong>{filteredInvestments.length}</strong> investment inquir{filteredInvestments.length !== 1 ? 'ies' : 'y'}
          </div>
        )}

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Amount</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData(filteredInvestments).map((investment) => (
                <tr key={investment.id}>
                  <td><strong>{investment.name}</strong></td>
                  <td>{investment.email}</td>
                  <td>{investment.company || '-'}</td>
                  <td>{investment.amount ? `$${parseInt(investment.amount).toLocaleString()}` : '-'}</td>
                  <td style={{ maxWidth: '250px' }}>{investment.message.substring(0, 80)}...</td>
                  <td>{new Date(investment.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${investment.status}`}>
                      {investment.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={investment.status}
                      onChange={(e) => handleStatusUpdate('investment', investment.id, e.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in-discussion">In Discussion</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInvestments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <DollarSign size={48} />
              </div>
              <h3>No investment inquiries found</h3>
              <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No investment inquiries yet.'}</p>
            </div>
          )}
        </div>

        {filteredInvestments.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredInvestments.length / itemsPerPage)}
            totalItems={filteredInvestments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  }

  // Applications Page
  function renderApplicationsPage() {
    return (
      <div className="data-section">
        <div className="section-header">
          <h3 className="section-title">
            <FileText size={24} /> Program Applications
          </h3>
        </div>
        
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statuses={['new', 'reviewing', 'accepted', 'rejected']}
          onClearFilters={clearFilters}
        />
        
        {filteredApplications.length > 0 && (
          <div className="results-count">
            Found <strong>{filteredApplications.length}</strong> application{filteredApplications.length !== 1 ? 's' : ''}
          </div>
        )}

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Location</th>
                <th>Why Apply</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData(filteredApplications).map((app) => (
                <tr key={app.id}>
                  <td><strong>{app.full_name}</strong></td>
                  <td>{app.email}</td>
                  <td>{app.age}</td>
                  <td>{app.city}, {app.country}</td>
                  <td style={{ maxWidth: '300px' }}>{app.why_apply.substring(0, 100)}...</td>
                  <td>{new Date(app.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${app.status}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusUpdate('application', app.id, e.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <FileText size={48} />
              </div>
              <h3>No applications found</h3>
              <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No applications yet.'}</p>
            </div>
          )}
        </div>

        {filteredApplications.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredApplications.length / itemsPerPage)}
            totalItems={filteredApplications.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  }

  // Books Page
  function renderBooksPage() {
    return (
      <div className="data-section">
        <div className="section-header">
          <h3 className="section-title">
            <BookOpen size={24} /> Books Library
          </h3>
          <div className="section-actions">
            <Button variant="primary" onClick={() => { setShowBookForm(true); setEditingBook({ title: '', author: '', rating: 5, tags: [], problems_solved: [], status: 'draft' }); }}>
              <Plus size={18} /> Add New Book
            </Button>
          </div>
        </div>

        {showBookForm && (
          <BookForm
            book={editingBook}
            onSave={handleSaveBook}
            onCancel={() => { setShowBookForm(false); setEditingBook(null); }}
          />
        )}

        {!showBookForm && (
          <>
            <SearchFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              statuses={['published', 'draft']}
              onClearFilters={clearFilters}
            />

            {filteredBooks.length > 0 && (
              <div className="results-count">
                Found <strong>{filteredBooks.length}</strong> book{filteredBooks.length !== 1 ? 's' : ''}
              </div>
            )}

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Rating</th>
                    <th>Tags</th>
                    <th>Date Read</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData(filteredBooks).map((book) => (
                    <tr key={book.id}>
                      <td><strong>{book.title}</strong></td>
                      <td>{book.author}</td>
                      <td>{'⭐'.repeat(book.rating)}</td>
                      <td style={{ maxWidth: '200px' }}>{book.tags?.slice(0, 3).join(', ')}</td>
                      <td>{book.date_read ? new Date(book.date_read).toLocaleDateString() : '-'}</td>
                      <td>
                        <span className={`status-badge ${book.status}`}>
                          {book.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" onClick={() => { setEditingBook(book); setShowBookForm(true); }}>
                            <Edit size={16} />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDeleteBook(book.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBooks.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <BookOpen size={48} />
                  </div>
                  <h3>No books found</h3>
                  <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No books added yet.'}</p>
                  <Button variant="primary" onClick={() => { setShowBookForm(true); setEditingBook({ title: '', author: '', rating: 5, tags: [], problems_solved: [], status: 'draft' }); }}>
                    <Plus size={18} /> Add Your First Book
                  </Button>
                </div>
              )}
            </div>

            {filteredBooks.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredBooks.length / itemsPerPage)}
                totalItems={filteredBooks.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    );
  }

  // Projects Page
  function renderProjectsPage() { return <div className="data-section"><h3>Projects Page - Coming Soon</h3></div>; }
  
  // Passions Page
  function renderPassionsPage() { return <div className="data-section"><h3>Passions Page - Coming Soon</h3></div>; }
  
  // Therapist Page
  function renderTherapistPage() { return <div className="data-section"><h3>Therapist Page - Coming Soon</h3></div>; }
};

export default AdminDashboard;
          </button>
          <button
            className={activeTab === 'investments' ? 'active' : ''}
            onClick={() => setActiveTab('investments')}
          >
            <DollarSign size={18} /> Investments ({data.investments.length})
          </button>
          <button
            className={activeTab === 'applications' ? 'active' : ''}
            onClick={() => setActiveTab('applications')}
          >
            <FileText size={18} /> Applications ({data.applications.length})
          </button>
          <button
            className={activeTab === 'books' ? 'active' : ''}
            onClick={() => setActiveTab('books')}
          >
            <BookOpen size={18} /> Books Library ({books.length})
          </button>
          <button
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => setActiveTab('projects')}
          >
            <Code size={18} /> Projects ({projects.length})
          </button>
          <button
            className={activeTab === 'passions' ? 'active' : ''}
            onClick={() => setActiveTab('passions')}
          >
            <Lightbulb size={18} /> Passions ({passions.length})
          </button>
          <button
            className={activeTab === 'therapist' ? 'active' : ''}
            onClick={() => setActiveTab('therapist')}
          >
            <MessageCircle size={18} /> Therapist ({therapistSessions.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'contacts' && (
            <>
              <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statuses={['new', 'read', 'responded', 'archived']}
                onClearFilters={clearFilters}
              />
              
              {filteredContacts.length > 0 && (
                <div className="results-count">
                  Found {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
                </div>
              )}

              <div className="submissions-list">
                {getPaginatedData(filteredContacts).map((contact) => (
                  <Card key={contact.id} padding="large" className="submission-card">
                    <div className="submission-header">
                      <div>
                        <h3>{contact.name}</h3>
                        <p className="submission-email">{contact.email}</p>
                        {contact.phone && <p className="submission-phone">{contact.phone}</p>}
                      </div>
                      <div className="submission-meta">
                        <span 
                          className="status-badge" 
                          style={{ background: getStatusColor(contact.status) }}
                        >
                          {contact.status}
                        </span>
                        <span className="submission-date">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="submission-body">
                      <p><strong>Message:</strong></p>
                      <p>{contact.message}</p>
                    </div>
                    <div className="submission-actions">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusUpdate('contact', contact.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="responded">Responded</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </Card>
                ))}
                {filteredContacts.length === 0 && (
                  <div className="empty-state-enhanced">
                    <Mail size={80} />
                    <h3>No contacts found</h3>
                    <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No contact submissions yet.'}</p>
                  </div>
                )}
              </div>

              {filteredContacts.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredContacts.length / itemsPerPage)}
                  totalItems={filteredContacts.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {activeTab === 'investments' && (
            <>
              <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statuses={['new', 'contacted', 'meeting_scheduled', 'closed']}
                onClearFilters={clearFilters}
              />
              
              {filteredInvestments.length > 0 && (
                <div className="results-count">
                  Found {filteredInvestments.length} investment inquir{filteredInvestments.length !== 1 ? 'ies' : 'y'}
                </div>
              )}

              <div className="submissions-list">
                {getPaginatedData(filteredInvestments).map((investment) => (
                  <Card key={investment.id} padding="large" className="submission-card">
                    <div className="submission-header">
                      <div>
                        <h3>{investment.name}</h3>
                        <p className="submission-email">{investment.email}</p>
                        {investment.phone && <p className="submission-phone">{investment.phone}</p>}
                        {investment.company && <p className="submission-company">Company: {investment.company}</p>}
                      </div>
                      <div className="submission-meta">
                        <span 
                          className="status-badge" 
                          style={{ background: getStatusColor(investment.status) }}
                        >
                          {investment.status}
                        </span>
                        <span className="submission-date">
                          {new Date(investment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="submission-body">
                      {investment.investment_tier && (
                        <p><strong>Tier:</strong> {investment.investment_tier}</p>
                      )}
                      {investment.investment_amount && (
                        <p><strong>Amount:</strong> {investment.investment_amount}</p>
                      )}
                      {investment.message && (
                        <>
                          <p><strong>Message:</strong></p>
                          <p>{investment.message}</p>
                        </>
                      )}
                    </div>
                    <div className="submission-actions">
                      <select
                        value={investment.status}
                        onChange={(e) => handleStatusUpdate('investment', investment.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="meeting_scheduled">Meeting Scheduled</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </Card>
                ))}
                {filteredInvestments.length === 0 && (
                  <div className="empty-state-enhanced">
                    <DollarSign size={80} />
                    <h3>No investments found</h3>
                    <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No investment inquiries yet.'}</p>
                  </div>
                )}
              </div>

              {filteredInvestments.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredInvestments.length / itemsPerPage)}
                  totalItems={filteredInvestments.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {activeTab === 'applications' && (
            <>
              <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                statuses={['new', 'reviewing', 'interview', 'accepted', 'rejected']}
                onClearFilters={clearFilters}
              />
              
              {filteredApplications.length > 0 && (
                <div className="results-count">
                  Found {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
                </div>
              )}

              <div className="submissions-list">
                {getPaginatedData(filteredApplications).map((application) => (
                  <Card key={application.id} padding="large" className="submission-card">
                    <div className="submission-header">
                      <div>
                        <h3>{application.full_name}</h3>
                        <p className="submission-email">{application.email}</p>
                        <p className="submission-phone">{application.phone}</p>
                      </div>
                      <div className="submission-meta">
                        <span 
                          className="status-badge" 
                          style={{ background: getStatusColor(application.status) }}
                        >
                          {application.status}
                        </span>
                        <span className="submission-date">
                          {new Date(application.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="submission-body">
                      <div className="application-details">
                        <p><strong>DOB:</strong> {new Date(application.date_of_birth).toLocaleDateString()}</p>
                        <p><strong>Education:</strong> {application.education_level}</p>
                        <p><strong>Programming Experience:</strong> {application.programming_experience}</p>
                        <p><strong>Why Apply:</strong></p>
                        <p>{application.why_apply}</p>
                        <p><strong>Goals:</strong></p>
                        <p>{application.goals}</p>
                      </div>
                    </div>
                    <div className="submission-actions">
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusUpdate('application', application.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="interview">Interview</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </Card>
                ))}
                {filteredApplications.length === 0 && (
                  <div className="empty-state-enhanced">
                    <FileText size={80} />
                    <h3>No applications found</h3>
                    <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No applications yet.'}</p>
                  </div>
                )}
              </div>

              {filteredApplications.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredApplications.length / itemsPerPage)}
                  totalItems={filteredApplications.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {activeTab === 'books' && (
            <div className="books-management">
              <div className="books-header">
                <h2>Books Library Management</h2>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setEditingBook({
                      title: '',
                      author: '',
                      cover_image_url: '',
                      rating: 5,
                      tags: [],
                      problems_solved: [],
                      impact: '',
                      key_takeaways: '',
                      date_read: '',
                      goodreads_url: '',
                      amazon_url: '',
                      status: 'draft'
                    });
                    setShowBookForm(true);
                  }}
                >
                  <Plus size={18} /> Add New Book
                </Button>
              </div>

              {showBookForm && (
                <BookForm 
                  book={editingBook}
                  onSave={handleSaveBook}
                  onCancel={() => {
                    setShowBookForm(false);
                    setEditingBook(null);
                  }}
                />
              )}

              {!showBookForm && (
                <>
                  <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    statuses={['published', 'draft']}
                    onClearFilters={clearFilters}
                  />
                  
                  {filteredBooks.length > 0 && (
                    <div className="results-count">
                      Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </>
              )}

              <div className="books-list">
                {getPaginatedData(filteredBooks).map((book) => (
                  <Card key={book.id} padding="large" className="book-card">
                    <div className="book-header">
                      {book.cover_image_url && (
                        <img src={book.cover_image_url} alt={book.title} className="book-cover" />
                      )}
                      <div className="book-info">
                        <h3>{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <div className="book-meta">
                          <span className="book-rating">
                            {'⭐'.repeat(book.rating || 0)}
                          </span>
                          <span 
                            className="status-badge" 
                            style={{ background: book.status === 'published' ? '#27ae60' : '#f39c12' }}
                          >
                            {book.status}
                          </span>
                          {book.date_read && (
                            <span className="book-date">
                              Read: {new Date(book.date_read).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="book-body">
                      {book.tags && book.tags.length > 0 && (
                        <div className="book-tags">
                          {book.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      {book.problems_solved && book.problems_solved.length > 0 && (
                        <div className="book-problems">
                          <strong>Problems Solved:</strong>
                          {book.problems_solved.map((problem, i) => (
                            <span key={i} className="problem-tag">{problem}</span>
                          ))}
                        </div>
                      )}
                      
                      <div className="book-impact">
                        <strong>Impact:</strong>
                        <p>{book.impact}</p>
                      </div>
                      
                      {book.key_takeaways && (
                        <div className="book-takeaways">
                          <strong>Key Takeaways:</strong>
                          <p>{book.key_takeaways}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="book-actions">
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => {
                          setEditingBook(book);
                          setShowBookForm(true);
                        }}
                      >
                        <Edit size={16} /> Edit
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </Button>
                    </div>
                  </Card>
                ))}
                {filteredBooks.length === 0 && !showBookForm && (
                  <div className="empty-state-enhanced">
                    <BookOpen size={80} />
                    <h3>No books found</h3>
                    <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No books yet. Add your first book!'}</p>
                  </div>
                )}
              </div>

              {!showBookForm && filteredBooks.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredBooks.length / itemsPerPage)}
                  totalItems={filteredBooks.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-management">
              <div className="projects-header">
                <h2>GitHub Projects Showcase</h2>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      slug: '',
                      tagline: '',
                      description: '',
                      github_url: '',
                      demo_url: '',
                      image_url: '',
                      tech_stack: [],
                      tags: [],
                      features: [],
                      challenges: '',
                      learnings: '',
                      status: 'active',
                      visibility: 'draft',
                      stars: 0,
                      date_completed: ''
                    });
                    setShowProjectForm(true);
                  }}
                >
                  <Plus size={18} /> Add New Project
                </Button>
              </div>

              {showProjectForm && (
                <ProjectForm 
                  project={editingProject}
                  onSave={handleSaveProject}
                  onCancel={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                  }}
                />
              )}

              {!showProjectForm && (
                <>
                  <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    statuses={['published', 'draft']}
                    onClearFilters={clearFilters}
                  />
                  
                  {filteredProjects.length > 0 && (
                    <div className="results-count">
                      Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </>
              )}

              <div className="projects-list">
                {getPaginatedData(filteredProjects).map((project) => (
                  <Card key={project.id} padding="large" className="project-card">
                    <div className="project-header">
                      {project.image_url && (
                        <img src={project.image_url} alt={project.title} className="project-image" />
                      )}
                      <div className="project-info">
                        <h3>{project.title}</h3>
                        {project.tagline && <p className="project-tagline">{project.tagline}</p>}
                        <div className="project-meta">
                          <span 
                            className="status-badge" 
                            style={{ background: project.visibility === 'published' ? '#27ae60' : '#f39c12' }}
                          >
                            {project.visibility}
                          </span>
                          <span 
                            className="status-badge" 
                            style={{ background: project.status === 'active' ? '#3498db' : '#95a5a6' }}
                          >
                            {project.status}
                          </span>
                          {project.stars > 0 && (
                            <span className="project-stars">⭐ {project.stars}</span>
                          )}
                          {project.date_completed && (
                            <span className="project-date">
                              {new Date(project.date_completed).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="project-body">
                      <div className="project-links-header">
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link-header">
                          <Code size={16} /> GitHub
                        </a>
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-link-header">
                            <ExternalLink size={16} /> Live Demo
                          </a>
                        )}
                      </div>

                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="project-tech">
                          <strong>Tech Stack:</strong>
                          {project.tech_stack.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      )}
                      
                      {project.tags && project.tags.length > 0 && (
                        <div className="project-tags">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      <div className="project-description">
                        <strong>Description:</strong>
                        <p>{project.description}</p>
                      </div>
                      
                      {project.features && project.features.length > 0 && (
                        <div className="project-features">
                          <strong>Key Features:</strong>
                          <ul>
                            {project.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.challenges && (
                        <div className="project-section">
                          <strong>Challenges Faced:</strong>
                          <p>{project.challenges}</p>
                        </div>
                      )}

                      {project.learnings && (
                        <div className="project-section">
                          <strong>What I Learned:</strong>
                          <p>{project.learnings}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="project-actions">
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => {
                          setEditingProject(project);
                          setShowProjectForm(true);
                        }}
                      >
                        <Edit size={16} /> Edit
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </Button>
                    </div>
                  </Card>
                ))}
                {filteredProjects.length === 0 && !showProjectForm && (
                  <div className="empty-state-enhanced">
                    <Code size={80} />
                    <h3>No projects found</h3>
                    <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No projects yet. Add your first project!'}</p>
                  </div>
                )}
              </div>

              {!showProjectForm && filteredProjects.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredProjects.length / itemsPerPage)}
                  totalItems={filteredProjects.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          )}

          {activeTab === 'passions' && (
            <div className="passions-management">
              <div className="passions-header">
                <h2>Passions & Guides Management</h2>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setEditingPassion({
                      title: '',
                      slug: '',
                      subtitle: '',
                      category: '',
                      icon_emoji: '',
                      markdown_content: '',
                      excerpt: '',
                      cover_image_url: '',
                      tags: [],
                      reading_time: 5,
                      status: 'draft',
                      date_published: ''
                    });
                    setShowPassionForm(true);
                  }}
                >
                  <Plus size={18} /> Add New Passion
                </Button>
              </div>

              {showPassionForm && (
                <PassionForm 
                  passion={editingPassion}
                  onSave={handleSavePassion}
                  onCancel={() => {
                    setShowPassionForm(false);
                    setEditingPassion(null);
                  }}
                />
              )}

              {!showPassionForm && (
                <>
                  <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    statuses={['published', 'draft']}
                    onClearFilters={clearFilters}
                  />
                  
                  {filteredPassions.length > 0 && (
                    <div className="results-count">
                      Found {filteredPassions.length} passion{filteredPassions.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </>
              )}

              <div className="passions-list">
                {getPaginatedData(filteredPassions).map((passion) => (
                  <Card key={passion.id} padding="large" className="passion-card">
                    <div className="passion-header">
                      {passion.cover_image_url && (
                        <img src={passion.cover_image_url} alt={passion.title} className="passion-cover" />
                      )}
                      <div className="passion-info">
                        <h3>
                          {passion.icon_emoji && <span className="passion-emoji">{passion.icon_emoji}</span>}
                          {passion.title}
                        </h3>
                        {passion.subtitle && <p className="passion-subtitle">{passion.subtitle}</p>}
                        <div className="passion-meta">
                          <span 
                            className="status-badge" 
                            style={{ background: passion.status === 'published' ? '#27ae60' : '#f39c12' }}
                          >
                            {passion.status}
                          </span>
                          {passion.category && (
                            <span className="passion-category">{passion.category}</span>
                          )}
                          {passion.reading_time && (
                            <span className="passion-reading-time">📖 {passion.reading_time} min</span>
                          )}
                          {passion.view_count > 0 && (
                            <span className="passion-views">👁️ {passion.view_count} views</span>
                          )}
                          {passion.date_published && (
                            <span className="passion-date">
                              {new Date(passion.date_published).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="passion-body">
                      {passion.tags && passion.tags.length > 0 && (
                        <div className="passion-tags">
                          {passion.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      {passion.excerpt && (
                        <div className="passion-excerpt">
                          <strong>Excerpt:</strong>
                          <p>{passion.excerpt}</p>
                        </div>
                      )}
                      
                      <div className="passion-content-preview">
                        <strong>Content Preview:</strong>
                        <p className="markdown-preview">{passion.markdown_content.substring(0, 300)}...</p>
                      </div>
                    </div>
                    
                    <div className="passion-actions">
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => {
                          setEditingPassion(passion);
                          setShowPassionForm(true);
                        }}
                      >
                        <Edit size={16} /> Edit
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => handleDeletePassion(passion.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </Button>
                    </div>
                  </Card>
                ))}
                {filteredPassions.length === 0 && !showPassionForm && (
                  <div className="empty-state-enhanced">
                    <Lightbulb size={80} />
                    <h3>No passions found</h3>
                    <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No passions yet. Add your first guide!'}</p>
                  </div>
                )}
              </div>

              {!showPassionForm && filteredPassions.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredPassions.length / itemsPerPage)}
                  totalItems={filteredPassions.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          )}

          {activeTab === 'therapist' && (
            <div className="therapist-management">
              <div className="therapist-header">
                <h2>Therapist Sessions</h2>
                <div className="therapist-stats-summary">
                  <span>📊 Total: {therapistStats.total_sessions}</span>
                  <span>💬 Messages: {therapistStats.total_messages}</span>
                  <span>📅 This Week: {therapistStats.sessions_this_week}</span>
                </div>
              </div>

              {selectedSession ? (
                <div className="session-detail-view">
                  <div className="session-detail-header">
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => {
                        setSelectedSession(null);
                        setSessionMessages([]);
                      }}
                    >
                      ← Back to Sessions
                    </Button>
                    <div className="session-detail-info">
                      <h3>🛋️ {selectedSession.chat_name}</h3>
                      <p>User: <strong>{selectedSession.username}</strong></p>
                      <p>Started: {new Date(selectedSession.session_start).toLocaleString()}</p>
                    </div>
                  </div>

                  <Card padding="large" className="session-messages-card">
                    <div className="session-messages-list">
                      {sessionMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`therapist-message ${msg.sender === 'user' ? 'therapist-message-user' : 'therapist-message-therapist'}`}
                        >
                          <div className="therapist-message-header">
                            <span className="therapist-message-sender">
                              {msg.sender === 'user' ? <User size={16} /> : '🧠'} 
                              {msg.sender === 'user' ? selectedSession.username : 'Dr. Therapist'}
                            </span>
                            <span className="therapist-message-time">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="therapist-message-text">{msg.message}</p>
                        </div>
                      ))}
                      {sessionMessages.length === 0 && (
                        <p className="empty-state">No messages in this session yet.</p>
                      )}
                    </div>
                  </Card>
                </div>
              ) : (
                <>
                  <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    statuses={['active', 'inactive']}
                    onClearFilters={clearFilters}
                  />
                  
                  {filteredTherapistSessions.length > 0 && (
                    <div className="results-count">
                      Found {filteredTherapistSessions.length} session{filteredTherapistSessions.length !== 1 ? 's' : ''}
                    </div>
                  )}

                  <div className="therapist-sessions-list">
                    {getPaginatedData(filteredTherapistSessions).map((session) => (
                    <Card key={session.id} padding="large" className="therapist-session-card">
                      <div className="therapist-session-header">
                        <div>
                          <h3>
                            <MessageCircle size={20} /> {session.chat_name}
                          </h3>
                          <p className="session-user">
                            <User size={16} /> <strong>{session.username}</strong>
                          </p>
                        </div>
                        <div className="therapist-session-meta">
                          <span 
                            className="status-badge" 
                            style={{ background: session.status === 'active' ? '#27ae60' : '#95a5a6' }}
                          >
                            {session.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="therapist-session-body">
                        <div className="therapist-session-stats">
                          <span>💬 {session.message_count} messages</span>
                          <span>🕐 Started: {new Date(session.session_start).toLocaleDateString()}</span>
                          <span>🕐 Last activity: {new Date(session.last_activity).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="therapist-session-actions">
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={() => fetchSessionMessages(session.id)}
                        >
                          <Eye size={16} /> View Conversation
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {filteredTherapistSessions.length === 0 && (
                    <div className="empty-state-enhanced">
                      <MessageCircle size={80} />
                      <h3>No sessions found</h3>
                      <p>{searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'No therapist sessions yet.'}</p>
                    </div>
                  )}
                </div>

                {filteredTherapistSessions.length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredTherapistSessions.length / itemsPerPage)}
                    totalItems={filteredTherapistSessions.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

