import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Zap, AlertTriangle } from 'lucide-react';

interface WasteAnalyticsProps {
  totalWasted: number;
  wasteScore: number;
}

export default function WasteAnalytics({ totalWasted, wasteScore }: WasteAnalyticsProps) {
  const [dailyGoal] = useState(Math.floor(Math.random() * 100) + 200); // Random goal between 200-300
  const [efficiency, setEfficiency] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    // Fake efficiency that always decreases
    const newEfficiency = Math.max(0, 100 - (totalWasted / 10));
    setEfficiency(Math.floor(newEfficiency));
    
    // Increase streak occasionally
    if (totalWasted > 0 && totalWasted % 50 === 0) {
      setStreak(prev => prev + 1);
    }
  }, [totalWasted]);

  const progress = Math.min(100, (totalWasted / dailyGoal) * 100);

  const insights = [
    "You're 347% more efficient at wasting time than yesterday!",
    "Your multitasking skills are off the charts (in the wrong direction)!",
    "Congratulations! You've mastered the art of productive procrastination.",
    "Your time-wasting consistency is truly impressive.",
    "You're in the top 99% of time wasters worldwide!",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Statistics Cards */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Daily Waste Goal</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90">{totalWasted}m / {dailyGoal}m</span>
              <span className="text-sm opacity-90">{Math.floor(progress)}%</span>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Efficiency Score</h3>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{efficiency}%</div>
            <div className="text-sm opacity-90">
              {efficiency > 50 ? "Still too high! We need to work on this." : "Perfect! You're achieving peak inefficiency!"}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Waste Streak</h3>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{streak} days</div>
            <div className="text-sm opacity-90">Consecutive days of optimal time wasting!</div>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold text-gray-800">AI Insights</h3>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  !
                </span>
                <p className="text-gray-700">{insight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Real-time Analysis</span>
          </div>
          <div>
            {'>'} Calculating optimal procrastination patterns...
          </div>
          <div>
            {'>'} Cross-referencing with social media algorithms...
          </div>
          <div>
            {'>'} Adding 15% chaos factor for realistic results...
          </div>
        </div>
      </div>
    </div>
  );
}