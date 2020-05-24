import { Injectable } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoList: TodoItem[] = [
    {title: 'install NodeJS', dueDate: new Date('2020-05-23')},
  ];

  todoItemCreate(todoItem: TodoItem): void {
    this.todoList.push(todoItem);
  }

  constructor() { }

  getTodoList() {
    return this.todoList;
  }
}

