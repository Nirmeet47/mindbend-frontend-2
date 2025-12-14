import React, { useState, useEffect } from 'react';

const UIOverlay: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 md:p-8 font-sans select-none text-white mix-blend-difference">
      {/* Header */}
      <div className="flex justify-between items-start text-[10px] md:text-xs font-bold tracking-widest uppercase">
        <div className="w-1/3 text-left opacity-90 text-xl md:text-2xl">
          MB'26
        </div>
        <div className="w-1/3 text-center text-lg md:text-2xl tracking-tighter font-black">
          Managerial Events
        </div>
        <div className="w-1/3 text-right opacity-90">
          {/* Empty as requested */}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-end text-[10px] md:text-xs font-semibold tracking-wide w-full">
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Don't Touch Button */}
          <button className="px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-wider text-[10px]">
            Don't Touch
          </button>

          {/* Volume/Progress Visual */}
          <div className="hidden md:flex items-center gap-3 border border-white/20 rounded-full px-4 py-2 bg-black/20 backdrop-blur-sm">
            <div className="flex gap-[3px] h-3 items-end">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-[2px] bg-white ${i > 10 ? 'h-full opacity-100' : 'h-1/3 opacity-30'}`}
                />
              ))}
            </div>
            <span className="font-bold ml-1 text-sm">93°</span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 border border-white/20 rounded-full p-1 bg-black/20 backdrop-blur-sm">
            <button className="px-3 py-1.5 rounded-full text-white/40 hover:text-white transition-colors">ESP</button>
            <button className="px-3 py-1.5 rounded-full bg-white text-black font-bold shadow-lg">ENG</button>
          </div>

          {/* Info Icon */}
          <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors group">
            <span className="font-serif italic font-bold text-lg leading-none group-hover:scale-110 transition-transform">i</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;