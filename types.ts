export interface CategoryItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  tag?: string;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  items: CategoryItem[];
}

export type ViewState = 'grid' | 'detail';