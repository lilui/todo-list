import { Component } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent {

  constructor() { }

  todoList: TodoItem[] = [
    {title: 'install NodeJS', dueDate: new Date('2020-05-23')},
  ];

  todoItemCreate(todoItem: TodoItem): void {
    this.todoList.push(todoItem);
  }

}
