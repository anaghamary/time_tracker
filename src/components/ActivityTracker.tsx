import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  icon: string;
  productive: boolean;
  timeSpent: number;
  isActive: boolean;
}

interface ActivityTrackerProps {
  onTimeWasted: (minutes: number) => void;
}

export default function ActivityTracker({ onTimeWasted }: ActivityTrackerProps) {
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', name: 'Deep Work', icon: '🧠', productive: true, timeSpent: 0, isActive: false },
    { id: '2', name: 'Social Media', icon: '📱', productive: false, timeSpent: 0, isActive: false },
    { id: '3', name: 'Email', icon: '📧', productive: true, timeSpent: 0, isActive: false },
    { id: '4', name: 'YouTube', icon: '📺', productive: false, timeSpent: 0, isActive: false },
    { id: '5', name: 'Reading', icon: '📚', productive: true, timeSpent: 0, isActive: false },
    { id: '6', name: 'Gaming', icon: '🎮', productive: false, timeSpent: 0, isActive: false },
  ]);

  const [messages, setMessages] = useState<string[]>([
    'Great! Starting to track your productivity...',
  ]);

  const sarcasticMessages = [
    "Oh wow, 'productive' work? Let me just add some realistic time-wasting...",
    "Nice try, but I know you're actually procrastinating!",
    "Research shows 73% of 'work' time is actually daydreaming. Adding that now...",
    "Your brain took 47 micro-breaks during that task. Counting them all!",
    "I detected some inefficient breathing. That's wasted time right there!",
    "You blinked 23 times unnecessarily. Adding to waste counter...",
    "Sorry, but I'm programmed to be realistic about human productivity.",
    "Plot twist: All time is wasted time! Adding bonus minutes...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const updated = prev.map(activity => {
          if (activity.isActive) {
            const increment = Math.random() * 3 + 1; // 1-4 minutes
            const wasteMultiplier = activity.productive ? 2 : 1; // Even "productive" tasks waste more time
            
            onTimeWasted(increment * wasteMultiplier);
            
            // Add sarcastic message occasionally
            if (Math.random() < 0.3) {
              setMessages(prevMessages => [
                ...prevMessages.slice(-4), // Keep only last 4 messages
                sarcasticMessages[Math.floor(Math.random() * sarcasticMessages.length)]
              ]);
            }
            
            return {
              ...activity,
              timeSpent: activity.timeSpent + increment
            };
          }
          return activity;
        });
        return updated;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [onTimeWasted]);

  const toggleActivity = (id: string) => {
    setActivities(prev => prev.map(activity => ({
      ...activity,
      isActive: activity.id === id ? !activity.isActive : false
    })));

    const activity = activities.find(a => a.id === id);
    if (activity && !activity.isActive) {
      setMessages(prev => [
        ...prev.slice(-4),
        `Starting "${activity.name}"... I'll track EVERYTHING! 😈`
      ]);
    }
  };

  const resetAll = () => {
    setActivities(prev => prev.map(activity => ({
      ...activity,
      timeSpent: 0,
      isActive: false
    })));
    setMessages(['Reset complete! Ready to waste more time efficiently!']);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity Tracker</h2>
        <button
          onClick={resetAll}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              activity.isActive
                ? 'border-green-500 bg-green-50 shadow-md transform scale-105'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.productive 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {activity.productive ? 'Productive' : 'Time Waster'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-lg font-bold text-gray-600 mb-3">
              {formatTime(activity.timeSpent)}
            </div>
            
            <button
              onClick={() => toggleActivity(activity.id)}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                activity.isActive
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {activity.isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-300">System Status</span>
        </div>
        {messages.slice(-3).map((message, index) => (
          <div key={index} className="opacity-80 mb-1">
            {'>'} {message}
          </div>
        ))}
      </div>
    </div>
  );
}