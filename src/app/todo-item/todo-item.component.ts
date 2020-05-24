import { Component, Input } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { UtilityService } from '../service/utility/utility.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {

  @Input() item: TodoItem | undefined;

  private readonly today = new Date();


  constructor(private utilityService: UtilityService) {

  }

  public isItemDelayed(): boolean {
    if (this.item) {
      const dueDate = new Date(this.item.dueDate);
      return this.utilityService.isDateBefore(dueDate, this.today);
    }
    return false;
  }

}
