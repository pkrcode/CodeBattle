import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Shield, 
  Bell, 
  Palette,
  Save,
  RefreshCw
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true,
    autoBackup: true,
    debugMode: false,
    maxUsersPerPage: 50,
    sessionTimeout: 30
  });

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading admin settings...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!adminUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // Settings saved successfully
    console.log('Settings saved:', settings);
    // In a real implementation, this would save to Firebase
  };

  const resetSettings = () => {
    setSettings({
      maintenanceMode: false,
      emailNotifications: true,
      autoBackup: true,
      debugMode: false,
      maxUsersPerPage: 50,
      sessionTimeout: 30
    });
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center space-y-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          <h1 className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Admin Settings{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>⚙️</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Configure system settings and preferences
          </p>
        </motion.div>

        {/* Settings Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* System Settings */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  System Settings
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Core system configuration
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Maintenance Mode
                  </label>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>
                    Temporarily disable user access
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.maintenanceMode 
                      ? 'bg-red-600' 
                      : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Debug Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Debug Mode
                  </label>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>
                    Enable detailed logging
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('debugMode', !settings.debugMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.debugMode 
                      ? 'bg-yellow-600' 
                      : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.debugMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Auto Backup */}
              <div className="flex items-center justify-between">
                <div>
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Auto Backup
                  </label>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>
                    Daily database backups
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoBackup', !settings.autoBackup)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoBackup 
                      ? 'bg-green-600' 
                      : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className={`p-6 rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Notifications
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Email and system alerts
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Email Notifications
                  </label>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                  }`}>
                    System alerts and reports
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications 
                      ? 'bg-green-600' 
                      : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Session Timeout */}
              <div>
                <label className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  Session Timeout (minutes)
                </label>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>

              {/* Max Users Per Page */}
              <div>
                <label className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                }`}>
                  Users Per Page
                </label>
                <select
                  value={settings.maxUsersPerPage}
                  onChange={(e) => handleSettingChange('maxUsersPerPage', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value={25}>25 users</option>
                  <option value={50}>50 users</option>
                  <option value={100}>100 users</option>
                  <option value={200}>200 users</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <Palette className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Appearance
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
              }`}>
                Theme and display preferences
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
              }`}>
                Theme Mode
              </label>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
              }`}>
                Current: {theme === 'dark' ? 'Dark' : 'Light'} mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4"
        >
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>Save Settings</span>
          </button>
          <button
            onClick={resetSettings}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Reset to Default</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;
