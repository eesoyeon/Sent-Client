import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import { Category } from '@/entities/todos/types/TodoTypes';

export const categoryData: Category[] = [
  {
    id: 'work',
    name: 'Work',
    color: '#60a5fa',
    icon: 'briefcase',
    colorCircle: <CategoryColorCircle color="#60a5fa" />,
  },
  {
    id: 'personal',
    name: 'Personal',
    color: '#4ade80',
    icon: 'home',
    colorCircle: <CategoryColorCircle color="#4ade80" />,
  },
  {
    id: 'health',
    name: 'Health',
    color: '#f87171',
    icon: 'heart',
    colorCircle: <CategoryColorCircle color="#f87171" />,
  },
  {
    id: 'learning',
    name: 'Learning',
    color: '#c084fc',
    icon: 'book-open',
    colorCircle: <CategoryColorCircle color="#c084fc" />,
  },
  {
    id: 'daily',
    name: 'Daily',
    color: '#facc15',
    icon: 'star',
    colorCircle: <CategoryColorCircle color="#facc15" />,
  },
  {
    id: 'hobby',
    name: 'Hobby',
    color: '#f472b6',
    icon: 'camera',
    colorCircle: <CategoryColorCircle color="#f472b6" />,
  },
];

export const categoryColorMap = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  green: 'text-green-400 bg-green-500/10 border-green-500/20',
  red: 'text-red-400 bg-red-500/10 border-red-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
};
