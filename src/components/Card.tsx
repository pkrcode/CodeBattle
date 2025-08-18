import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'bordered';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick,
  hover = true,
  animation = 'fade',
  delay = 0
}) => {
  const { theme } = useTheme();

  const baseClasses = "rounded-2xl transition-all duration-300";
  
  const variantClasses = {
    default: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-soft hover:shadow-medium`,
    glass: `backdrop-blur-md bg-white/10 dark:bg-slate-900/10 border border-white/20 dark:border-slate-700/20 shadow-soft`,
    gradient: `bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft`,
    elevated: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-large hover:shadow-xl`,
    bordered: `bg-white dark:bg-slate-900 border-2 border-primary-200 dark:border-primary-700 shadow-soft`
  };

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:-translate-y-1' : '';
  
  const animationVariants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    slide: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    none: {
      hidden: { opacity: 1 },
      visible: { opacity: 1 }
    }
  };

  const cardContent = (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );

  if (animation === 'none') {
    return onClick ? (
      <button onClick={onClick} className="w-full text-left">
        {cardContent}
      </button>
    ) : cardContent;
  }

  return (
    <motion.div
      variants={animationVariants[animation]}
      initial="hidden"
      animate="visible"
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut"
      }}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={onClick ? 'cursor-pointer' : ''}
    >
      {cardContent}
    </motion.div>
  );
};

// Specialized card components
export const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient?: string;
  trend?: { value: number; positive: boolean };
}> = ({ title, value, subtitle, icon, gradient = 'from-primary-500 to-primary-600', trend }) => {
  return (
    <Card variant="elevated" className="p-6 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{title}</p>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</div>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${
              trend.positive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
            }`}>
              <span>{trend.positive ? '↗' : '↘'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient?: string;
  action?: React.ReactNode;
}> = ({ title, description, icon, gradient = 'from-primary-500 to-primary-600', action }) => {
  return (
    <Card variant="default" className="p-6 group">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">{description}</p>
      {action && (
        <div className="mt-auto">
          {action}
        </div>
      )}
    </Card>
  );
};

export const ActionCard: React.FC<{
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradient?: string;
  onClick?: () => void;
}> = ({ title, subtitle, icon, gradient = 'from-primary-500 to-primary-600', onClick }) => {
  return (
    <Card 
      variant="gradient" 
      className="p-6 cursor-pointer group"
      onClick={onClick}
      hover={true}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <Card variant="glass" className={className}>
      {children}
    </Card>
  );
};

export default Card;
