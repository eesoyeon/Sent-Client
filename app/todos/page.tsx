'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, TrendingUp } from 'lucide-react';
import BottomNavigation from '@/widgets/bottom-navigation/BottomNavigation';
import HeaderNavigation from '@/widgets/header/HeaderNavigation';
import { CreateTodoRequest, Todo, UpdateTodoRequest } from '@/entities/todos/types/TodoTypes';
import TodoCreateModal from '@/entities/todos/components/modal/TodoCreateModal';
import CustomCalendar from '@/entities/todos/components/calendar/CustomCalendar';
import GroupedTodoLists from '@/entities/todos/components/list/GroupedTodoLists';
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodosByMonth,
  useMarkDoneTodo,
  useUpdateTodo,
} from '@/entities/todos/hooks/useTodos';
import { useGetCategories } from '@/entities/todos/hooks/useCategories';

const TodosPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastAddedTodoId, setLastAddedTodoId] = useState<number | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const { data: todos = [], isLoading } = useGetTodosByMonth(year, month);
  const { mutate: createTodoMutation } = useCreateTodo();
  const { mutate: updateTodoMutation } = useUpdateTodo();
  const { mutate: deleteTodoMutation } = useDeleteTodo();
  const { mutate: markDoneTodo } = useMarkDoneTodo();
  const { data: categories = [] } = useGetCategories();

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

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setTodoToEdit(null);
  };

  const handleEditTodo = (todo: Todo) => {
    setTodoToEdit(todo);
    setShowCreateModal(true);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation(id);
  };

  const toggleTodo = (id: number) => {
    const current = todos.find(todo => todo.id === id);
    console.log('✅ current todo:', current);
    if (!current) return;

    markDoneTodo({ id, isDone: !current.isDone });
  };

  const processTodoData = (todoData: CreateTodoRequest): CreateTodoRequest => {
    const newTodoData = { ...todoData };

    const [yy, mm, dd] = newTodoData.scheduledDate.split('-').map(Number);
    const [HH, MM] = (newTodoData.scheduledTime ?? '00:00').split(':').map(Number);

    if (newTodoData.scheduledTime && newTodoData.notificationTime) {
      // const scheduledDateObj = new Date(`${scheduledDateString}T${scheduledTimeString}`);
      const notificationMinutesAgo = Number(newTodoData.notificationTime);

      // ✅ UTC 기준 Date 생성
      let scheduledUtc = new Date(Date.UTC(yy, mm - 1, dd, HH, MM, 0));

      // 알림 시간 계산 (분 단위 빼기)
      scheduledUtc = new Date(scheduledUtc.getTime() - notificationMinutesAgo * 60_000);

      // ✅ ISO 8601 형식 (UTC, Z 포함)
      newTodoData.notificationTime = scheduledUtc.toISOString();
    } else {
      newTodoData.notificationTime = null;
    }

    newTodoData.scheduledTime = newTodoData.scheduledTime
      ? `${newTodoData.scheduledTime}:00`
      : null;

    return newTodoData;
  };

  const addTodo = (todoData: CreateTodoRequest) => {
    const newId = Date.now();

    createTodoMutation(processTodoData(todoData));
    handleCloseModal();
    setLastAddedTodoId(newId);
  };

  // const formatTime = (timeString?: string) => {
  //   if (!timeString) return '';
  //   const [hours, minutes] = timeString.split(':');
  //   const hour = Number.parseInt(hours);
  //   const ampm = hour >= 12 ? '오후' : '오전';
  //   const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  //   return `${ampm} ${displayHour}:${minutes}`;
  // };

  const updateTodo = (id: number, updatedTodoData: UpdateTodoRequest) => {
    const processedData = processTodoData(updatedTodoData as CreateTodoRequest);

    updateTodoMutation({ id, data: processedData });
    handleCloseModal();
  };

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
          categories={categories}
          handleToggle={toggleTodo}
          lastAddedTodoId={lastAddedTodoId}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />

        {/* 빈 상태 - 애니메이션 적용 */}
        {todosForSelectedDate.length === 0 && (
          <div className={`text-center py-12 fade-in stagger-3 ${isVisible ? '' : 'opacity-0'}`}>
            <Circle className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-300 mb-1">
              {formatSelectedDate(selectedDate)} 할 일이 없습니다
            </h3>
            <p className="text-sm text-gray-500">+ 버튼을 눌러 새로운 할 일을 추가해보세요</p>
          </div>
        )}
      </main>

      <TodoCreateModal
        isOpen={showCreateModal}
        setIsOpen={handleCloseModal}
        onSubmit={todoToEdit ? data => updateTodo(todoToEdit.id, data) : addTodo}
        categories={categories}
        initialTodoDate={selectedDate}
        initialTodoData={todoToEdit}
        // selectedDateLabel={formatSelectedDate(selectedDate)}
      />

      <BottomNavigation />
    </div>
  );
};

export default TodosPage;
