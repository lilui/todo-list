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
    return this.item !== undefined && this.utilityService.isDateBefore(this.item.dueDate, this.today);
  }

}
