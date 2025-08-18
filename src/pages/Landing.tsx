import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Trophy, 
  Users, 
  Award,
  Play,
  Code,
  Sword,
  BarChart3,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Landing: React.FC = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Sword,
      title: 'Epic Battles',
      description: 'Challenge other coders in real-time 1v1 battles with live code execution',
      color: 'text-error-500',
      gradient: 'from-error-500 to-error-600',
      delay: 0.1
    },
    {
      icon: Code,
      title: '100+ Problems',
      description: 'Curated coding problems from easy to expert level with detailed solutions',
      color: 'text-primary-500',
      gradient: 'from-primary-500 to-primary-600',
      delay: 0.2
    },
    {
      icon: Trophy,
      title: 'Leaderboards',
      description: 'Compete for top rankings and earn exclusive rewards and titles',
      color: 'text-warning-500',
      gradient: 'from-warning-500 to-warning-600',
      delay: 0.3
    },
    {
      icon: Users,
      title: 'Social Features',
      description: 'Add friends, share achievements, and build your coding network',
      color: 'text-success-500',
      gradient: 'from-success-500 to-success-600',
      delay: 0.4
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Unlock badges and track your progress with detailed analytics',
      color: 'text-secondary-500',
      gradient: 'from-secondary-500 to-secondary-600',
      delay: 0.5
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Detailed insights into your coding performance and improvement areas',
      color: 'text-accent-500',
      gradient: 'from-accent-500 to-accent-600',
      delay: 0.6
    }
  ];

  const stats = [
    { number: '100+', label: 'Coding Problems', icon: Code, color: 'text-primary-500', gradient: 'from-primary-500 to-primary-600' },
    { number: '24/7', label: 'Active Battles', icon: Sword, color: 'text-error-500', gradient: 'from-error-500 to-error-600' },
    { number: '1000+', label: 'Active Users', icon: Users, color: 'text-success-500', gradient: 'from-success-500 to-success-600' },
    { number: '50+', label: 'Achievements', icon: Award, color: 'text-secondary-500', gradient: 'from-secondary-500 to-secondary-600' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white'
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-slate-900'
    }`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-500/20 to-success-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-warning-500/10 to-error-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`px-6 py-4 relative z-10 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-md border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <img src="/logo.svg" alt="CodeBattle" className="h-10 w-10" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-20 animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold gradient-text-primary">CodeBattle</span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                }`}
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 border border-primary-200 dark:border-primary-700 mb-6">
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Join 1000+ developers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text-primary">Code</span>
              <span className="gradient-text-secondary">Battle</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for competitive coding. Battle other developers, solve challenging problems, and climb the leaderboards in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center space-x-3 group"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Battling</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/problems"
                  className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3"
                >
                  <Code className="w-5 h-5" />
                  <span>Browse Problems</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-3xl font-bold gradient-text mb-2`} style={{ background: `linear-gradient(135deg, ${stat.color.replace('text-', '').split('-')[0] === 'primary' ? '#0ea5e9' : stat.color.replace('text-', '').split('-')[0] === 'secondary' ? '#d946ef' : stat.color.replace('text-', '').split('-')[0] === 'success' ? '#22c55e' : stat.color.replace('text-', '').split('-')[0] === 'error' ? '#ef4444' : '#f59e0b'}, ${stat.color.replace('text-', '').split('-')[0] === 'primary' ? '#3b82f6' : stat.color.replace('text-', '').split('-')[0] === 'secondary' ? '#a855f7' : stat.color.replace('text-', '').split('-')[0] === 'success' ? '#16a34a' : stat.color.replace('text-', '').split('-')[0] === 'error' ? '#dc2626' : '#d97706'})` }}>
                  {stat.number}
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text-primary">CodeBattle</span>?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience the future of competitive coding with our cutting-edge features and seamless user experience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-soft hover:shadow-large transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Coding Journey?</h2>
              <p className="text-xl mb-8 text-primary-100">Join thousands of developers and start competing today!</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-12 relative z-10 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-md border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/logo.svg" alt="CodeBattle" className="h-8 w-8" />
            <span className="text-xl font-bold gradient-text-primary">CodeBattle</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            © 2024 CodeBattle. All rights reserved. Made with ❤️ for developers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
