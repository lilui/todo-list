import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../service/utility/utility.service';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss'],
})
export class InputButtonUnitComponent {

  @Output() todoItemChange = new EventEmitter<TodoItem | undefined>();
  @Output() todoItemSave = new EventEmitter<TodoItem | undefined>();

  formGroup: FormGroup;

  private todoItemValue: TodoItem | undefined = undefined;

  constructor(formBuilder: FormBuilder,
              private readonly utilityService: UtilityService) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      dueDate: [utilityService.getCurrentDateString(), Validators.required],
    });
  }

  @Input()
  set todoItem(todoItem: TodoItem | undefined) {
    this.todoItemValue = todoItem;

    if (this.todoItemValue) {
      this.formGroup.setValue({
        name: this.todoItemValue.title,
        dueDate: this.utilityService.formatDate(this.todoItemValue.dueDate),
      });
    }

    this.todoItemChange.emit(this.todoItemValue);
  }

  get todoItem(): TodoItem | undefined {
    return this.todoItemValue;
  }

  hasErrorMessage(formControl: AbstractControl): boolean {
    return formControl.touched && formControl.invalid;
  }

  save() {
    const dueDate = new Date(this.formGroup.value.dueDate);
    this.todoItem = {
      id: this.todoItemValue ? this.todoItemValue.id : undefined, // ternary operator
      title: this.formGroup.value.name,
      dueDate,
      completed: this.todoItemValue && this.todoItemValue.completed,
    };

    this.todoItemSave.emit(this.todoItemValue);
  }
}
