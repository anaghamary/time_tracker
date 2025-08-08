import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ActivityTracker from './components/ActivityTracker';
import WasteAnalytics from './components/WasteAnalytics';
import Achievements from './components/Achievements';
import ProductivityTips from './components/ProductivityTips';

function App() {
  const [totalWasted, setTotalWasted] = useState(0);
  const [wasteScore, setWasteScore] = useState(0);

  // Add random waste even when idle
  useEffect(() => {
    const interval = setInterval(() => {
      const randomWaste = Math.random() * 2; // 0-2 minutes
      setTotalWasted(prev => prev + randomWaste);
      setWasteScore(prev => prev + Math.floor(randomWaste * 10));
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTimeWasted = (minutes: number) => {
    setTotalWasted(prev => prev + minutes);
    setWasteScore(prev => prev + Math.floor(minutes * 15)); // Higher multiplier for active wasting
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-orange-50">
      <Header totalWasted={Math.floor(totalWasted)} wasteScore={wasteScore} />
      
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <ActivityTracker onTimeWasted={handleTimeWasted} />
        
        <WasteAnalytics 
          totalWasted={Math.floor(totalWasted)} 
          wasteScore={wasteScore} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Achievements 
              totalWasted={Math.floor(totalWasted)} 
              wasteScore={wasteScore} 
            />
          </div>
          <div>
            <ProductivityTips />
          </div>
        </div>

        <footer className="text-center text-gray-600 py-8">
          <p className="text-sm italic">
            "The Ultimate Time-Waster Tracker™ - Because honesty about productivity is the first step to... more procrastination!"
          </p>
          <p className="text-xs mt-2 opacity-60">
            Disclaimer: This app is 100% satirical and 0% helpful for actual productivity.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;