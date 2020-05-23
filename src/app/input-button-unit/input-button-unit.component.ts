import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss']
})
export class InputButtonUnitComponent implements OnInit {

  title = 'Hello World 2';


  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
  constructor() {
    this.changeTitle('My first Angular App');
  }

  ngOnInit(): void {
    this.changeTitle('My first Angular App - you cant see me');
    this.title = 'Angular rules';
    this.changeTitle('My first Angular App 2');
  }

}
