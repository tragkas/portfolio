import React from 'react';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import { Category } from '../types';

interface DetailViewProps {
  category: Category;
  onBack: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ category, onBack }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center">
          <span className="text-4xl mr-3">{category.emoji}</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-2 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-xl">
        <div className="flex flex-col gap-3">
          {category.items.map((item, index) => (
            <a 
              key={item.id}
              href={item.url}
              className="group flex items-center p-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700/50 transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
            >
              {/* Number Badge */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white font-bold text-sm mr-4 shadow-sm">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h3>
                  {item.isPopular && (
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <Star size={10} className="mr-1 fill-current" />
                      Popular
                    </span>
                  )}
                  {item.tag && (
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {item.description}
                </p>
              </div>

              {/* Action Icon */}
              <div className="flex-shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors">
                <ExternalLink size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};