import CategoryTodoListCard from '@/features/todos/components/Todolist/CategoryTodoListCard';
import { categoryData } from '@/features/todos/constants/CategoryData';
import { CreatedTodo } from '@/features/todos/types/TodoTypes';

interface GroupedTodoListsProps {
  todos: CreatedTodo[];
  handleToggle: (id: string) => void;
  lastAddedTodoId?: string | null;
}

const GroupedTodoLists = ({ todos, handleToggle, lastAddedTodoId }: GroupedTodoListsProps) => {
  const todosByCategory = categoryData.map(category => {
    const filteredTodos = todos.filter(todo => todo.categoryId === category.id);

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
