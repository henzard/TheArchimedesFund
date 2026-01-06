import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, DollarSign, FileText, BookOpen, Plus, Edit, Trash2, Code, ExternalLink, Heart, Eye, Lightbulb, MessageCircle, User } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './AdminDashboard.css';

// Import refactored components
import { SearchFilterBar, Pagination, EmptyState, ResultsCount } from './admin/components';
import { BookForm, ProjectForm, PassionForm } from './admin/forms';
import { useSearchFilter, usePagination } from './admin/hooks';
import adminApi from './admin/services/adminApi';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  
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

          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#16a085' }}>
              <Code size={24} />
            </div>
            <div className="stat-content">
              <h3>GitHub Projects</h3>
              <p className="stat-number">{projectsStats.published + projectsStats.draft}</p>
              <p className="stat-detail">
                {projectsStats.published} published, {projectsStats.draft} drafts
              </p>
            </div>
          </Card>

          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#f39c12' }}>
              <Lightbulb size={24} />
            </div>
            <div className="stat-content">
              <h3>Passions & Guides</h3>
              <p className="stat-number">{passionsStats.published + passionsStats.draft}</p>
              <p className="stat-detail">
                {passionsStats.published} published, {passionsStats.draft} drafts
              </p>
            </div>
          </Card>

          <Card padding="large" className="stat-card">
            <div className="stat-icon" style={{ background: '#8e44ad' }}>
              <MessageCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>Therapist Sessions</h3>
              <p className="stat-number">{therapistStats.total_sessions}</p>
              <p className="stat-detail">
                {therapistStats.total_messages} messages, {therapistStats.sessions_this_week} this week
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

