import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  padding = 'default'
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hover ? { y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {}
  };

  return (
    <motion.div
      className={`card card-padding-${padding} ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;

