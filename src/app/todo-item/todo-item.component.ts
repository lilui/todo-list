import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { UtilityService } from '../service/utility/utility.service';
import { TodoItemChange } from '../interfaces/todo-item-change';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {

  @Input() item: TodoItem | undefined;

  @Output() remove = new EventEmitter<TodoItem>();

  @Output() update = new EventEmitter<TodoItemChange>();

  private readonly today = new Date();

  constructor(private utilityService: UtilityService) {

  }

  public isItemDelayed(): boolean {
    return this.item !== undefined && this.utilityService.isDateBefore(this.item.dueDate, this.today);
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  completeItem() {
    if (!this.item) {
      console.log('completeItem item undefined');
      return;
    }
    this.update.emit({
      item: this.item,
      changes: {completed: !this.item.completed},
    });

  }
}
