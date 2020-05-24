export interface TodoItem {
  title: string;
  dueDate: Date | string;
  completed?: boolean;
}
