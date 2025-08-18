import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import { categoryData } from '@/entities/todos/constants/CategoryData';
import { CreateCategoryRequest } from '@/entities/todos/types/CategoryTypes';
import { getIconComponent, iconOptions } from '@/shared/lib/icons';
import { cn } from '@/shared/lib/utils';
import DeleteButton from '@/widgets/button/DeleteButton';

interface CategoryFormPorps {
  mode: 'create' | 'update';
  formCategory: CreateCategoryRequest;
  onChange: (update: Partial<CreateCategoryRequest>) => void;
  onDelete?: (e: React.FormEvent) => void;
}

const CategoryForm = ({ mode, formCategory, onChange, onDelete }: CategoryFormPorps) => {
  const buttonStyle = 'flex items-center justify-center w-11 h-9 rounded-md hover:bg-white/10';

  return (
    <div className="p-4 space-y-6 mt-4">
      <div className="space-y-3">
        <label className="text-sm font-medium text-white">아이콘</label>
        <div
          className={`bg-black/80 grid grid-cols-6 grid-rows-4 place-items-center gap-2 w-full px-3 py-5 rounded-lg`}
        >
          {iconOptions.map((icon, idx) => {
            const IconComponent = getIconComponent(icon);
            return (
              <button
                key={idx}
                type="button"
                className={cn(
                  buttonStyle,
                  formCategory.icon === icon &&
                    'bg-white/10 backdrop-blur-md border-t border-b border-t-white/20 border-b-white/20',
                )}
                onClick={() => onChange({ icon })}
              >
                <IconComponent className="h-5 w-5 text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-white">색상</label>
        <div className="bg-black/80 rounded-lg p-4 space-y-6">
          <div className="space-y-2">
            <label className="mx-2 text-xs font-medium text-gray-400">Basic</label>

            <div className={`grid grid-cols-6 grid-rows-1 place-items-center w-full gap-2`}>
              {categoryData.map((category, idx) => {
                const color = category.color;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={cn(
                      buttonStyle,
                      formCategory.color === color &&
                        'bg-white/10 backdrop-blur-md border-t border-b border-t-white/20 border-b-white/20',
                    )}
                    onClick={() => onChange({ color })}
                  >
                    <CategoryColorCircle size="w-3 h-3" color={color} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="" className="mx-2 text-xs font-medium text-gray-400">
              Custom
            </label>

            {/* <div className={`grid grid-cols-6 grid-rows-2 place-items-center gap-2`}>
              {categoryData.map((category, idx) => {
                const color = category.color;
                return (
                  <button key={idx} className={buttonStyle}>
                    <CategoryColorCircle size="w-3 h-3" color={color} />
                  </button>
                );
              })}
              <button className={buttonStyle}>
                <Plus size="w-3 h-3 text-gray-100" />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {mode === 'update' && (
        <DeleteButton
          title="삭제"
          onClick={onDelete}
          backgroundColor="bg-black/80 hover:bg-black/60"
        />
      )}
    </div>
  );
};

export default CategoryForm;
