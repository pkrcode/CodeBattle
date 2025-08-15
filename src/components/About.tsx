import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Code, Users, Trophy, Zap, Heart, Github, Mail, Globe } from 'lucide-react';

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-900/50 border-slate-700' : 'bg-gray-50 border-gray-200'} border-t mt-8`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            About CodeBattle
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            A competitive programming platform designed to help developers improve their coding skills through 
            real-time challenges, battles, and collaborative learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <Code className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Real Code Execution
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Write and run code in multiple languages with instant feedback and validation.
            </p>
          </div>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
            }`}>
              <Users className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Competitive Battles
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Challenge other developers in real-time coding battles and climb the leaderboards.
            </p>
          </div>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
            }`}>
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Achievements & Rewards
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Earn XP, unlock achievements, and compete for seasonal rewards and recognition.
            </p>
          </div>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
            }`}>
              <Zap className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Multi-Language Support
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Code in Python, C++, JavaScript, Java, and more with full IDE-like experience.
            </p>
          </div>
        </div>

        <div className={`border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4 md:mb-0`}>
              <p>© 2024 CodeBattle. Built with <Heart className="inline w-4 h-4 text-red-500" /> for the coding community.</p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a 
                href="mailto:contact@codebattle.com" 
                className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                <Mail className="w-5 h-5" />
                <span>Contact</span>
              </a>
              <a 
                href="https://codebattle.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                <Globe className="w-5 h-5" />
                <span>Website</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
