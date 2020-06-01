import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../service/todo-list/todo-list.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit, OnDestroy {

  uncompletedList: TodoItem[] = [];
  completedList: TodoItem[] = [];
  private todoListSub: Subscription | undefined;

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit(): void {
    this.todoListSub = this.todoListService.getTodoList()
      .pipe(
        finalize(() => console.log('completed')),
      )
      .subscribe(
        (value) => this.uncompletedList = value,
        (error) => console.error('Error while subscribing', error),
      ); // subscribe to observable and delete subscription
    this.isCompletedCheck(this.uncompletedList);
  }

  isCompletedCheck(uncompletedList: TodoItem[]) {
    if (uncompletedList) {
      for (let i = 0; i < uncompletedList.length; i++) {
        if (uncompletedList[i].completed) {
          this.completedList.push(uncompletedList[i]);
          this.uncompletedList.slice(i);
          console.log('completed list: ', this.completedList[i], 'uncompleted list', this.completedList[i]);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.todoListSub) {
      this.todoListSub.unsubscribe();
    }
  }

  createItem(todoItem: TodoItem | undefined): void {
    if (todoItem) {
      this.todoListService.createItem(todoItem);
    }
  }

  updateItem(todoItem: TodoItem | undefined) {
    if (todoItem) {
      this.todoListService.updateItem(todoItem);
      this.isCompletedCheck(this.uncompletedList);
    }
  }

  removeItem(todoItem: TodoItem | undefined) {
    if (todoItem) {
      this.todoListService.deleteItem(todoItem);
    }
  }

}
