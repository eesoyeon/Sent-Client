import { Card, CardContent } from '@/shared/ui/radix-ui/card';
import SettingHeader from '@/entities/settings/components/Header/SettingHeader';
import CategorySettingItem from '@/entities/settings/components/Todos/CategorySettingItem';
import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import { categoryData } from '@/entities/todos/constants/CategoryData';
import { getSelectItemStyle } from '@/entities/todos/utils/getFormItemStyle';
import { getIconComponent } from '@/shared/lib/icons';
import { cn } from '@/shared/lib/utils';
import { Check, ChevronDown, ChevronRight, CircleDashed, Plus } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

interface CategorySettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategorySettingModal = ({ isOpen, onClose }: CategorySettingModalProps) => {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <Card className="w-full max-h-[100dvh] overflow-hidden bg-gray-900 border-gray-800 rounded-t-3xl rounded-b-none border-t flex flex-col">
        <SettingHeader onClick={onClose} title="카테고리 편집" />

        <CardContent className="p-4 space-y-9 flex-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          <div
            className={cn(
              'flex justify-between items-center space-x-3 pl-4 bg-gray-800 w-full hover:bg-gray-700/60 rounded-lg',
            )}
            onClick={() => setEditingCategoryId('new')}
          >
            <CircleDashed className="h-6 w-6 text-gray-400" />
            <div className={cn('flex items-center w-full py-3 pr-4')}>
              <div className="flex flex-1 items-center space-x-3">
                <p className="text-sm font-medium text-white">새로운 카테고리</p>
                <CategoryColorCircle color="#737373" />
              </div>
              {editingCategoryId === 'new' ? (
                <Check className="text-white w-5 h-5" />
              ) : (
                <Plus className="text-white w-5 h-5" />
              )}
            </div>
          </div>

          <div>
            {categoryData.map((category, index) => (
              <CategorySettingItem
                key={category.id}
                category={category}
                index={index}
                total={categoryData.length}
                isActive={editingCategoryId === category.id}
                onClick={() => setEditingCategoryId(category.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategorySettingModal;
