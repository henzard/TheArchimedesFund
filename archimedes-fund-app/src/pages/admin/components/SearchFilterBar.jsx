import { Search } from 'lucide-react';
import './SearchFilterBar.css';

/**
 * SearchFilterBar Component
 * 
 * Provides search and filter functionality for admin sections
 * 
 * @param {string} searchTerm - Current search term
 * @param {function} onSearchChange - Handler for search input changes
 * @param {string} statusFilter - Current status filter value
 * @param {function} onStatusChange - Handler for status filter changes
 * @param {string[]} statuses - Array of available status options
 * @param {function} onClearFilters - Handler to clear all filters
 */
const SearchFilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  statuses, 
  onClearFilters 
}) => {
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
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </option>
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

export default SearchFilterBar;
