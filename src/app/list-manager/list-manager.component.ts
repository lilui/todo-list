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

  ngOnInit(): void {
    this.todoList = this.todoListService.getTodoList();
  }

  createItem(todoItem: TodoItem | undefined): void {
    if (todoItem) {
      this.todoListService.createItem(todoItem);
    }
  }

  updateItem(todoItem: TodoItem | undefined) {
    if (todoItem) {
      this.todoListService.updateItem(todoItem);
    }
  }

  removeItem(todoItem: TodoItem | undefined) {
    if (todoItem) {
      this.todoListService.deleteItem(todoItem);
    }
  }

}
