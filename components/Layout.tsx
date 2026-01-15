import React from 'react';
import { Moon, Sun, Briefcase } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  isDark: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, toggleTheme, isDark }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-300 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <span className="sr-only">Toggle Theme</span>
          <span
            className={`${
              isDark ? 'translate-x-7 bg-slate-800' : 'translate-x-1 bg-white'
            } inline-block h-6 w-6 transform rounded-full shadow transition-transform flex items-center justify-center`}
          >
            {isDark ? (
              <Moon size={14} className="text-yellow-400" />
            ) : (
              <Sun size={14} className="text-yellow-500" />
            )}
          </span>
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-12 animate-fade-in-down">
        <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
           {/* Replaced Pirate Skull with a professional Briefcase/Portfolio icon, 
               but kept the 'vibe' of the logo container */}
           <Briefcase className="text-white w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          My Digital Estate
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Your gateway to my digital portfolio, tools, and resources.
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl animate-fade-in-up">
        {children}
      </main>

      <footer className="mt-20 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Digital Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};