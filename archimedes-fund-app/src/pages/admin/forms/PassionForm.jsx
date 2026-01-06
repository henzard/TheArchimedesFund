import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

/**
 * PassionForm Component
 * 
 * Form for creating and editing passion/guide content
 */
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

export default PassionForm;
