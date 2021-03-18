import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  openRegister: boolean;
  register: FormGroup = new FormGroup({});
  lodingEnable: boolean;
  otpverification: boolean;
  otpverificationforLogin: boolean;
  phoneNumberforLogin = new FormControl('', [Validators.required]);
  userId: any;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  ShowresendOtpForLogin: boolean;
  OTP: any;
  ajaxLoder: boolean;
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
    this.ShowresendOtpForLogin = true;
    this.ajaxLoder = false;
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
              this.otpverificationforLogin = true;
              this.userId = res.data;
              setTimeout(() => {
                this.ShowresendOtpForLogin = false;
              }, 5000);
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
  registerData(value: any): void {
    if (this.register.valid) {
      this.api.post('user/store', value).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.alert(res.message, 'success');
            this.lodingEnable = false;
            this.otpverification = true;
            this.userId = res.data;
            setTimeout(() => {
              this.ShowresendOtpForLogin = false;
            }, 5000);
            // this.register.reset();
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
  onOtpChange(ev: any): any {
    this.OTP = ev;
  }
  verifyotp(): any {
    if (this.OTP && this.OTP.length === 4) {
      const data = {
        user_id: this.userId,
        otp: this.OTP,
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

            this.lodingEnable = false;
            this.event.setLoginEmmit(true);
            setTimeout(() => {
              this.event.setCartEmit(true);
            }, 500);
          } else {
            this.api.alert(
              res.message ? res.message : 'Somthing went wrong',
              'info'
            );
            this.lodingEnable = false;
          }
        },
        (err) => {
          if (err) {
            this.api.alert(
              err.message ? err.messag : 'Somthing went wrong',
              'success'
            );
            this.lodingEnable = false;
          }
        }
      );
    } else {
      this.api.alert('Please enter valid OTP', 'info');
    }
  }
  resentOtp(): any {
    if (!this.ShowresendOtpForLogin) {
      this.api
        .post('user/resend-otp', {
          phone: this.phoneNumberforLogin.value
            ? this.phoneNumberforLogin.value
            : this.register.value.phone,
          user_id: this.userId,
        })
        .subscribe(
          (res: any) => {
            if (res.status) {
              this.api.alert(res.message, 'success');
              this.ajaxLoder = false;
            } else {
              this.api.alert('Somthing went wrong', 'error');
              this.ajaxLoder = false;
            }
          },
          (err) => {
            if (err) {
              this.api.alert(
                err.message ? err.message : 'Somthing went wrong',
                'error'
              );
              this.ajaxLoder = false;
            }
          }
        );
    }
  }
}
