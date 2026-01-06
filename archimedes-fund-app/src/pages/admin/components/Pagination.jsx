import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

/**
 * Pagination Component
 * 
 * Provides pagination controls with page numbers and navigation
 * 
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Items shown per page
 * @param {function} onPageChange - Handler for page changes
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
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
            return <span key={pageNum} className="pagination-ellipsis">...</span>;
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

export default Pagination;
