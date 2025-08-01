'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Plus, TrendingUp } from 'lucide-react';
import BottomNavigation from '@/widgets/bottom-navigation/BottomNavigation';
import HeaderNavigation from '@/widgets/header/HeaderNavigation';
import { CreateTodoRequest } from '@/entities/todos/types/TodoTypes';
import TodoCreateModal from '@/entities/todos/components/modal/TodoCreateModal';
import { todoListData } from '@/entities/todos/constants/TodoListData';
import { categoryData } from '@/entities/todos/constants/CategoryData';
import CustomCalendar from '@/entities/todos/components/calendar/CustomCalendar';
import GroupedTodoLists from '@/entities/todos/components/list/GroupedTodoLists';
import { useCreateTodo, useGetTodosByMonth, useUpdateTodo } from '@/entities/todos/hooks/useTodos';
import { Category } from '@/entities/todos/types/CategoryTypes';

const TodosPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<Category[]>(categoryData);
  // const [todos, setTodos] = useState<Todo[]>(todoListData);
  const [lastAddedTodoId, setLastAddedTodoId] = useState<number | null>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const { data: todos = [], isLoading } = useGetTodosByMonth(year, month);
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const selectedDateString = selectedDate.toLocaleDateString('sv-SE'); // "2025-07-28"
  const todosForSelectedDate = todos.filter(todo => todo.scheduledDate === selectedDateString);

  useEffect(() => {
    // 페이지 진입 애니메이션
    document.body.classList.add('page-enter');
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('page-enter');
    };
  }, []);

  const toggleTodo = (id: number) => {
    const current = todos.find(todo => todo.id === id);
    if (!current) return;

    updateTodo({ ...current, isDone: !current.isDone });
    // setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.isDone } : todo)));
  };

  const cleanTodoData = (todoData: CreateTodoRequest): CreateTodoRequest => {
    return {
      title: todoData.title,
      category: todoData.category,
      scheduledDate: todoData.scheduledDate,
      scheduledTime: todoData.scheduledTime ? `${todoData.scheduledTime}:00` : null,
      notificationTime: todoData.notificationTime
        ? `${todoData.scheduledDate}T${todoData.notificationTime.length === 5 ? `${todoData.notificationTime}:00` : todoData.notificationTime}`
        : null,
    };
  };

  const addTodo = (todoData: CreateTodoRequest) => {
    const newId = Date.now();

    // const newTodo: Todo = {
    //   ...todoData,
    //   id: newId,
    //   createdAt: new Date().toISOString().split('T')[0],
    //   scheduledDate: todoData.scheduledDate || selectedDateString,
    // };
    // setTodos(prevTodos => [newTodo, ...prevTodos]);

    console.log(cleanTodoData(todoData));
    createTodo(cleanTodoData(todoData));
    setShowCreateModal(false);
    setLastAddedTodoId(newId);
  };

  // const addCategory = (categoryData: Omit<Category, "id">) => {
  //   const newCategory: Category = {
  //     ...categoryData,
  //     id: Date.now().toString(),
  //   };
  //   setCategories([...categories, newCategory]);
  // };

  // const updateCategory = (id: string, categoryData: Partial<Category>) => {
  //   setCategories(
  //     categories.map((cat) =>
  //       cat.id === id ? { ...cat, ...categoryData } : cat
  //     )
  //   );
  // };

  // const deleteCategory = (id: string) => {
  //   setCategories(categories.filter((cat) => cat.id !== id));
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.categoryId === id ? { ...todo, categoryId: "personal" } : todo
  //     )
  //   );
  // };

  // const formatTime = (timeString?: string) => {
  //   if (!timeString) return '';
  //   const [hours, minutes] = timeString.split(':');
  //   const hour = Number.parseInt(hours);
  //   const ampm = hour >= 12 ? '오후' : '오전';
  //   const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  //   return `${ampm} ${displayHour}:${minutes}`;
  // };

  const formatSelectedDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '어제';
    } else {
      return date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      });
    }
  };

  const getTodosForDate = (date: Date) => {
    const dateString = date.toLocaleDateString('sv-SE');
    return todos.filter(todo => todo.scheduledDate === dateString);
  };

  const activeTodosForDateCount = todosForSelectedDate.filter(todo => !todo.isDone).length;
  // const completedTodosForDate = todosForSelectedDate.filter(todo => todo.completed).length;
  const totalTodosForDateCount = todosForSelectedDate.length;

  const getStatusMessage = () => {
    if (totalTodosForDateCount === 0) {
      return '할 일이 없습니다';
    }
    if (activeTodosForDateCount === 0) {
      return '모든 할 일을 완료했습니다';
    }
    return `${activeTodosForDateCount}개의 할 일이 남았습니다`;
  };

  const getStatusIcon = () => {
    if (totalTodosForDateCount === 0) return null;
    if (activeTodosForDateCount === 0) return <CheckCircle2 className="h-4 w-4 text-gray-400" />;
    return <TrendingUp className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="bg-black">
      <main className="px-4 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden h-[100dvh] pb-24">
        <HeaderNavigation currentPage="todos" />

        <div className={`slide-up mb-4 ${isVisible ? '' : 'opacity-0'}`}>
          <CustomCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            getTodosForDate={getTodosForDate}
          />
        </div>

        {/* 날짜 헤더 - 애니메이션 적용 */}
        <header
          className={`flex items-center justify-between pt-2 slide-in-left stagger-1 mb-4 ${
            isVisible ? '' : 'opacity-0'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-xl font-bold text-white">{formatSelectedDate(selectedDate)}</h2>
              {getStatusIcon()}
            </div>
            <p className="text-sm text-gray-500">{getStatusMessage()}</p>
          </div>
          <button
            className="rounded-md h-8 w-8 hover:bg-accent"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-8 w-8" strokeWidth={1.6} />
          </button>
        </header>

        {/* 할 일 목록 - 스태거 애니메이션 */}
        <GroupedTodoLists
          todos={todosForSelectedDate}
          handleToggle={toggleTodo}
          lastAddedTodoId={lastAddedTodoId}
        />

        {/* 빈 상태 - 애니메이션 적용 */}
        {/* {todosForSelectedDate.length === 0 && (
          <div
            className={`text-center py-12 fade-in stagger-3 ${
              isVisible ? '' : 'opacity-0'
            }`}
          >
            <Circle className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-300 mb-1">
              {formatSelectedDate(selectedDate)}에 할 일이 없습니다
            </h3>
            <p className="text-sm text-gray-500">
              아래 버튼을 눌러 새로운 할 일을 추가해보세요
            </p>
          </div>
        )} */}
      </main>

      <TodoCreateModal
        isOpen={showCreateModal}
        setIsOpen={setShowCreateModal}
        onSubmit={addTodo}
        categories={categories}
        initialTodoDate={selectedDate}
        // selectedDateLabel={formatSelectedDate(selectedDate)}
      />

      <BottomNavigation />

      {/* <CategoryManager
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        categories={categories}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      /> */}
    </div>
  );
};

export default TodosPage;
