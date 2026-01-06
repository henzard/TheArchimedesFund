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
