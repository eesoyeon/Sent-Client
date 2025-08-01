import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { getIconComponent } from '@/shared/lib/icons';
import { getSelectItemStyle } from '@/entities/todos/utils/getFormItemStyle';
import { Category } from '@/entities/todos/types/CategoryTypes';

interface CategorySettingItemProps {
  category: Category;
  index: number;
  total: number;
  isActive: boolean;
  onClick: () => void;
}

const CategorySettingItem = ({
  category,
  index,
  total,
  isActive,
  onClick,
}: CategorySettingItemProps) => {
  const { rounded, border } = getSelectItemStyle(index, total);
  const Icon = getIconComponent(category.icon);

  return (
    <div
      className={cn(
        'flex justify-between items-center space-x-3 pl-4 bg-gray-800 w-full hover:bg-gray-700/60',
        rounded,
      )}
      onClick={onClick}
    >
      <Icon className="h-6 w-6 text-gray-400" />
      <div className={cn('flex items-center w-full py-3 pr-4', border)}>
        <div className="flex flex-1 items-center space-x-3">
          <p className="text-sm font-medium text-white">{category.name}</p>
          <p>{category.colorCircle}</p>
        </div>
        {isActive ? (
          <ChevronDown className="text-gray-500 w-5 h-5" />
        ) : (
          <ChevronRight className="text-gray-500 w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default CategorySettingItem;
