import { Card, CardContent } from '@/shared/ui/radix-ui/card';
import CategoryBadge from '@/entities/todos/components/category/CategoryBadge';
import TodoItem from '@/entities/todos/components/list/TodoItem';
import { categoryData } from '@/entities/todos/constants/CategoryData';
import { CreatedTodo } from '@/entities/todos/types/TodoTypes';
import { motion } from 'framer-motion';

interface CategoryTodoListCardProps {
  todoList: CreatedTodo[];
  handleToggle: (id: string) => void;
  lastAddedTodoId?: string | null;
}

const CategoryTodoListCard = ({
  todoList,
  handleToggle,
  lastAddedTodoId,
}: CategoryTodoListCardProps) => {
  const categoryId = todoList[0]?.categoryId;
  const category = categoryData.find(category => category.id === categoryId);

  // const sortedTodosByCompleted = [...todoList].sort(
  //   (a, b) => Number(a.completed) - Number(b.completed),
  // );

  return (
    <Card className={`p-4 space-y-2 bg-transparent`}>
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
              <TodoItem todo={todo} handleToggle={handleToggle} />
            </motion.div>
          ) : (
            <div key={todo.id}>
              <TodoItem todo={todo} handleToggle={handleToggle} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CategoryTodoListCard;
