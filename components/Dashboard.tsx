import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';
import { Category } from '../types';
import { getCategories } from '../api';
import { CategoryManager } from './CategoryManager';
import { Settings } from './Settings';
import { Plus, Settings as SettingsIcon, LogOut } from 'lucide-react';

interface DashboardProps {
    toggleTheme: () => void;
    isDark: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ toggleTheme, isDark }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
    const [isManagerOpen, setIsManagerOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const openManager = (category?: Category) => {
        setSelectedCategory(category);
        setIsManagerOpen(true);
    };

    return (
        <Layout toggleTheme={toggleTheme} isDark={isDark}>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your portfolio content</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <SettingsIcon className="w-5 h-5" /> Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add New Card */}
                <button
                    onClick={() => openManager()}
                    className="flex flex-col items-center justify-center p-8 h-full min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                >
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Add New Category</span>
                </button>

                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => openManager(category)}
                        className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all cursor-pointer hover:-translate-y-1"
                    >
                        <div className="text-4xl mb-4">{category.emoji}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{category.subtitle}</p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-500">
                                {category.items?.length || 0} items
                            </span>
                            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Edit Category →
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {isManagerOpen && (
                <CategoryManager
                    category={selectedCategory}
                    onClose={() => setIsManagerOpen(false)}
                    onUpdate={fetchData}
                />
            )}

            {isSettingsOpen && (
                <Settings onClose={() => setIsSettingsOpen(false)} />
            )}
        </Layout>
    );
};
