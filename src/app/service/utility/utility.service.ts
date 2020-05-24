import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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
}
