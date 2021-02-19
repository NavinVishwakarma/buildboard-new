import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }
  private contactUs = new BehaviorSubject('Contact Us');
  contactUsValue = this.contactUs.asObservable();


  setContactUstype(isLoading: string) {
    return this.contactUs.next(isLoading);
  }
}
