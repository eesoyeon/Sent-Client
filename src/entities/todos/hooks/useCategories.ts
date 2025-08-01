import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryByName,
  updateCategory,
} from '@/entities/todos/api/categoriesApi';
import { Category, CreateCategoryRequest } from '@/entities/todos/types/CategoryTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
};

export const useGetCategoryByName = (name: string) => {
  return useQuery<Category>({
    queryKey: ['categories', name],
    queryFn: () => getCategoryByName(name),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Category) => updateCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
