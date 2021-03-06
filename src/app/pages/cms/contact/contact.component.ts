import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({});
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formsInit();
  }
  formsInit(){
    this.contactForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]),
      phone: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.minLength(10)),
        })
  }

  submit(formvalue: any) {
    if (this.contactForm.valid) {
      let api;
      const data = new FormData();
      data.append('first_name', formvalue.first_name);
      data.append('last_name', formvalue.last_name);
      data.append('email', formvalue.email);
      data.append('mobile', formvalue.mobile);
      data.append('description', formvalue.description);
        api = 'user/contact-us';
      this.api.postMultiData(api, data).subscribe(((res: any) => {
        if (res.success) {
          this.api.alert(res.message, 'success');
          this.contactForm.reset();
        } else {
          this.api.alert(res.message, 'warning');
        }
      }));
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
