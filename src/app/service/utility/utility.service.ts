import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  public getCurrentDateString(): string {
    const date = new Date();
    return `${date.getFullYear()}-${this.formatNumber(date.getMonth() + 1)}-${this.formatNumber(date.getDate())}`;
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
      console.log('warning this is not a number');
      return false;
    }

    const date2 = new Date(value2);
    if (isNaN(date2.getTime())) {
      console.log('warning this is not a number');
      return false;
    }

    return date1.getFullYear() < date2.getFullYear() ||
      date1.getMonth() < date2.getMonth() ||
      date1.getDate() < date2.getDate();
  }
}
