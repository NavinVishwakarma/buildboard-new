import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private storage: StorageService
  ) { }
  private cartNumber = new BehaviorSubject(true);
  totalAddedcartValue = this.cartNumber.asObservable();
  private Login = new BehaviorSubject(this.storage.isAuthenticate());
  isLogin = this.Login.asObservable();

  setLoginEmmit(isLogin: boolean): any {
    return this.Login.next(isLogin);
  }
  setCartEmit(isLoading: boolean): void {
    return this.cartNumber.next(isLoading);
  }
}
