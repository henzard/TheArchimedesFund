import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

/**
 * ProjectForm Component
 * 
 * Form for creating and editing projects
 */
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

export default ProjectForm;
