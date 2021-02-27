import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  contactForm = new FormGroup({});
  companyType: any = [
    { name: 'Individual' },
    { name: 'Sole Proprietorship Concern' },
    { name: 'Partnership Firm – registered / unregistered.' },
    { name: 'One Person Company.' },
    { name: 'Private Company.' },
    { name: 'Public Limited Company – Unlisted & Listed.' }, { name: 'Limited Liability Partnership.' },
    { name: 'Hindu Undivided Family (HUF)' }, { name: 'Foreign Company.' },
    { name: 'Trust' }
  ];
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
    pincode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    company_type: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    company_number: new FormControl('', Validators.required),
    business_number: new FormControl('', Validators.required),
    gst: new FormControl('', Validators.required),
    catelog: new FormControl(''),
    message: new FormControl('', Validators.minLength(10)),
      })
}

submit(formvalue: any) {
  if (this.contactForm.valid) {
    let api;
    const data = new FormData();
    data.append('first_name', formvalue.first_name);
    data.append('last_name', formvalue.last_name);
    data.append('email', formvalue.email);
      data.append('mobile', formvalue.phone);
      data.append('pincode', formvalue.pincode);
      data.append('city', formvalue.city);
      data.append('zipcode', formvalue.zipcode);
      data.append('company_type', formvalue.company_type);
      data.append('company_name', formvalue.company_name);
      data.append('company_number', formvalue.company_number);
      data.append('business_number', formvalue.business_number);
      data.append('gst', formvalue.gst);
      data.append('catelog', formvalue.catelog);

    data.append('description', formvalue.message);
      api = 'user/partner';
    this.api.postMultiData(api, data).subscribe((res => {
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

uploadDocumentInsuranceInit(e: any) {
  if (e.target.files && e.target.files.length > 0) {
    if (e.target.files[0].type === 'application/pdf') {
      let ftu;
      ftu = e.target.files[0];
      this.contactForm.patchValue({ catelog: ftu });
    } else {
      this.api.alert('Please Upload only pdf file', 'warning');
    }
  }
}
}
