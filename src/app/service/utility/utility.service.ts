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

  public isDateBefore(date1: Date, date2: Date): boolean {
    return date1.getFullYear() < date2.getFullYear() ||
    date1.getMonth() < date2.getMonth() ||
    date1.getDate() < date2.getDate();
  }
}
