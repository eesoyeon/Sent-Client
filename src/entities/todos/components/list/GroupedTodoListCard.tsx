import { Card, CardContent } from '@/shared/ui/radix-ui/card';
import CategoryBadge from '@/entities/todos/components/category/CategoryBadge';
import TodoItem from '@/entities/todos/components/list/TodoItem';
import { Todo } from '@/entities/todos/types/TodoTypes';
import { motion } from 'framer-motion';
import { Category } from '@/entities/todos/types/CategoryTypes';

interface CategoryTodoListCardProps {
  todoList: Todo[];
  category: Category;
  handleToggle: (id: number) => void;
  lastAddedTodoId?: number | null;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const GroupedTodoListCard = ({
  todoList,
  category,
  handleToggle,
  lastAddedTodoId,
  onEdit,
  onDelete,
}: CategoryTodoListCardProps) => {
  return (
    <Card className={`p-4 space-y-3 bg-transparent`}>
      <CategoryBadge category={category} />

      <CardContent className="p-0">
        {todoList.map(todo => {
          const isNew = todo.id === lastAddedTodoId;

          return isNew ? (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <TodoItem
                todo={todo}
                handleToggle={handleToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </motion.div>
          ) : (
            <div key={todo.id}>
              <TodoItem
                todo={todo}
                handleToggle={handleToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default GroupedTodoListCard;
