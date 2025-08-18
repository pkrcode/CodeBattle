import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  Users,
  Trophy,
  X,
  Save
} from 'lucide-react';
import { Event } from '../types';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminEvents: React.FC = () => {
  const { theme } = useTheme();
  const { adminUser, loading: adminLoading } = useAdminAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [botUserIds, setBotUserIds] = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'tournament',
    startDate: new Date(),
    endDate: new Date(),
    registrationDeadline: new Date(),
    maxParticipants: 100,
    participants: [],
    rewards: [],
    rules: [],
    isActive: true,
    isRegistrationOpen: true,
    createdBy: 'admin',
  });

  // Real-time subscriptions: users (to detect bots) and events
  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      const bots = new Set<string>();
      snap.forEach((doc) => {
        const data: any = doc.data();
        if (data?.isBot) bots.add(doc.id);
      });
      setBotUserIds(bots);
    });

    const unsubEvents = onSnapshot(collection(db, 'events'), (snap) => {
      const evts: Event[] = [];
      snap.forEach((docu) => {
        const d: any = docu.data();
        evts.push({
          id: docu.id,
          title: d.title,
          description: d.description,
          type: d.type,
          startDate: d.startDate?.toDate?.() || new Date(),
          endDate: d.endDate?.toDate?.() || new Date(),
          registrationDeadline: d.registrationDeadline?.toDate?.() || new Date(),
          maxParticipants: d.maxParticipants ?? 0,
          participants: Array.isArray(d.participants) ? d.participants : [],
          rewards: Array.isArray(d.rewards) ? d.rewards : [],
          rules: Array.isArray(d.rules) ? d.rules : [],
          isActive: !!d.isActive,
          isRegistrationOpen: !!d.isRegistrationOpen,
          createdBy: d.createdBy || 'admin',
          createdAt: d.createdAt?.toDate?.() || new Date(),
          updatedAt: d.updatedAt?.toDate?.() || new Date(),
          banner: d.banner,
        });
      });
      setEvents(evts);
    });

    return () => {
      unsubUsers();
      unsubEvents();
    };
  }, []);

  const countHumanParticipants = (event: Event) => {
    const list = event.participants || [];
    if (!list.length) return 0;
    return list.filter((uid) => !botUserIds.has(uid)).length;
  };

  // Show loading if admin context is still loading
  if (adminLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-slate-900'} mx-auto mb-4`}></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loading admin events...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!adminUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tournament': return 'text-purple-400';
      case 'workshop': return 'text-blue-400';
      case 'challenge': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getEventStatus = (event: Event) => {
    const now = new Date();
    if (now < event.startDate) return 'upcoming';
    if (now >= event.startDate && now <= event.endDate) return 'ongoing';
    return 'completed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400';
      case 'ongoing': return 'text-green-400';
      case 'completed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent({ ...event });
    setShowEditModal(true);
  };

  const handleSaveEvent = async () => {
    if (!editingEvent) return;
    try {
      const ref = doc(db, 'events', editingEvent.id);
      await updateDoc(ref, {
        title: editingEvent.title,
        description: editingEvent.description,
        type: editingEvent.type,
        startDate: editingEvent.startDate,
        endDate: editingEvent.endDate,
        registrationDeadline: editingEvent.registrationDeadline,
        maxParticipants: editingEvent.maxParticipants,
        rewards: editingEvent.rewards,
        rules: editingEvent.rules,
        isActive: editingEvent.isActive,
        isRegistrationOpen: editingEvent.isRegistrationOpen,
        updatedAt: new Date(),
      });
      setShowEditModal(false);
      setEditingEvent(null);
    } catch (e) {
      console.error('Failed to update event', e);
      alert('Failed to save event changes.');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingEvent(null);
  };

  const handleInputChange = (field: keyof Event, value: any) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [field]: value });
    }
  };

  const openAddEvent = () => {
    setNewEvent({
      title: '',
      description: '',
      type: 'tournament',
      startDate: new Date(),
      endDate: new Date(),
      registrationDeadline: new Date(),
      maxParticipants: 100,
      participants: [],
      rewards: [],
      rules: [],
      isActive: true,
      isRegistrationOpen: true,
      createdBy: adminUser?.uid || 'admin',
    });
    setShowAddModal(true);
  };

  const handleNewEventChange = (field: keyof Event, value: any) => {
    setNewEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateEvent = async () => {
    try {
      const payload: any = {
        title: newEvent.title || '',
        description: newEvent.description || '',
        type: newEvent.type || 'tournament',
        startDate: newEvent.startDate || new Date(),
        endDate: newEvent.endDate || new Date(),
        registrationDeadline: newEvent.registrationDeadline || new Date(),
        maxParticipants: newEvent.maxParticipants || 0,
        participants: newEvent.participants || [],
        rewards: newEvent.rewards || [],
        rules: newEvent.rules || [],
        isActive: newEvent.isActive ?? true,
        isRegistrationOpen: newEvent.isRegistrationOpen ?? true,
        createdBy: newEvent.createdBy || (adminUser?.uid || 'admin'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, 'events'), payload);
      setShowAddModal(false);
    } catch (e) {
      console.error('Failed to create event', e);
      alert('Failed to create event.');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await deleteDoc(doc(db, 'events', eventId));
    } catch (e) {
      console.error('Failed to delete event', e);
      alert('Failed to delete event.');
    }
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
            Event Management{' '}
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>🏆</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Create, edit, and manage events and tournaments
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{events.length}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Events</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {events.reduce((total, event) => total + countHumanParticipants(event), 0)}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Participants</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {events.filter(e => getEventStatus(e) === 'ongoing').length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Events</div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {events.filter(e => getEventStatus(e) === 'upcoming').length}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Upcoming Events</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl border backdrop-blur-sm ${
            theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200'
          } overflow-hidden`}
        >
          <div className={`p-6 border-b ${
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold flex items-center ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Event Management
              </h2>
              <button onClick={openAddEvent} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Event
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Type
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Participants
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200'
              }`}>
                {events.map((event) => (
                  <tr key={event.id} className={`transition-colors duration-200 ${
                    theme === 'dark' ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'
                  }`}>
                    <td className="px-6 py-4">
                      <div>
                        <div className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>{event.title}</div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                        }`}>{event.description}</div>
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                        }`}>
                          {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getEventStatus(event))}`}>
                        {getEventStatus(event).charAt(0).toUpperCase() + getEventStatus(event).slice(1)}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                    }`}>
                      {countHumanParticipants(event)}/{event.maxParticipants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditEvent(event)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteEvent(event.id)} className="text-red-400 hover:text-red-300 transition-colors duration-200" title="Delete Event">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Event Details Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Event Details</h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Event Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-400 mb-4">{selectedEvent.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getEventStatus(selectedEvent))}`}>
                      {getEventStatus(selectedEvent).charAt(0).toUpperCase() + getEventStatus(selectedEvent).slice(1)}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Event Schedule</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Start Date:</span>
                        <span className="text-white">{selectedEvent.startDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">End Date:</span>
                        <span className="text-white">{selectedEvent.endDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Registration Deadline:</span>
                        <span className="text-white">{selectedEvent.registrationDeadline.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-white">{countHumanParticipants(selectedEvent)}/{selectedEvent.maxParticipants}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Rewards</h4>
                    <div className="space-y-2">
                      {selectedEvent.rewards.map((reward) => (
                        <div key={reward.id} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{reward.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-white">{reward.title}</div>
                              <div className="text-xs text-gray-400">{reward.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-white">{reward.xp} XP</div>
                            <div className="text-xs text-yellow-400">{reward.goldXp} Gold XP</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Rules</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    {selectedEvent.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Event Modal */}
        {showEditModal && editingEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Event</h2>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Event Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                    placeholder="Enter event title"
                  />
                </div>

                {/* Event Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingEvent.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                    placeholder="Enter event description"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Type
                  </label>
                  <select
                    value={editingEvent.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                  >
                    <option value="tournament">Tournament</option>
                    <option value="workshop">Workshop</option>
                    <option value="challenge">Challenge</option>
                  </select>
                </div>

                {/* Max Participants */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maximum Participants
                  </label>
                  <input
                    type="number"
                    value={editingEvent.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-slate-600 hover:border-slate-500 transition-colors duration-200"
                    placeholder="Enter max participants"
                    min="1"
                  />
                </div>

                {/* Event Status */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingEvent.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">Active Event</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingEvent.isRegistrationOpen}
                      onChange={(e) => handleInputChange('isRegistrationOpen', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">Registration Open</span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEvent}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Add Event</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                  <input
                    type="text"
                    value={(newEvent.title as string) || ''}
                    onChange={(e) => handleNewEventChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={(newEvent.description as string) || ''}
                    onChange={(e) => handleNewEventChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter event description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
                  <select
                    value={(newEvent.type as string) || 'tournament'}
                    onChange={(e) => handleNewEventChange('type', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="tournament">Tournament</option>
                    <option value="workshop">Workshop</option>
                    <option value="challenge">Challenge</option>
                    <option value="hackathon">Hackathon</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={(newEvent.startDate as Date)?.toISOString?.().split('T')[0]}
                      onChange={(e) => handleNewEventChange('startDate', new Date(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                    <input
                      type="date"
                      value={(newEvent.endDate as Date)?.toISOString?.().split('T')[0]}
                      onChange={(e) => handleNewEventChange('endDate', new Date(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Registration Deadline</label>
                    <input
                      type="date"
                      value={(newEvent.registrationDeadline as Date)?.toISOString?.().split('T')[0]}
                      onChange={(e) => handleNewEventChange('registrationDeadline', new Date(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Participants</label>
                    <input
                      type="number"
                      value={(newEvent.maxParticipants as number) || 0}
                      min={1}
                      onChange={(e) => handleNewEventChange('maxParticipants', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter max participants"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!newEvent.isActive}
                      onChange={(e) => handleNewEventChange('isActive', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">Active Event</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!newEvent.isRegistrationOpen}
                      onChange={(e) => handleNewEventChange('isRegistrationOpen', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">Registration Open</span>
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
