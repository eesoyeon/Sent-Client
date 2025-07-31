type ISODateString = string; // "2025-07-21"
// type ISODateTimeString = string; // "2025-07-21T09:15:00Z"

export interface Todo {
  title: string;
  scheduleDate: ISODateString;
  completed: boolean;
  categoryId: string;
  alarm?: string;
  dueTime?: string;
  // priority?: "high" | "medium" | "low";
  // dueDate?: string;
}

export interface CreatedTodo extends Todo {
  id: string;
  createdAt: ISODateString;
  updatedAt?: ISODateString;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  colorCircle: React.ReactNode;
}
