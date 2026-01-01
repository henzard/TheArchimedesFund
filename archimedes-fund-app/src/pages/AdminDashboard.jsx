import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, DollarSign, FileText, BookOpen, Plus, Edit, Trash2, Save, X } from 'lucide-react';
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


const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  const [books, setBooks] = useState([]);
  const [booksStats, setBooksStats] = useState({ published: 0, draft: 0 });
  const [editingBook, setEditingBook] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
    fetchBooks();
  }, [navigate]);

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
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome, {localStorage.getItem('admin_email')}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#3498db' }}>
              <Mail size={24} />
            </div>
            <div className="stat-content">
              <h3>Contact Submissions</h3>
              <p className="stat-number">{data.contacts.length}</p>
              <p className="stat-detail">
                {data.contacts.filter(c => c.status === 'new').length} new
              </p>
            </div>
          </Card>

          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#27ae60' }}>
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>Investment Inquiries</h3>
              <p className="stat-number">{data.investments.length}</p>
              <p className="stat-detail">
                {data.investments.filter(i => i.status === 'new').length} new
              </p>
            </div>
          </Card>

          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#e74c3c' }}>
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <h3>Applications</h3>
              <p className="stat-number">{data.applications.length}</p>
              <p className="stat-detail">
                {data.applications.filter(a => a.status === 'new').length} new
              </p>
            </div>
          </Card>

          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#9b59b6' }}>
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <h3>Books Library</h3>
              <p className="stat-number">{booksStats.published + booksStats.draft}</p>
              <p className="stat-detail">
                {booksStats.published} published, {booksStats.draft} drafts
              </p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={activeTab === 'contacts' ? 'active' : ''}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={18} /> Contact Forms ({data.contacts.length})
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
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'contacts' && (
            <div className="submissions-list">
              {data.contacts.map((contact) => (
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
              {data.contacts.length === 0 && (
                <p className="empty-state">No contact submissions yet.</p>
              )}
            </div>
          )}

          {activeTab === 'investments' && (
            <div className="submissions-list">
              {data.investments.map((investment) => (
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
              {data.investments.length === 0 && (
                <p className="empty-state">No investment inquiries yet.</p>
              )}
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="submissions-list">
              {data.applications.map((application) => (
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
              {data.applications.length === 0 && (
                <p className="empty-state">No applications yet.</p>
              )}
            </div>
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

              <div className="books-list">
                {books.map((book) => (
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
                {books.length === 0 && (
                  <p className="empty-state">No books yet. Add your first book!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

