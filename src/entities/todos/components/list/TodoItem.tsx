import { Todo } from '@/entities/todos/types/TodoTypes';
import { Circle, Ellipsis } from 'lucide-react';
import React, { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  handleToggle: (id: number) => void;
}

const TodoItem = ({ todo, handleToggle }: TodoItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`px-1 py-2 space-x-3 flex ${todo.notificationTime ? 'items-start' : 'items-center'}`}
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
        {todo.notificationTime && (
          <p className={`text-xs ${todo.isDone ? 'text-destructive' : ' text-gray-400'}`}>
            {todo.notificationTime}
          </p>
        )}
      </div>

      <button onClick={() => setIsOpen(prev => !prev)}>
        <Ellipsis className="w-4 h-4 text-gray-500 relative" />
      </button>
    </div>
  );
};

export default TodoItem;
