import {Component} from '@angular/core';
import {TodoItem} from './interfaces/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
  todoList: TodoItem[] = [
    {title: 'install NodeJS', dueDate: new Date('2020-05-23')},
  ];

  todoItemCreate(todoItem: TodoItem): void {
    this.todoList.push(todoItem);
  }
}
