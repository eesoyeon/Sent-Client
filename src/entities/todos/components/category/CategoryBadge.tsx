import { Category } from '@/entities/todos/types/CategoryTypes';
import { getIconComponent } from '@/shared/lib/icons';
import React from 'react';

interface CategoryBadgeProps {
  category: Category;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const CategoryIcon = getIconComponent(category.icon);

  return (
    <div
      className={`text-sm font-semibold flex items-center px-2 py-1 bg-gray-900 border border-gray-800 rounded-md backrop-blur-sm w-fit space-x-2`}
      style={{ color: category.color }}
    >
      {CategoryIcon && <CategoryIcon className="w-3 h-3 inline-block" />}
      <span>{category.name}</span>
    </div>
  );
};

export default CategoryBadge;
