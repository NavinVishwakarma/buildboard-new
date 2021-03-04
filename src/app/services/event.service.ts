import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }
  private cartNumber = new BehaviorSubject(0);
  totalAddedcartValue = this.cartNumber.asObservable();


  setCartEmit(isLoading: number): void {
    return this.cartNumber.next(isLoading);
  }
}
