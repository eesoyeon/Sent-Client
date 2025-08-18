import SelectGroup from '@/entities/todos/components/select/SelectGroup';
import { Input } from '@/shared/ui/radix-ui/input';
import { Label } from '@/shared/ui/radix-ui/label';
import { alarmOptions } from '@/entities/todos/constants/AlarmOptionData';
import { CreateTodoRequest, Todo } from '@/entities/todos/types/TodoTypes';
import CategoryColorCircle from '@/entities/todos/components/category/CategoryColorCircle';
import { Category } from '@/entities/todos/types/CategoryTypes';
import TimePicker from '@/entities/todos/components/select/TimePicker';

interface TodoFormProps {
  formTodo: CreateTodoRequest | Todo;
  categories: Category[];
  handleChange: (field: keyof CreateTodoRequest, value: string | number | null) => void;
  openSelectId: number | string | null;
  handleToggle: (id: number | string | null) => void;
}

const TodoForm = ({
  formTodo,
  categories,
  handleChange,
  openSelectId,
  handleToggle,
}: TodoFormProps) => {
  const categoryId = 'categoryId' in formTodo ? formTodo.categoryId : formTodo.category?.id;
  const selectedCategory = categories.find(category => category.id === categoryId);

  const scheduledTimeDate =
    formTodo.scheduledDate && formTodo.scheduledTime
      ? new Date(`${formTodo.scheduledDate}T${formTodo.scheduledTime}:00`)
      : null;

  // UI에 표시할 시간 문자열
  const scheduledTimeDisplay = scheduledTimeDate
    ? scheduledTimeDate.toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: '2-digit',
        second: undefined,
        hour12: true,
      })
    : '없음';

  const handleTimeChange = (hour: number | null, minute: number | null) => {
    if (hour !== null && minute !== null) {
      const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      handleChange('scheduledTime', formattedTime);
    } else {
      handleChange('scheduledTime', null);
    }
  };

  const foundOption = formTodo.scheduledTime
    ? alarmOptions.find(opt => opt.value === formTodo.notificationTime)
    : null;

  const notificationTimeDisplay = foundOption?.label ?? '없음';

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
        <>
          <SelectGroup
            options={[
              {
                id: 0,
                label: '카테고리',
                value: selectedCategory?.name ?? '미분류',
                dropdownOptions: [
                  {
                    label: '미분류',
                    value: null,
                    icon: <CategoryColorCircle size="w-2 h-2" color="#a3a3a3" />,
                  },
                  ...categories.map(category => {
                    return {
                      label: category.name,
                      value: category.id,
                      icon: <CategoryColorCircle size="w-2 h-2" color={category.color} />,
                    };
                  }),
                ],
                onSelect: value => {
                  if (value === null) {
                    handleChange('categoryId', null);
                  } else {
                    handleChange('categoryId', Number(value));
                  }
                },
                icon: selectedCategory ? (
                  <CategoryColorCircle size="w-2 h-2" color={selectedCategory.color} />
                ) : (
                  <CategoryColorCircle size="w-2 h-2" color="#a3a3a3" />
                ),
              },
            ]}
            openSelectId={openSelectId}
            onToggle={handleToggle}
          />
        </>

        <>
          <SelectGroup
            options={[
              {
                id: 1,
                label: '시간 선택',
                value: scheduledTimeDisplay,
                customContent: (
                  <TimePicker
                    initialTime={scheduledTimeDate}
                    onTimeChange={handleTimeChange}
                    onClose={() => handleToggle(null)}
                  />
                ),

                onSelect: value => handleChange('scheduledTime', value),
              },
              {
                id: 2,
                label: '알림',
                value: notificationTimeDisplay,
                dropdownOptions: alarmOptions.map(alarm => ({
                  label: alarm.label,
                  value: alarm.value,
                })),
                onSelect: value => handleChange('notificationTime', value),
                disabled: !formTodo.scheduledTime,
              },
            ]}
            openSelectId={openSelectId}
            onToggle={handleToggle}
          />
        </>
      </div>
    </>
  );
};

export default TodoForm;
