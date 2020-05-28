import { Injectable } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const todoListStorageKey = 'Todo_List';

const defaultTodoList: TodoItem[] = [
  {
    id: undefined,
    title: 'install NodeJS',
    dueDate: new Date('2020-05-23'),
    completed: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {

  private readonly todoList = new BehaviorSubject<TodoItem[]>([]);

  constructor(private storageService: StorageService) {
    let initialData = storageService.getData<TodoItem[]>(todoListStorageKey);
    if (!initialData || initialData.length === 0) {
      initialData = [];
      for (const todoItem of defaultTodoList) {
        initialData.push(this.createItem(todoItem));
      }
    }

    this.todoList.next(initialData);
  }

  getTodoList(): Observable<TodoItem[]> {
    return this.todoList.pipe(map(items => items.slice()));
  }

  createItem(todoItem: TodoItem): TodoItem {
    const newTodoItem = {...todoItem, id: this.createId()};
    this.todoList.next(this.existingTodoItems.concat(newTodoItem));
    this.saveList();

    return newTodoItem;
  }

  private get existingTodoItems() {
    return this.todoList.value || [];
  }

  updateItem(item: TodoItem): void {
    if (!item.id) {
      console.warn('Cannot save item without ID', item);
    }

    const index = this.findIndex(item);
    if (index >= 0) {
      this.existingTodoItems[index] = item;
      this.saveList();
    }
  }

  deleteItem(item: TodoItem): void {
    if (!item.id) {
      console.warn('Cannot delete item without ID', item);
    }

    const index = this.findIndex(item);
    if (index >= 0) {
      this.existingTodoItems.splice(index, 1);
      this.saveList();
    }
  }

  private createId(): string {
    return new Date().toISOString();
  }

  private findIndex(itemToFind: TodoItem): number {
    return this.existingTodoItems.findIndex(todoItemInList => todoItemInList.id === itemToFind.id);
  }

  private saveList(): void {
    this.storageService.setData(todoListStorageKey, this.existingTodoItems);
    // emit new list
  }

}

