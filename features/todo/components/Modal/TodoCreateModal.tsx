import DeleteButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoForm from "@/features/todo/components/Form/TodoForm";
import DatePicker from "@/features/todo/components/Select/DatePicker";
import { Category, Todo } from "@/features/todo/types/TodoTypes";
import { getIconComponent } from "@/lib/icons";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { useState } from "react";

interface TodoCreateModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (todo: Todo) => void;
  categories: Category[];
  defaultDate: string;
  selectedDateLabel: string;
}

const TodoCreateModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  categories,
  defaultDate,
  selectedDateLabel,
}: TodoCreateModalProps) => {
  const [formTodo, setFormTodo] = useState<Todo>({
    title: "",
    targetDate: "",
    completed: false,
    categoryId: categories[0]?.id,
    dueTime: "",
    alarm: "",
  });
  const [openSelectId, setOpenSelectId] = useState<number | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleChange = (field: keyof Todo, value: string) => {
    setFormTodo((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setOpenSelectId(null);
    setFormTodo({
      title: "",
      targetDate: "",
      completed: false,
      categoryId: categories[0]?.id || "",
      dueTime: "",
      alarm: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formTodo.title.trim()) {
      onSubmit(formTodo);
      // // setShowTimeSettings(false)
    }
    handleClose();
  };

  const handleDelete = () => {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <Card className="w-full max-h-[100dvh] overflow-hidden bg-gray-900 border-gray-800 rounded-t-3xl rounded-b-none border-t ">
        <CardHeader className="p-0 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleClose}
                className="text-gray-300 hover:text-white w-10 h-10 rounded-md hover:bg-accent"
              >
                <ChevronLeft className="w-10 h-10" strokeWidth={1.6} />
              </button>

              <CardTitle
                className="text-xl font-bold text-white cursor-pointer hover:bg-gray-500"
                onClick={() => setIsDatePickerOpen((prev) => !prev)}
              >
                {selectedDateLabel}
              </CardTitle>
              {/* {isDatePickerOpen && (
                <div className="relative" ref={ref}>
                  <div className="absolute -top-3 left-0 !mx-8 w-fit z-50 text-white text-center backdrop-blur-lg bg-white/90 border border-white">
                    <DatePicker />
                  </div>
                </div>
              )} */}
            </div>

            <Button
              type="submit"
              variant="ghost"
              size="sm"
              onClick={handleSubmit}
              className="hover:text-white p-4"
            >
              <p className="text-xl font-bold text-white">등록</p>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-4 overflow-y-auto max-h-[calc(100dvh-120px)]">
          <TodoForm
            formTodo={formTodo}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            openSelectId={openSelectId}
            handleToggle={setOpenSelectId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoCreateModal;
