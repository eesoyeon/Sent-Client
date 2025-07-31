import DeleteButton from '@/widgets/button/DeleteButton';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import TodoForm from '@/entities/todos/components/form/TodoForm';
import DatePicker from '@/entities/todos/components/select/DatePicker';
import { Category, Todo } from '@/entities/todos/types/TodoTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';

interface TodoCreateModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (todo: Todo) => void;
  categories: Category[];
  initialTodoDate: Date;
}

const TodoCreateModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  categories,
  initialTodoDate,
}: TodoCreateModalProps) => {
  const selectedDateString = initialTodoDate.toLocaleDateString('sv-SE'); // "2025-07-28"

  const [formTodo, setFormTodo] = useState<Todo>({
    title: '',
    scheduleDate: selectedDateString,
    completed: false,
    categoryId: categories[0]?.id,
    dueTime: '',
    alarm: '',
  });
  const [openSelectId, setOpenSelectId] = useState<number | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // const [targetDate, setTargetDate] = useState(defaultDate);

  const getLocalISODateString = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const handleChange = (field: keyof Todo, value: string) => {
    setFormTodo(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setOpenSelectId(null);
    setFormTodo({
      title: '',
      scheduleDate: '',
      completed: false,
      categoryId: categories[0]?.id || '',
      dueTime: '',
      alarm: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formTodo.title.trim()) {
      onSubmit(formTodo);
    }
    handleClose();
  };

  const handleDelete = () => {};

  useEffect(() => {
    setFormTodo(prev => ({
      ...prev,
      scheduleDate: selectedDateString,
    }));
  }, [selectedDateString]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
        // className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
      >
        {/* <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"> */}
        <form onSubmit={handleSubmit} className="w-full">
          <Card className="w-full max-h-[100dvh] overflow-hidden bg-gray-900 border-gray-800 rounded-t-3xl rounded-b-none border-t flex flex-col">
            <CardHeader className="p-0 py-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={handleClose}
                    className="text-gray-300 hover:text-white w-10 h-10 rounded-md hover:bg-accent"
                  >
                    <ChevronLeft className="w-10 h-10" strokeWidth={1.6} />
                  </button>

                  <CardTitle
                    className="text-xl font-bold text-white rounded cursor-pointer w-fit hover:bg-gray-800"
                    onClick={() => setIsDatePickerOpen(prev => !prev)}
                  >
                    {getLocalISODateString(initialTodoDate)}
                  </CardTitle>
                  {/* {isDatePickerOpen && (
                <div className="relative" ref={ref}>
                  <div className="absolute -top-3 left-0 !mx-8 w-fit z-50 text-white text-center backdrop-blur-lg bg-white/90 border border-white">
                    <DatePicker />
                  </div>
                </div>
              )} */}
                </div>

                <Button type="submit" variant="ghost" size="sm" className="hover:text-white p-4">
                  <p className="text-xl font-bold text-white">등록</p>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="px-4 flex-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
              <TodoForm
                formTodo={formTodo}
                handleChange={handleChange}
                openSelectId={openSelectId}
                handleToggle={setOpenSelectId}
              />
            </CardContent>
          </Card>
        </form>
        {/* </div> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoCreateModal;
