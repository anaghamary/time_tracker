import React from 'react';
import { Clock, TrendingUp, Award } from 'lucide-react';

interface HeaderProps {
  totalWasted: number;
  wasteScore: number;
}

export default function Header({ totalWasted, wasteScore }: HeaderProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Ultimate Time-Waster Tracker™</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm opacity-90">Total Wasted</span>
              </div>
              <div className="text-2xl font-bold">{formatTime(totalWasted)}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm opacity-90">Waste Score</span>
              </div>
              <div className="text-2xl font-bold">{wasteScore.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <p className="text-sm opacity-90 mt-2">
          "Finally! A productivity app that's honest about what you're actually doing."
        </p>
      </div>
    </header>
  );
}