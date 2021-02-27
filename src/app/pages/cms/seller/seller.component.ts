import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  contactForm = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
    this.formsInit()
  }


formsInit(){
  this.contactForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl(''),
      })
}

submitForm(){
    if(this.contactForm.valid){

    } else {
      this.contactForm.markAllAsTouched()
    }
}
}
