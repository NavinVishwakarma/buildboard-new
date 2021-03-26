import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DefaultPopupComponent } from 'src/app/model/default-popup/default-popup.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileform: FormGroup;
  addressList: any;
  constructor(
    private dialog: MatDialog,
     private api: ApiService,
     private router: Router
     ) {}

  ngOnInit(): void {
    this.formsInit();
    this.getProfile();
    this.getaddressList();
  }
  formsInit(): any {
    this.profileform = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      phone: new FormControl('', [Validators.required]),
    });
  }
  getProfile(): any {
    this.api.get('user/profile').subscribe((res: any) => {
      if (res.success) {
        this.profileform.patchValue(res.data);
      }
    });
  }
  submit(value: any): any {
    if (this.profileform.valid) {
      this.api.post('user/profile/update', value).subscribe((res: any) => {
        if (res.success) {
          this.api.alert(res.message, 'success');
        } else {
          this.api.alert(res.message, 'warning');
        }
      });
    } else {
      this.profileform.markAllAsTouched();
    }
  }
  openaddressSection(): any {
    // const dialogref = this.dialog.open(DefaultPopupComponent, {
    //   width: '800px',
    //   data: {
    //     type: 'login',
    //   },
    // });
    this.router.navigate(['/address']);
  }
  getaddressList(): any {
    this.api.get('user/address/list').subscribe((res: any) => {
      if (res.success) {
        this.addressList = res.data;
      } else {
        this.addressList = undefined;
      }
    });
  }
}
