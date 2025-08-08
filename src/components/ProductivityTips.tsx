import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

export default function ProductivityTips() {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "Try the Pomodoro Technique!",
      content: "Work for 25 minutes, then take a 5-minute break. Perfect for maximizing your scrolling-to-working ratio!",
      effectiveness: "12% effective"
    },
    {
      title: "Eliminate Distractions",
      content: "Close all unnecessary tabs and apps. This way, you can focus entirely on finding new distractions!",
      effectiveness: "8% effective"
    },
    {
      title: "Time Blocking",
      content: "Schedule specific times for tasks. Then completely ignore your schedule and do whatever feels right!",
      effectiveness: "15% effective"
    },
    {
      title: "Set SMART Goals",
      content: "Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. Then forget about them immediately!",
      effectiveness: "6% effective"
    },
    {
      title: "Use the Two-Minute Rule",
      content: "If something takes less than two minutes, do it now! If it takes longer, add it to your ever-growing to-do list.",
      effectiveness: "23% effective"
    },
    {
      title: "Take Regular Breaks",
      content: "Your brain needs rest! Take a 5-minute break every hour. Make it 45 minutes for optimal 'rest'.",
      effectiveness: "4% effective"
    },
    {
      title: "Prioritize Your Tasks",
      content: "Always do the most important tasks first! Or the easiest ones. Or whatever looks most fun at the moment.",
      effectiveness: "11% effective"
    },
    {
      title: "Create a Morning Routine",
      content: "Start your day with intention! Check social media, read news, maybe some shopping... then think about work.",
      effectiveness: "9% effective"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 8000); // Change tip every 8 seconds

    return () => clearInterval(interval);
  }, [tips.length]);

  const nextTip = () => {
    setCurrentTip(prev => (prev + 1) % tips.length);
  };

  const tip = tips[currentTip];

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Productivity Tip</h2>
        </div>
        
        <button
          onClick={nextTip}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          title="Next tip"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{tip.title}</h3>
        <p className="text-white/90 leading-relaxed">{tip.content}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <span className="text-sm text-white/80">
            Tip {currentTip + 1} of {tips.length}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
            {tip.effectiveness}
          </span>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/70 text-center italic">
        * Effectiveness ratings based on absolutely no scientific research whatsoever
      </div>
    </div>
  );
}