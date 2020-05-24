import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {
  }

  getData<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }

  setData<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
