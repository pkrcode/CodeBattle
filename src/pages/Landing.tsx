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
  Shield
} from 'lucide-react';

const Landing: React.FC = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Sword,
      title: 'Epic Battles',
      description: 'Challenge other coders in real-time 1v1 battles',
      color: 'text-red-500'
    },
    {
      icon: Code,
      title: '100+ Problems',
      description: 'Curated coding problems from easy to expert level',
      color: 'text-blue-500'
    },
    {
      icon: Trophy,
      title: 'Leaderboards',
      description: 'Compete for top rankings and earn rewards',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: 'Social Features',
      description: 'Add friends, share achievements, and build your network',
      color: 'text-green-500'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Unlock badges and track your progress',
      color: 'text-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Detailed insights into your coding performance',
      color: 'text-indigo-500'
    }
  ];

  const stats = [
    { number: '100+', label: 'Coding Problems', icon: Code, color: 'text-blue-500' },
    { number: '24/7', label: 'Active Battles', icon: Sword, color: 'text-red-500' },
    { number: '1000+', label: 'Active Users', icon: Users, color: 'text-green-500' },
    { number: '50+', label: 'Achievements', icon: Award, color: 'text-purple-500' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white'
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 text-slate-900'
    }`}>
      {/* Navigation */}
      <nav className={`px-6 py-4 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="CodeBattle" className="h-8 w-8" />
            <span className="text-xl font-bold">CodeBattle</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark' 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              Login
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className={`text-5xl md:text-7xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Master Coding Through
              <span className="text-primary-600"> Battle</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Join thousands of developers in epic coding battles. Solve problems, 
              challenge opponents, and climb the leaderboards in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Start Battling</span>
              </Link>
              <Link
                to="/problems"
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                <Code className="h-5 w-5" />
                <span>Browse Problems</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'
                } backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Why Choose CodeBattle?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Everything you need to become a coding champion
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'
                } backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} hover:shadow-lg transition-all duration-300`}
              >
                <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`p-12 rounded-2xl ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'
            } backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Ready to Join the Battle?
            </h2>
            <p className={`text-lg mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              Create your account and start your coding journey today
            </p>
            <Link
              to="/login"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2"
            >
              <Shield className="h-5 w-5" />
              <span>Create Account</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-8 border-t ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white/50'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            © 2024 CodeBattle. Built with ❤️ for the coding community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
