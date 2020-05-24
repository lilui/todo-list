import { Injectable } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item';
import { StorageService } from '../storage/storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList: TodoItem[] = [
  {title: 'install NodeJS', dueDate: new Date('2020-05-23')},
];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {

  todoList: TodoItem[];

  constructor(private storageService: StorageService) {
    this.todoList = storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  todoItemCreate(todoItem: TodoItem): void {
    this.todoList.push(todoItem);
    this.saveList();
  }

  getTodoList() {
    return this.todoList;
  }

  updateItem(item: TodoItem, changes: { completed: boolean }) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = {...item, ...changes};
    this.saveList();
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }
}

