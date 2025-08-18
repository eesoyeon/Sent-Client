import { Todo } from '@/entities/todos/types/TodoTypes';
import { Button } from '@/shared/ui/radix-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/radix-ui/dropdown-menu';
import { alarmOptions } from '@/entities/todos/constants/AlarmOptionData';
import { AlarmClock, Circle, Ellipsis } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  handleToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, handleToggle, onEdit, onDelete }: TodoItemProps) => {
  const scheduledTimeDate = todo.scheduledTime
    ? new Date(`2000-01-01T${todo.scheduledTime}`)
    : null;

  const scheduledTimeDisplay = scheduledTimeDate
    ? scheduledTimeDate.toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: '2-digit',
        second: undefined,
        hour12: true,
      })
    : null;

  const notificationTimeDisplay = (() => {
    if (!todo.scheduledDate || !todo.scheduledTime || !todo.notificationTime) return null;

    const scheduledDateObj = new Date(`${todo.scheduledDate}T${todo.scheduledTime}`);
    const notificationDateObj = new Date(todo.notificationTime);

    // ✅ 시간 차이(분 단위)
    const diffInMinutes = (scheduledDateObj.getTime() - notificationDateObj.getTime()) / 60000;

    // ✅ alarmOptions에서 매칭
    const option = alarmOptions.find(opt => Number(opt.value) === diffInMinutes);

    return option ? option.label : null;
  })();
  return (
    <div
      className={`p-1 space-x-3 flex relative ${todo.scheduledTime ? 'items-start' : 'items-center'}`}
    >
      <button onClick={() => handleToggle(todo.id)}>
        {todo.isDone ? (
          <Circle className="w-6 h-6 rounded-full bg-gray-400 text-gray-400" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <div className="w-full text-left">
        <p
          className={`text-sm ${
            todo.isDone ? 'line-through text-destructive font-medium' : 'text-white'
          }`}
        >
          {todo.title}
        </p>
        <div className="flex items-center justify-start">
          {todo.scheduledTime && (
            <p
              className={`w-16 text-xs font-medium ${todo.isDone ? 'text-destructive' : ' text-gray-500'}`}
            >
              {scheduledTimeDisplay}
            </p>
          )}
          {todo.notificationTime && (
            <div className="flex items-center justify-center gap-1">
              <AlarmClock
                className={`w-3 ${todo.isDone ? 'text-destructive' : ' text-gray-500'}`}
              />
              <p
                className={`text-xs font-medium ${todo.isDone ? 'text-destructive' : ' text-gray-500'}`}
              >
                {notificationTimeDisplay}
              </p>
            </div>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Ellipsis className="w-4 h-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={0}
          align="end"
          className=" bg-gray-900 border-none text-gray-300 font-medium px-3 py-2 space-y-0 shadow-md"
        >
          <DropdownMenuItem onClick={() => onEdit(todo)}>수정</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(todo.id)}>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TodoItem;
