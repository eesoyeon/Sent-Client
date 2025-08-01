import { Category, CreateCategoryRequest } from '@/entities/todos/types/CategoryTypes';
import axiosInstance from '@/shared/lib/axios';

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get(`/api/v1/cateogories`);
  return res.data;
};

export const getCategoryByName = async (name: string): Promise<Category> => {
  const encodeName = encodeURIComponent(name);
  const res = await axiosInstance.get(`/api/v1/cateogories/search?name=${encodeName}`);
  return res.data;
};

export const createCategory = async (data: CreateCategoryRequest): Promise<Category> => {
  const res = await axiosInstance.post('/api/v1/categories', data);
  return res.data;
};

export const updateCategory = async (data: Category): Promise<Category> => {
  const res = await axiosInstance.patch(`/api/v1/categories/${data.id}`, data);
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/v1/categories/${id}`);
};
