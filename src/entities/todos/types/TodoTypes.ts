import { Category } from '@/entities/todos/types/CategoryTypes';

type ISODateString = string; // "2025-07-21"

export interface Todo {
  id: number;
  title: string;
  category: Category;
  scheduledDate: ISODateString;
  isDone: boolean;
  scheduledTime: string | null;
  notificationTime: string | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  // priority?: "high" | "medium" | "low";
  // dueTime?: string;
  // dueDate?: string;
}

export interface CreateTodoRequest {
  title: string;
  category: string;
  scheduledDate: ISODateString;
  scheduledTime: string | null;
  notificationTime: string | null;
}
