import { Card, CardContent } from '@/shared/ui/radix-ui/card';
import SettingHeader from '@/entities/settings/components/header/SettingHeader';
import { useEffect, useRef, useState } from 'react';
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from '@/entities/todos/hooks/useCategories';
import { CreateCategoryRequest } from '@/entities/todos/types/CategoryTypes';
import CategoryUpdateItem from '@/entities/settings/components/todos/CategoryUpdateItem';
import CategoryCreateItem from '@/entities/settings/components/todos/CategoryCreateItem';
import { Accordion } from '@/shared/ui/radix-ui/accordion';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface CategorySettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategorySettingModal = ({ isOpen, onClose }: CategorySettingModalProps) => {
  const [accordionValue, setAccordionValue] = useState<string | undefined>(undefined);
  const [formCategory, setFormCategory] = useState<CreateCategoryRequest>({
    name: '',
    icon: '',
    color: '',
  });

  const { data: categories = [], isLoading } = useGetCategories();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCatgory } = useDeleteCategory();

  const accordionRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: accordionRef,
    callback: () => {
      setAccordionValue(undefined);
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (formCategory.icon.trim() && formCategory.color.trim()) {
      createCategory(formCategory, {
        onSuccess: () => {
          console.log('카테고리 생성 성공');
          setFormCategory({ name: '', color: '', icon: '' });
          setAccordionValue(undefined);
        },
      });
    }
  };

  const handleUpdate = (e: React.FormEvent, id: number, updated: CreateCategoryRequest) => {
    e.preventDefault();

    updateCategory(
      { id, ...updated },
      {
        onSuccess: () => {
          console.log('카테고리 수정 성공');
          setAccordionValue(undefined);
        },
      },
    );
  };

  const handleDelete = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    deleteCatgory(id, {
      onSuccess: () => {
        console.log('카테고리 삭제 성공');
        setAccordionValue(undefined);
      },
    });
  };

  useEffect(() => {
    if (accordionValue === 'new-category') {
      console.log('Accordion 열림');
    } else {
      console.log('Accordion 닫힘');
    }
  }, [accordionValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <Card className="w-full max-h-[100dvh] overflow-hidden bg-gray-900 border-gray-800 rounded-t-3xl rounded-b-none border-t flex flex-col">
        <SettingHeader onClick={onClose} title="카테고리 편집" />

        <CardContent className="p-4 flex-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          <div ref={accordionRef}>
            <Accordion
              type="single"
              collapsible
              value={accordionValue}
              onValueChange={setAccordionValue}
            >
              <div className="mb-9">
                <CategoryCreateItem
                  formCategory={formCategory}
                  setFormCategory={setFormCategory}
                  accordionValue={accordionValue}
                  setAccordionValue={setAccordionValue}
                  onCreate={handleCreate}
                />
              </div>

              {categories.length > 0 &&
                categories.map((category, index) => (
                  <CategoryUpdateItem
                    key={category.id}
                    category={category}
                    index={index}
                    total={categories.length}
                    accordionValue={accordionValue}
                    setAccordionValue={setAccordionValue}
                    onUpdate={(e, updated) => handleUpdate(e, category.id!, updated)}
                    onDelete={e => handleDelete(e, category.id!)}
                  />
                ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategorySettingModal;
