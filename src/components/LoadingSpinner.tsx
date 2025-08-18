import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Code, Sparkles } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-500/20 to-success-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-warning-500/10 to-error-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main loading animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-slate-200 dark:border-slate-700 rounded-full relative"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-20"></div>
          </motion.div>

          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-4 border-transparent rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-border"
            style={{
              background: 'conic-gradient(from 0deg, #0ea5e9, #d946ef, #f97316, #0ea5e9)',
              WebkitMask: 'radial-gradient(circle at center, transparent 60%, black 60%)',
              mask: 'radial-gradient(circle at center, transparent 60%, black 60%)'
            }}
          ></motion.div>

          {/* Center icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-secondary-500" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold gradient-text-primary mb-2">
            Loading CodeBattle
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Preparing your coding arena...
          </p>
        </motion.div>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center space-x-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            />
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="mt-6 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full max-w-xs mx-auto"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-sm"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner; 