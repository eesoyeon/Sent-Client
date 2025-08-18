import GroupedTodoListCard from '@/entities/todos/components/list/GroupedTodoListCard';
import { Category } from '@/entities/todos/types/CategoryTypes';
import { Todo } from '@/entities/todos/types/TodoTypes';

interface GroupedTodoListsProps {
  todos: Todo[];
  categories: Category[];
  handleToggle: (id: number) => void;
  lastAddedTodoId?: number | null;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const GroupedTodoLists = ({
  todos,
  categories,
  handleToggle,
  lastAddedTodoId,
  onEdit,
  onDelete,
}: GroupedTodoListsProps) => {
  const todosByCategory = categories.map(category => {
    const filteredTodos = todos.filter(todo => todo.category?.id === category.id);
    return {
      category,
      todos: filteredTodos,
    };
  });

  const uncategorizedTodos = todos.filter(todo => !todo.category || todo.category.id === null);

  const uncategorizedCategory = {
    id: -1, // 음수 ID로 실제 카테고리와 충돌 방지
    name: '미분류',
    color: '#a3a3a3', // 회색
    icon: '',
  };

  const allTodosByCategory = [
    ...todosByCategory,
    ...(uncategorizedTodos.length > 0
      ? [{ category: uncategorizedCategory, todos: uncategorizedTodos }]
      : []),
  ];

  return (
    <div className="space-y-4">
      {allTodosByCategory.map(({ category, todos }) =>
        todos.length > 0 ? (
          <GroupedTodoListCard
            key={category.id}
            todoList={todos}
            category={category}
            handleToggle={handleToggle}
            lastAddedTodoId={
              todos.some(todo => todo.id === lastAddedTodoId) ? lastAddedTodoId : undefined
            }
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : null,
      )}
    </div>
  );
};

export default GroupedTodoLists;
