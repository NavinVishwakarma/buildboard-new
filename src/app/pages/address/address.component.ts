import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  profileform: FormGroup;
  stateslist: any;
  addressList: any;
  openAddressform: boolean;
  addressid: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formsInit();
    this.getaddressList();
    this.getstatesList();
  }
  formsInit(): any {
    this.profileform = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      house_number: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state_id: new FormControl('', [Validators.required]),
    });
  }

  submit(value: any): any {
    if (this.profileform.valid) {
      this.api.post('user/address/store', value).subscribe(
        (res: any) => {
          if (res.success) {
            this.getaddressList();
            this.api.alert(res.message, 'success');
            this.openAddressform = false;
          } else {
            this.api.alert(res.message, 'warning');
          }
        },
        (err) => {
          if (err) {
            this.api.alert(
              err.message ? err.message : 'Somthing went wrong',
              'error'
            );
          }
        }
      );
    } else {
      this.profileform.markAllAsTouched();
    }
  }

  getstatesList(): any {
    this.api.get('user/states').subscribe((res: any) => {
      if (res.success) {
        this.stateslist = res.data;
      }
    });
  }

  getaddressList(): any {
    this.api.get('user/address/list').subscribe((res: any) => {
      if (res.success) {
        this.addressList = res.data;
      } else {
        this.addressList = undefined;
      }
      console.log(res);
    });
  }
  openaddressSection(): any {
    this.openAddressform = true;
  }
}
