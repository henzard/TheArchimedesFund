import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, DollarSign, FileText, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
  }, [navigate]);

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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

