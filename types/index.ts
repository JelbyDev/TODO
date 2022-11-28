export interface Task {
  id: number;
  category_id: number;
  title: string;
  isCompleted: boolean;
  text?: string;
}

export interface TaskCategory {
  id: number;
  title: string;
}
