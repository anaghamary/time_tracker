import React, { useEffect, useState } from 'react';
import { Trophy, Star, Medal, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
  color: string;
}

interface AchievementsProps {
  totalWasted: number;
  wasteScore: number;
}

export default function Achievements({ totalWasted, wasteScore }: AchievementsProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Waste your first 10 minutes',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 10,
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: '2',
      title: 'Time Killer',
      description: 'Waste 100 minutes in total',
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 100,
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: '3',
      title: 'Procrastination Master',
      description: 'Reach a waste score of 1,000',
      icon: <Medal className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 1000,
      color: 'from-purple-400 to-purple-500'
    },
    {
      id: '4',
      title: 'Time Lord',
      description: 'Waste 500 minutes total',
      icon: <Award className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 500,
      color: 'from-green-400 to-green-500'
    },
    {
      id: '5',
      title: 'Professional Procrastinator',
      description: 'Reach a waste score of 5,000',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 5000,
      color: 'from-red-400 to-red-500'
    },
    {
      id: '6',
      title: 'Time Waster Extraordinaire',
      description: 'Waste 1,000 minutes total',
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 1000,
      color: 'from-indigo-400 to-indigo-500'
    }
  ]);

  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  useEffect(() => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        let progress = 0;
        let unlocked = false;

        if (achievement.id === '1' || achievement.id === '2' || achievement.id === '4' || achievement.id === '6') {
          // Time-based achievements
          progress = Math.min(totalWasted, achievement.target);
          unlocked = totalWasted >= achievement.target;
        } else {
          // Score-based achievements
          progress = Math.min(wasteScore, achievement.target);
          unlocked = wasteScore >= achievement.target;
        }

        // Check for newly unlocked achievements
        if (unlocked && !achievement.unlocked) {
          setNewlyUnlocked(prev => [...prev, achievement.id]);
          // Remove from newly unlocked after 3 seconds
          setTimeout(() => {
            setNewlyUnlocked(prev => prev.filter(id => id !== achievement.id));
          }, 3000);
        }

        return {
          ...achievement,
          progress,
          unlocked
        };
      });

      return updated;
    });
  }, [totalWasted, wasteScore]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
        </div>
        <div className="text-sm text-gray-600">
          {unlockedCount} / {achievements.length} unlocked
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const progressPercent = (achievement.progress / achievement.target) * 100;
          const isNewlyUnlocked = newlyUnlocked.includes(achievement.id);

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${achievement.color} text-white border-transparent shadow-lg`
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              } ${isNewlyUnlocked ? 'animate-pulse ring-4 ring-yellow-400' : ''}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight">
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>
                    {achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}
                  </span>
                  <span>{Math.floor(progressPercent)}%</span>
                </div>
                <div className={`w-full rounded-full h-2 ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-gray-300'
                }`}>
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      achievement.unlocked ? 'bg-white' : 'bg-gray-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {isNewlyUnlocked && (
                <div className="mt-3 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                    🎉 UNLOCKED!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {unlockedCount > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">
              Congratulations on your time-wasting achievements! You're really getting the hang of this.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}