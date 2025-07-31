import { CreatedTodo } from '@/entities/todos/types/TodoTypes';
import { Circle, Ellipsis } from 'lucide-react';
import React, { useState } from 'react';

interface TodoItemProps {
  todo: CreatedTodo;
  handleToggle: (id: string) => void;
}

const TodoItem = ({ todo, handleToggle }: TodoItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`px-1 py-2 space-x-3 flex ${todo.dueTime ? 'items-start' : 'items-center'}`}>
      <button onClick={() => handleToggle(todo.id)}>
        {todo.completed ? (
          <Circle className="w-6 h-6 rounded-full bg-gray-400 text-gray-400" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <div className="w-full text-left">
        <p
          className={`text-sm ${
            todo.completed ? 'line-through text-destructive font-medium' : 'text-white'
          }`}
        >
          {todo.title}
        </p>
        {todo.dueTime && (
          <p className={`text-xs ${todo.completed ? 'text-destructive' : ' text-gray-400'}`}>
            {todo.dueTime}
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
