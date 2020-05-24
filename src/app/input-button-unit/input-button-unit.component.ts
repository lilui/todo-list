import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../service/utility/utility.service';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss'],
})
export class InputButtonUnitComponent {

  @Output() todoItemCreate = new EventEmitter<TodoItem>();

  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder, utilityService: UtilityService) {
    this.formGroup = formBuilder.group({
      name: ['Hello World', Validators.required],
      dueDate: [utilityService.getCurrentDateString(), Validators.required],
    });
  }

  changeTitle() {
    const dueDate = new Date(this.formGroup.value.dueDate);
    const todoItem: TodoItem = {
      completed: false,
      dueDate,
      title: this.formGroup.value.name,
    };
    this.todoItemCreate.emit(todoItem);
  }

  isInvalidControl(formControl: AbstractControl): boolean {
    return formControl.touched && formControl.invalid;
  }
}
