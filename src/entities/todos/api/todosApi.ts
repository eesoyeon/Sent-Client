import { CreateTodoRequest, Todo, UpdateTodoRequest } from '@/entities/todos/types/TodoTypes';
import axiosInstance from '@/shared/lib/axios';

export const getTodosByMonth = async (year: number, month: number): Promise<Todo[]> => {
  const res = await axiosInstance.get(`/api/v1/todos/month?year=${year}&month=${month}`);
  return res.data.data;
};

export const getTodo = async (id: number): Promise<Todo> => {
  const res = await axiosInstance.get(`/api/v1/todos/${id}`);
  return res.data;
};

export const createTodo = async (data: CreateTodoRequest): Promise<Todo> => {
  const res = await axiosInstance.post('/api/v1/todos', data);
  return res.data;
};

export const updateTodo = async (id: number, data: UpdateTodoRequest): Promise<Todo> => {
  const res = await axiosInstance.patch(`/api/v1/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/v1/todos/${id}`);
};

export const markDoneTodo = async ({
  id,
  isDone,
}: {
  id: number;
  isDone: boolean;
}): Promise<void> => {
  const res = await axiosInstance.patch(`/api/v1/todos/${id}/done?done=${isDone}`, { isDone });
  return res.data;
};
