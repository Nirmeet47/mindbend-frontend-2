'use client';

import React from 'react';

interface NavigationButtonProps {
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 z-40 group p-4 bg-gradient-to-br from-gray-800/90 via-gray-700/90 to-gray-800/90 backdrop-blur-xl border border-gray-600/50 rounded-2xl hover:border-blue-400/60 transition-all duration-500 transform hover:scale-105 active:scale-95"
      style={{
        background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.9) 0%, rgba(75, 85, 99, 0.7) 50%, rgba(55, 65, 81, 0.9) 100%)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Brushed Metal Background */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          background: `
            linear-gradient(90deg, 
              rgba(75, 85, 99, 0.6) 0%, 
              rgba(55, 65, 81, 0.8) 25%,
              rgba(75, 85, 99, 0.6) 50%,
              rgba(55, 65, 81, 0.8) 75%,
              rgba(75, 85, 99, 0.6) 100%
            )
          `,
          backgroundSize: '3px 100%'
        }}
      />

      {/* Circuit Pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-15 group-hover:opacity-30 transition-opacity duration-300">
        <div 
          className="w-full h-full rounded-2xl"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px'
          }}
        />
      </div>

      {/* Button Content */}
      <div className="relative flex items-center space-x-3">
        {/* Vault Door Icon */}
        <div className="relative w-8 h-8">
          {/* Top Panel */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-400/80 to-blue-500/80 rounded-t-md border border-blue-400/60 group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute bottom-0 left-1/2 w-3 h-0.5 bg-orange-400/80 transform -translate-x-1/2" />
          </div>
          
          {/* Bottom Panel */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-400/80 to-blue-500/80 rounded-b-md border border-blue-400/60 group-hover:transform group-hover:translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-1/2 w-3 h-0.5 bg-orange-400/80 transform -translate-x-1/2" />
          </div>

          {/* Center Seam */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300/80 to-transparent transform -translate-y-1/2" />
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-300 group-hover:text-blue-300 transition-colors duration-300 tracking-wider">
            NAVIGATION
          </span>
          <span className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-300 tracking-wide">
            ACCESS
          </span>
        </div>

        {/* Status Light */}
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:bg-blue-400 transition-colors duration-300 shadow-sm shadow-green-400/50 group-hover:shadow-blue-400/50" />
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Corner Reinforcements */}
      <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-orange-400/60 group-hover:border-orange-400/90 transition-colors duration-300" />
      <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-orange-400/60 group-hover:border-orange-400/90 transition-colors duration-300" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-orange-400/60 group-hover:border-orange-400/90 transition-colors duration-300" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-orange-400/60 group-hover:border-orange-400/90 transition-colors duration-300" />
    </button>
  );
};

export default NavigationButton;