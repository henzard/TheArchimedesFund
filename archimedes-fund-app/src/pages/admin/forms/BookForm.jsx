import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

/**
 * BookForm Component
 * 
 * Form for creating and editing books
 */
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

export default BookForm;
