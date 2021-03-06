import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  openRegister: boolean | undefined;
  register = new FormGroup({});
  lodingEnable: boolean | undefined;
  otpverification: boolean | undefined;
  otpverificationforLogin: boolean | undefined;
  phoneNumberforLogin = new FormControl('', [Validators.required]);
  userId: any;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private storage: StorageService,
    private event: EventService
  ) {
    this.openRegister = false;
    this.lodingEnable = false;
    this.otpverification = false;
    this.otpverificationforLogin = false;
  }

  ngOnInit(): void {
    this.formsInIt();
  }
  formsInIt(): any {
    this.register = new FormGroup({
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      phone: new FormControl('', [Validators.required]),
    });
  }
  login(): any {
    if (this.phoneNumberforLogin.valid) {
      this.api
        .post('user/login', { phone: this.phoneNumberforLogin.value })
        .subscribe(
          (res: any) => {
            // this.storage.setUser({
            //   token: 'hjasgdhjgasdjhgasd',
            // });
            if (res.success) {
              this.api.alert(res.message, 'success');
              this.lodingEnable = false;
              this.phoneNumberforLogin.reset();
              this.otpverificationforLogin = true;
              this.userId = res.data;
            } else {
              this.api.alert(res.message, 'info');
              this.lodingEnable = false;
            }
          },
          (err) => {
            if (err) {
              this.api.alert('Somthing went wrong try again', 'error');
              this.lodingEnable = false;
            }
          }
        );
    } else {
      this.phoneNumberforLogin.markAsTouched();
    }
  }
  onOtpChange(ev: any): any {
    if (ev.length === 4) {
      const data = {
        user_id: this.userId,
        otp: ev,
      };
      this.api.post('user/verify', data).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.alert(res.message, 'success');
            this.otpverification = false;
            this.otpverificationforLogin = false;
            this.dialogRef.close();
            this.storage.setUser({
              token: res.token,
              userId: this.userId,
              name: res.data.full_name,
            });
            this.event.setLoginEmmit(true);
          } else {
            this.api.alert(res.message ? (res.message) : 'Somthing went wrong', 'info');
          }
        },
        (err) => {
          if (err) {
            this.api.alert(
              err.message ? err.messag : 'Somthing went wrong',
              'success'
            );
          }
        }
      );
    }
  }
  registerData(value: any): void {
    if (this.register.valid) {
      this.api.post('user/store', value).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.alert(res.message, 'success');
            this.lodingEnable = false;
            this.otpverification = true;
            this.userId = res.data;
            this.register.reset();
          } else {
            this.api.alert(res.message, 'info');
            this.lodingEnable = false;
          }
        },
        (err) => {
          if (err) {
            this.api.alert('Somthing went wrong try again', 'error');
            this.lodingEnable = false;
          }
        }
      );
    } else {
      this.register.markAllAsTouched();
    }
  }
}
