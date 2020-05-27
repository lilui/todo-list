import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  public getCurrentDateString(): string {
    return this.formatDate(new Date());
  }

  public formatDate(value: Date | string): string {
    if (value) {
      let date: Date;
      if (typeof value === 'string') {
        date = new Date(value);
      } else {
        date = value;
      }

      return `${date.getFullYear()}-${this.formatNumber(date.getMonth() + 1)}-${this.formatNumber(date.getDate())}`;
    }

    return '';
  }

  public formatNumber(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }
    return String(value);
  }

  public isDateBefore(value1: any, value2: any): boolean {
    const date1 = new Date(value1);
    if (isNaN(date1.getTime())) {
      console.warn('this is not a number', date1);
      return false;
    }

    const date2 = new Date(value2);
    if (isNaN(date2.getTime())) {
      console.warn('this is not a number', date2);
      return false;
    }

    return date1.getFullYear() < date2.getFullYear() ||
      date1.getMonth() < date2.getMonth() ||
      date1.getDate() < date2.getDate();
  }
}
