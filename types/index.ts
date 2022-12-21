export interface Task {
  id: number;
  category_id: number;
  title: string;
  isCompleted: boolean;
}

export interface Category {
  id: number;
  title: string;
}

export interface TaskTab {
  title: string;
  value: string;
  tasks: Task[];
}

export interface TaskFilters {
  category_id: number | null;
}
