import { TodoItem } from './todo-item';

export interface TodoItemChange {
  item: TodoItem;
  changes: { completed: boolean };
}
