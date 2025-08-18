import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { getIconComponent } from '@/shared/lib/icons';
import { getSelectItemStyle } from '@/entities/todos/utils/getFormItemStyle';
import { Category, CreateCategoryRequest } from '@/entities/todos/types/CategoryTypes';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/radix-ui/accordion';
import CategoryForm from '@/entities/settings/components/todos/CategoryForm';
import { Button } from '@/shared/ui/radix-ui/button';
import { useState } from 'react';
import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface CategoryUpdateItemProps {
  category: Category;
  index: number;
  total: number;
  accordionValue: string | undefined;
  setAccordionValue: (value: string | undefined) => void;
  onUpdate: (e: React.FormEvent, updated: CreateCategoryRequest) => void;
  onDelete: (e: React.FormEvent) => void;
}

const CategoryUpdateItem = ({
  category,
  index,
  total,
  accordionValue,
  setAccordionValue,
  onUpdate,
  onDelete,
}: CategoryUpdateItemProps) => {
  const [localCategory, setLocalCategory] = useState({
    name: category.name,
    icon: category.icon,
    color: category.color,
  });

  const { rounded, border } = getSelectItemStyle(index, total);
  const IconComponent = getIconComponent(localCategory.icon);

  const handleSave = (e: React.FormEvent) => {
    onUpdate(e, localCategory);
    setAccordionValue(undefined);
  };

  const handleDelete = (e: React.FormEvent) => {
    onDelete(e);
    setAccordionValue(undefined);
  };

  return (
    <form onSubmit={handleSave}>
      <AccordionItem
        className={cn('bg-gray-800 border-none', rounded)}
        value={`category-${category.id}`}
      >
        <div className={cn('flex items-center space-x-3 pl-4')}>
          <div>
            <IconComponent className="h-6 w-6 text-gray-400" />
          </div>

          <div className={cn('flex flex-1 items-center justify-between py-1 pr-2', border)}>
            <div className="flex items-center space-x-3">
              {accordionValue === `category-${category.id}` ? (
                <input
                  type="text"
                  className="bg-transparent text-white text-sm font-medium outline-none placeholder:text-white/20 min-w-8"
                  placeholder="이름을 입력하세요"
                  value={localCategory.name}
                  maxLength={10}
                  // size={localCategory.name.length}
                  onChange={e => setLocalCategory(prev => ({ ...prev, name: e.target.value }))}
                  required
                  autoFocus
                />
              ) : (
                <div className="text-white text-sm font-medium">{category.name}</div>
              )}

              <CategoryColorCircle size="w-2 h-2" color={localCategory.color} />
            </div>

            {accordionValue === `category-${category.id}` ? (
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-white rounded-lg hover:bg-gray-700/60"
              >
                저장
              </Button>
            ) : (
              <AccordionTrigger
                asChild
                className="flex flex-1 justfiy-end [&[data-state=open]>svgr]:rotate-0"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="rounded-lg hover:bg-gray-700/60"
                >
                  <ChevronRight className="text-gray-300 w-5 h-5" />
                </Button>
              </AccordionTrigger>
            )}
          </div>
        </div>

        <AccordionContent>
          <CategoryForm
            mode="update"
            formCategory={localCategory}
            onChange={field => setLocalCategory(prev => ({ ...prev, ...field }))}
            onDelete={handleDelete}
          />
        </AccordionContent>
      </AccordionItem>
    </form>
  );
};

export default CategoryUpdateItem;
