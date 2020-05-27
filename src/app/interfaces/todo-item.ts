export interface TodoItem {
  readonly id: string | undefined;
  readonly title: string;
  readonly dueDate: Date | string;
  readonly completed?: boolean;
}
