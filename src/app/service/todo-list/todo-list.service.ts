import { Injectable } from '@angular/core';
import { TodoItem } from '../../interfaces/todo-item';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const todoListStorageKey = 'Todo_List';

const defaultTodoList: TodoItem[] = [
  {
    id: undefined,
    title: 'install NodeJS',
    dueDate: new Date('2020-05-23'),
    completed: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {

  private readonly todoList = new BehaviorSubject<TodoItem[]>([]);

  constructor(private storageService: StorageService) {
    let initialData = storageService.getData<TodoItem[]>(todoListStorageKey);
    if (!initialData || initialData.length === 0) {
      initialData = [];
      for (const todoItem of defaultTodoList) {
        initialData.push(this.createItem(todoItem));
      }
    }

    this.todoList.next(initialData);
  }

  getTodoList(): Observable<TodoItem[]> {
    return this.todoList.pipe(map(items => items.slice()));
  }

  createItem(todoItem: TodoItem): TodoItem {
    const newTodoItem = {...todoItem, id: this.createId()};
    const updatedItems = this.existingTodoItems.concat(newTodoItem);
    this.todoList.next(updatedItems);
    this.saveList(updatedItems);

    return newTodoItem;
  }

  private get existingTodoItems() {
    return this.todoList.value ? this.todoList.value.slice() : [];
  }

  updateItem(item: TodoItem): void {
    if (!item.id) {
      console.warn('Cannot save item without ID', item);
    }

    const updatedItems = this.existingTodoItems;
    const index = this.findIndex(item, updatedItems);
    if (index >= 0) {
      updatedItems[index] = item;
      this.saveList(updatedItems);
    }
  }

  deleteItem(item: TodoItem): void {
    if (!item.id) {
      console.warn('Cannot delete item without ID', item);
    }
    const updatedItems = this.existingTodoItems;
    const index = this.findIndex(item, updatedItems);
    if (index >= 0) {
      console.log('existingTodoItems[index]', updatedItems[index]);
      updatedItems.splice(index, 1);
      this.saveList(updatedItems);
    }
  }

  private createId(): string {
    return new Date().toISOString();
  }

  private findIndex(itemToFind: TodoItem, todoItems: TodoItem[]): number {
    const index = todoItems.findIndex(todoItemInList => todoItemInList.id === itemToFind.id);
    console.log('index', index, 'itemToFind', itemToFind);
    return index;
  }

  private saveList(todoItems: TodoItem[]): void {
    this.storageService.setData(todoListStorageKey, todoItems);
    // emit new list
    this.todoList.next(todoItems);
  }

}

