import { categoryColorMap } from '@/entities/todos/constants/CategoryData';
import { Category } from '@/entities/todos/types/TodoTypes';
import { getIconComponent } from '@/shared/lib/icons';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const getCategoryColor = (colorName: string) => {
    return (
      categoryColorMap[colorName as keyof typeof categoryColorMap] ||
      'text-gray-400 bg-gray-500/10 border-gray-500/20'
    );
  };

  const IconComponent = getIconComponent(category.icon);
  const categoryColorClass = getCategoryColor(category.color);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <div
          className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-sm border text-xs font-medium ${categoryColorClass}`}
        >
          <IconComponent className="h-3 w-3" />
          <span>{category.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
