export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
  colorCircle?: React.ReactNode;
}

export interface CreateCategoryRequest {
  name: string;
  color: string;
  icon: string;
}
