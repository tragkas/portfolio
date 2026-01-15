import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { CategoryCard } from './CategoryCard';
import { DetailView } from './DetailView';
import { ViewState, Category } from '../types';
import { getCategories } from '../api';

interface HomeProps {
    toggleTheme: () => void;
    isDark: boolean;
}

export const Home: React.FC<HomeProps> = ({ toggleTheme, isDark }) => {
    const [view, setView] = useState<ViewState>('grid');
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchData();
    }, []);

    const handleCategoryClick = (id: string) => {
        setActiveCategoryId(id);
        setView('detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setView('grid');
        setTimeout(() => setActiveCategoryId(null), 300);
    };

    const activeCategory = categories.find(c => c.id === activeCategoryId);

    return (
        <Layout toggleTheme={toggleTheme} isDark={isDark}>
            {view === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onClick={handleCategoryClick}
                        />
                    ))}
                </div>
            ) : (
                activeCategory && (
                    <DetailView
                        category={activeCategory}
                        onBack={handleBack}
                    />
                )
            )}
        </Layout>
    );
};
