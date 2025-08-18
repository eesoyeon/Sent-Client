import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import CategoryForm from '@/entities/settings/components/todos/CategoryForm';
import { cn } from '@/shared/lib/utils';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/radix-ui/accordion';
import { Button } from '@/shared/ui/radix-ui/button';
import { CircleDashed, Plus } from 'lucide-react';
import { CreateCategoryRequest } from '@/entities/todos/types/CategoryTypes';
import { getIconComponent } from '@/shared/lib/icons';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useEffect, useRef } from 'react';

interface CategoryCreateItemProps {
  formCategory: CreateCategoryRequest;
  setFormCategory: React.Dispatch<React.SetStateAction<CreateCategoryRequest>>;
  accordionValue: string | undefined;
  setAccordionValue: (value: string | undefined) => void;
  onCreate: (e: React.FormEvent) => void;
}

const CategoryCreateItem = ({
  formCategory,
  setFormCategory,
  accordionValue,
  setAccordionValue,
  onCreate,
}: CategoryCreateItemProps) => {
  const IconComponent = getIconComponent(formCategory.icon);

  // const ref = useRef<HTMLDivElement>(null);

  // useClickOutside({
  //   ref,
  //   callback: () => {
  //     if (accordionValue === 'new-category') {
  //       setAccordionValue(undefined);
  //     }
  //   },
  // });

  useEffect(() => {
    console.log('[CreateItem에서 본 accordionValue]', accordionValue);
  }, [accordionValue]);

  return (
    <form onSubmit={onCreate}>
      <AccordionItem className="rounded-lg bg-gray-800 border-none" value="new-category">
        <div className={cn('flex items-center space-x-3 pl-4')}>
          {formCategory.icon !== '' ? (
            <IconComponent className="h-6 w-6 text-gray-200" />
          ) : (
            <CircleDashed className="h-6 w-6 text-gray-400" />
          )}

          <div className={cn('flex flex-1 items-center justify-between py-1 pr-2')}>
            <div className="flex items-center space-x-3">
              {accordionValue === 'new-category' ? (
                <input
                  type="text"
                  className="bg-transparent text-white text-sm font-medium outline-none placeholder:text-white/20 min-w-8"
                  placeholder="이름을 입력하세요"
                  value={formCategory.name}
                  maxLength={10}
                  // size={formCategory.name.length}
                  onChange={e => setFormCategory(prev => ({ ...prev, name: e.target.value }))}
                  required
                  autoFocus
                />
              ) : (
                <div className="text-white text-sm font-medium">{'새로운 카테고리'}</div>
              )}

              <CategoryColorCircle size="w-2 h-2" color={formCategory.color || '#737373'} />
            </div>

            {accordionValue === 'new-category' ? (
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
                  <Plus className="text-white w-5 h-5" />
                </Button>
              </AccordionTrigger>
            )}
          </div>
        </div>

        <AccordionContent>
          <CategoryForm
            mode="create"
            formCategory={formCategory}
            onChange={field => setFormCategory(prev => ({ ...prev, ...field }))}
          />
        </AccordionContent>
      </AccordionItem>
    </form>
  );
};

export default CategoryCreateItem;
