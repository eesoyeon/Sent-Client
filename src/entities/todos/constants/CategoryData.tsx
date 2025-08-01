import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import { Category } from '@/entities/todos/types/CategoryTypes';

const size = 'w-2 h-2';

export const categoryData: Category[] = [
  {
    id: 1,
    name: 'Work',
    color: '#60a5fa',
    icon: 'briefcase',
    colorCircle: <CategoryColorCircle size={size} color="#60a5fa" />,
  },
  {
    id: 2,
    name: 'Personal',
    color: '#4ade80',
    icon: 'home',
    colorCircle: <CategoryColorCircle size={size} color="#4ade80" />,
  },
  {
    id: 3,
    name: 'Health',
    color: '#f87171',
    icon: 'heart',
    colorCircle: <CategoryColorCircle size={size} color="#f87171" />,
  },
  {
    id: 3,
    name: 'Learning',
    color: '#c084fc',
    icon: 'book-open',
    colorCircle: <CategoryColorCircle size={size} color="#c084fc" />,
  },
  {
    id: 4,
    name: 'Daily',
    color: '#facc15',
    icon: 'star',
    colorCircle: <CategoryColorCircle size={size} color="#facc15" />,
  },
  {
    id: 5,
    name: 'Hobby',
    color: '#f472b6',
    icon: 'camera',
    colorCircle: <CategoryColorCircle size={size} color="#f472b6" />,
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
