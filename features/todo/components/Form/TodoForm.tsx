import SelectGroup from "@/components/SelectGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryData } from "@/features/todo/constants/CategoryData";
import {
  alarmOptions,
  timeOptions,
} from "@/features/todo/constants/TodoOptionData";
import { Todo } from "@/features/todo/types/TodoTypes";

interface TodoFormProps {
  formTodo: Todo;
  handleChange: (field: keyof Todo, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  openSelectId: number | null;
  handleToggle: (id: number | null) => void;
}

const TodoForm = ({
  formTodo,
  handleChange,
  handleSubmit,
  openSelectId,
  handleToggle,
}: TodoFormProps) => {
  const selectedCategory = categoryData.find(
    (category) => category.name === formTodo.categoryId
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <fieldset className="space-y-2 px-3 py-4">
        <Label htmlFor="title" className="text-sm font-medium text-gray-300">
          할 일
        </Label>
        <Input
          id="title"
          placeholder="내용을 입력하세요"
          value={formTodo.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="bg-transparent border-0 font-bold text-white text-2xl p-0"
          required
          autoFocus
        />
      </fieldset>

      <div className="mb-8 py-3">
        <SelectGroup
          options={[
            {
              id: 0,
              label: "카테고리",
              value: formTodo.categoryId,
              dropdownOptions: categoryData.map((category) => ({
                label: category.name,
                value: category.name,
                icon: category.colorCircle,
              })),
              onSelect: (value) => handleChange("categoryId", value),
              icon: selectedCategory?.colorCircle,
            },
          ]}
          openSelectId={openSelectId}
          onToggle={handleToggle}
        />
      </div>

      <div className="mb-8">
        <SelectGroup
          options={[
            {
              id: 1,
              label: "시간 선택",
              value: formTodo.dueTime || "없음",
              dropdownOptions: timeOptions.map((time) => ({
                label: time.label,
                value: time.value,
              })),
              onSelect: (value) => handleChange("dueTime", value),
            },
            {
              id: 2,
              label: "알림",
              value: formTodo.alarm || "없음",
              dropdownOptions: alarmOptions.map((alarm) => ({
                label: alarm.label,
                value: alarm.value,
              })),
              onSelect: (value) => handleChange("alarm", value),
            },
          ]}
          openSelectId={openSelectId}
          onToggle={handleToggle}
        />
      </div>
    </form>
  );
};

export default TodoForm;
