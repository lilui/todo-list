import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../service/todo-list/todo-list.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {

  todoList: TodoItem[] = [];

  constructor(private todoListService: TodoListService) {

  }

  todoItemCreate(todoItem: TodoItem): void {
    this.todoListService.todoItemCreate(todoItem);
  }

  public ngOnInit(): void {
    this.todoList = this.todoListService.getTodoList();
  }

  removeItem(item: TodoItem) {
    this.todoListService.deleteItem(item);
  }

  updateItem(item: TodoItem, changes: { completed: boolean }) {
    this.todoListService.updateItem(item, changes);
  }
}
