import { useState, useMemo, useEffect } from 'react';

/**
 * useSearchFilter Hook
 * 
 * Provides search and filter functionality for admin data
 * 
 * @param {Array} data - Array of items to filter
 * @param {string[]} searchFields - Fields to search in (e.g., ['name', 'email'])
 * @param {string} statusField - Field name for status filtering (default: 'status' or 'visibility')
 * @returns {Object} Filtered data and filter controls
 */
const useSearchFilter = (data = [], searchFields = [], statusField = 'status') => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Reset filters when data changes significantly
  useEffect(() => {
    if (!data || data.length === 0) {
      setSearchTerm('');
      setStatusFilter('all');
    }
  }, [data]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!data) return [];
    
    let filtered = [...data];
    
    // Apply search filter
    if (searchTerm && searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        searchFields.some(field => {
          const value = getNestedValue(item, field);
          if (value === null || value === undefined) return false;
          
          // Handle arrays (like tags)
          if (Array.isArray(value)) {
            return value.some(v => 
              String(v).toLowerCase().includes(lowerSearchTerm)
            );
          }
          
          // Handle regular values
          return String(value).toLowerCase().includes(lowerSearchTerm);
        })
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        // Check both 'status' and 'visibility' fields
        const itemStatus = item[statusField] || item.status || item.visibility;
        return itemStatus === statusFilter;
      });
    }
    
    return filtered;
  }, [data, searchTerm, statusFilter, searchFields, statusField]);

  // Helper to get nested values (e.g., 'user.name')
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all';

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    clearFilters,
    hasActiveFilters,
    resultCount: filteredData.length,
    totalCount: data?.length || 0,
  };
};

export default useSearchFilter;
