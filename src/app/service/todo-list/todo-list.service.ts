import { Injectable } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item';
import { StorageService } from '../storage/storage.service';

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

  private readonly todoList: TodoItem[] = [];

  constructor(private storageService: StorageService) {
    let initialData = storageService.getData<TodoItem[]>(todoListStorageKey);
    if (!initialData || initialData.length === 0) {
      initialData = [];
      for (const todoItem of defaultTodoList) {
        initialData.push(this.createItem(todoItem));
      }
    }

    this.todoList = initialData;
  }

  getTodoList(): TodoItem[] {
    return this.todoList;
  }

  createItem(todoItem: TodoItem): TodoItem {
    const newTodoItem = {...todoItem, id: new Date().toISOString()};
    this.todoList.push(newTodoItem);
    this.saveList();

    return newTodoItem;
  }

  updateItem(item: TodoItem): void {
    if (!item.id) {
      console.warn('Cannot save item without ID', item);
    }

    const index = this.findIndex(item);
    if (index >= 0) {
      this.todoList[index] = item;
      this.saveList();
    }
  }

  deleteItem(item: TodoItem): void {
    if (!item.id) {
      console.warn('Cannot delete item without ID', item);
    }

    const index = this.findIndex(item);
    if (index >= 0) {
      this.todoList.splice(index, 1);
      this.saveList();
    }
  }

  private findIndex(itemToFind: TodoItem): number {
    return this.todoList.findIndex(todoItemInList => todoItemInList.id === itemToFind.id);
  }

  private saveList(): void {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

}

