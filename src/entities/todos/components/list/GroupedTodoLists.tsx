import CategoryTodoListCard from '@/entities/todos/components/list/CategoryTodoListCard';
import { categoryData } from '@/entities/todos/constants/CategoryData';
import { Todo } from '@/entities/todos/types/TodoTypes';

interface GroupedTodoListsProps {
  todos: Todo[];
  handleToggle: (id: number) => void;
  lastAddedTodoId?: number | null;
}

const GroupedTodoLists = ({ todos, handleToggle, lastAddedTodoId }: GroupedTodoListsProps) => {
  const todosByCategory = categoryData.map(category => {
    const filteredTodos = todos.filter(todo => todo.category.id === category.id);

    return {
      category,
      todos: filteredTodos,
    };
  });

  return (
    <div className="space-y-4">
      {todosByCategory.map(({ category, todos }) =>
        todos.length > 0 ? (
          <CategoryTodoListCard
            key={category.id}
            todoList={todos}
            handleToggle={handleToggle}
            lastAddedTodoId={
              todos.some(todo => todo.id === lastAddedTodoId) ? lastAddedTodoId : undefined
            }
          />
        ) : null,
      )}
    </div>
  );
};

export default GroupedTodoLists;
