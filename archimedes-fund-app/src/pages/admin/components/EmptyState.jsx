import './EmptyState.css';

/**
 * EmptyState Component
 * 
 * Displays an elegant empty state with icon and message
 * 
 * @param {React.Component} icon - Icon component to display
 * @param {string} title - Main heading text
 * @param {string} message - Description/help text
 * @param {React.Component} action - Optional action button
 */
const EmptyState = ({ icon, title, message, action }) => {
  return (
    <div className="empty-state-enhanced">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
