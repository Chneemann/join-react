export interface Task {
  id?: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  subtasksTitle: string[];
  subtasksDone: boolean[];
  assigned: string[];
  creator: string;
  date: string;
}
