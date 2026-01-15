import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div 
      onClick={() => onClick(category.id)}
      className="group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 dark:from-blue-500/5 dark:to-purple-500/5 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-purple-500/10 transition-all duration-500" />
      
      <div className="z-10 text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
        {category.emoji}
      </div>
      
      <h3 className="z-10 text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {category.title}
      </h3>
      
      <p className="z-10 text-center text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {category.subtitle}
      </p>
    </div>
  );
};