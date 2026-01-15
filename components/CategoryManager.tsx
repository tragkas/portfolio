import React, { useState } from 'react';
import { Category, CategoryItem } from '../types';
import { createItem, updateItem, deleteItem, createCategory, updateCategory, deleteCategory, reorderItems } from '../api';
import { Trash2, Edit2, Plus, X, Save, GripVertical } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

interface CategoryManagerProps {
    category?: Category;
    onClose: () => void;
    onUpdate: () => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ category, onClose, onUpdate }) => {
    const [isEditingCategory, setIsEditingCategory] = useState(!category);
    const [catData, setCatData] = useState<Partial<Category>>(category || { title: '', subtitle: '', emoji: '' });
    const [items, setItems] = useState<CategoryItem[]>(category?.items || []);
    const [editingItem, setEditingItem] = useState<Partial<CategoryItem> | null>(null);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        type: 'item' | 'category';
        id?: string;
        title: string;
        message: string;
    }>({
        isOpen: false,
        type: 'item',
        title: '',
        message: ''
    });

    const handleSaveCategory = async () => {
        try {
            if (category) {
                await updateCategory(category.id, catData);
            } else {
                const newCat = await createCategory(catData);
                // If creating new, we might want to continue to add items or close
                onUpdate();
                onClose();
                return;
            }
            setIsEditingCategory(false);
            onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategoryClick = () => {
        if (!category) return;
        setConfirmModal({
            isOpen: true,
            type: 'category',
            id: category.id,
            title: 'Delete Category',
            message: 'Are you sure you want to delete this category? All items within it will be permanently removed.'
        });
    };

    const handleConfirmDelete = async () => {
        try {
            if (confirmModal.type === 'category' && category) {
                await deleteCategory(category.id);
                onUpdate();
                onClose();
            } else if (confirmModal.type === 'item' && confirmModal.id) {
                await deleteItem(confirmModal.id);
                setItems(prev => prev.filter(item => item.id !== confirmModal.id));
                onUpdate();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveItem = async () => {
        if (!editingItem) return;
        try {
            if (editingItem.id) {
                const updated = await updateItem(editingItem.id, editingItem);
                setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
            } else {
                const newItem = await createItem({ ...editingItem, categoryId: category?.id });
                setItems(prev => [...prev, newItem]);
            }
            setEditingItem(null);
            onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteItemClick = (id: string) => {
        setConfirmModal({
            isOpen: true,
            type: 'item',
            id,
            title: 'Delete Item',
            message: 'Are you sure you want to delete this item? This action cannot be undone.'
        });
    };

    // Drag and Drop Handlers
    const [draggedItem, setDraggedItem] = useState<CategoryItem | null>(null);

    const handleDragStart = (e: React.DragEvent, item: CategoryItem) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
        // Transparent drag image or custom styling could be added here
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (!draggedItem) return;

        const draggedIndex = items.findIndex(i => i.id === draggedItem.id);
        if (draggedIndex === index) return;

        const newItems = [...items];
        const itemToMove = newItems[draggedIndex];
        newItems.splice(draggedIndex, 1);
        newItems.splice(index, 0, itemToMove);

        setItems(newItems);
    };

    const handleDragEnd = async () => {
        setDraggedItem(null);
        // Persist new order
        const itemsWithPosition = items.map((item, index) => ({
            id: item.id,
            position: index
        }));
        try {
            await reorderItems(itemsWithPosition);
            onUpdate(); // Optional: refresh from server to be sure
        } catch (err) {
            console.error("Failed to save order", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category ? 'Edit Category' : 'New Category'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Category Details */}
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input
                                    value={catData.title}
                                    onChange={e => setCatData({ ...catData, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emoji</label>
                                <input
                                    value={catData.emoji}
                                    onChange={e => setCatData({ ...catData, emoji: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtitle</label>
                                <input
                                    value={catData.subtitle}
                                    onChange={e => setCatData({ ...catData, subtitle: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button onClick={handleSaveCategory} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Save className="w-4 h-4" /> Save Category
                            </button>
                            {category && (
                                <button onClick={handleDeleteCategoryClick} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                    <Trash2 className="w-4 h-4" /> Delete Category
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Items List */}
                    {category && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Items</h3>
                                <button
                                    onClick={() => setEditingItem({})}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                    <Plus className="w-4 h-4" /> Add Item
                                </button>
                            </div>

                            {/* Item Editor */}
                            {editingItem && (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-blue-500 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            placeholder="Title"
                                            value={editingItem.title || ''}
                                            onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                        <input
                                            placeholder="URL"
                                            value={editingItem.url || ''}
                                            onChange={e => setEditingItem({ ...editingItem, url: e.target.value })}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                        <input
                                            placeholder="Description"
                                            value={editingItem.description || ''}
                                            onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                        <input
                                            placeholder="Tag"
                                            value={editingItem.tag || ''}
                                            onChange={e => setEditingItem({ ...editingItem, tag: e.target.value })}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editingItem.isPopular || false}
                                                onChange={e => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label className="text-sm text-gray-700 dark:text-gray-300">Popular?</label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => setEditingItem(null)} className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
                                        <button onClick={handleSaveItem} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Item</button>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-3">
                                {items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragEnd={handleDragEnd}
                                        className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 group hover:border-blue-500/50 transition-all ${draggedItem?.id === item.id ? 'opacity-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <GripVertical className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {editingItem?.id === item.id ? editingItem.title : item.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingItem(item)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteItemClick(item.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={handleConfirmDelete}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText="Delete"
                isDangerous={true}
            />
        </div >
    );
};
