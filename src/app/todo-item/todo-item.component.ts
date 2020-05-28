import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { UtilityService } from '../service/utility/utility.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {

  @Output() todoItemChange = new EventEmitter<TodoItem | undefined>();
  @Output() todoItemRemove = new EventEmitter<TodoItem | undefined>();

  isItemEditEnabled = false;

  private readonly today = new Date();

  private todoItemValue: TodoItem | undefined = undefined;

  constructor(private utilityService: UtilityService) {
  }

  @Input()
  public set todoItem(todoItem: TodoItem | undefined) {
    this.todoItemValue = todoItem;
    this.todoItemChange.emit(this.todoItemValue);
  }

  public get todoItem(): TodoItem | undefined {
    return this.todoItemValue;
  }

  isItemDelayed(): boolean {
    return this.todoItemValue !== undefined && this.utilityService.isDateBefore(this.todoItemValue.dueDate, this.today);
  }

  onTodoItemChange(todoItem: TodoItem | undefined) {
    if (this.todoItemValue !== todoItem) {
      this.disableItemEdit();
      this.todoItem = todoItem;
    }
  }

  removeItem() {
    this.todoItemRemove.emit(this.todoItemValue);
  }

  toggleItemComplete() {
    if (!this.todoItemValue) {
      return;
    }

    this.todoItem = {
      ...this.todoItemValue,
      completed: !this.todoItemValue?.completed,
    };
  }

  enableItemEdit() {
    this.isItemEditEnabled = true;
  }

  disableItemEdit() {
    console.log('disable item edit');
    this.isItemEditEnabled = false;
  }
}
