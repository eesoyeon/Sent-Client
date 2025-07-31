import SelectGroup from '@/entities/todos/components/select/SelectGroup';
import { Input } from '@/shared/ui/radix-ui/input';
import { Label } from '@/shared/ui/radix-ui/label';
import { categoryData } from '@/entities/todos/constants/CategoryData';
import { alarmOptions, timeOptions } from '@/entities/todos/constants/TodoOptionData';
import { Todo } from '@/entities/todos/types/TodoTypes';

interface TodoFormProps {
  formTodo: Todo;
  handleChange: (field: keyof Todo, value: string) => void;
  openSelectId: number | null;
  handleToggle: (id: number | null) => void;
}

const TodoForm = ({ formTodo, handleChange, openSelectId, handleToggle }: TodoFormProps) => {
  const selectedCategory = categoryData.find(category => category.id === formTodo.categoryId);

  return (
    <>
      <fieldset className="space-y-2 px-3 py-4">
        <Label htmlFor="title" className="text-sm font-medium text-gray-300">
          할 일
        </Label>
        <Input
          id="title"
          placeholder="내용을 입력하세요"
          value={formTodo.title}
          onChange={e => handleChange('title', e.target.value)}
          className="bg-transparent border-0 font-bold text-white text-2xl p-0"
          required
          autoFocus
        />
      </fieldset>

      <div className="space-y-9">
        <div>
          <SelectGroup
            options={[
              {
                id: 0,
                label: '카테고리',
                value: selectedCategory?.name ?? categoryData[0].name,
                dropdownOptions: categoryData.map(category => ({
                  label: category.name,
                  value: category.id,
                  icon: category.colorCircle,
                })),
                onSelect: value => handleChange('categoryId', value),
                icon: selectedCategory?.colorCircle ?? categoryData[0].colorCircle,
              },
            ]}
            openSelectId={openSelectId}
            onToggle={handleToggle}
          />
        </div>

        <div>
          <SelectGroup
            options={[
              {
                id: 1,
                label: '시간 선택',
                value: timeOptions.find(opt => opt.value === formTodo.dueTime)?.label || '없음',
                dropdownOptions: timeOptions.map(time => ({
                  label: time.label,
                  value: time.value,
                })),
                onSelect: value => handleChange('dueTime', value),
              },
              {
                id: 2,
                label: '알림',
                value: alarmOptions.find(opt => opt.value === formTodo.alarm)?.label || '없음',
                dropdownOptions: alarmOptions.map(alarm => ({
                  label: alarm.label,
                  value: alarm.value,
                })),
                onSelect: value => handleChange('alarm', value),
              },
            ]}
            openSelectId={openSelectId}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </>
  );
};

export default TodoForm;
