import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodosByMonth,
  markDoneTodo,
  updateTodo,
} from '@/entities/todos/api/todosApi';
import { CreateTodoRequest, Todo } from '@/entities/todos/types/TodoTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetTodosByMonth = (year: number, month: number) => {
  return useQuery<Todo[]>({
    queryKey: ['todos', { year, month }],
    queryFn: () => getTodosByMonth(year, month),
  });
};

export const useGetTodo = (id: number) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useMarkDoneTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; isDone: boolean }) => markDoneTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
