import './ResultsCount.css';

/**
 * ResultsCount Component
 * 
 * Displays the number of filtered results
 * 
 * @param {number} count - Number of results found
 * @param {string} label - Label for the items (e.g., 'contact', 'book')
 */
const ResultsCount = ({ count, label = 'result' }) => {
  if (count === 0) return null;

  const pluralLabel = count === 1 ? label : `${label}s`;
  
  return (
    <div className="results-count">
      Found {count} {pluralLabel}
    </div>
  );
};

export default ResultsCount;
