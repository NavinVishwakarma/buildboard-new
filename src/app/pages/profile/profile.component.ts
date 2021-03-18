import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DefaultPopupComponent } from 'src/app/model/default-popup/default-popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
profileform: FormGroup;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formsInit();
  }
  formsInit(): any{
    this.profileform = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]),
      phone: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.minLength(10)),
        });
  }
  submit(value: any): any{

  }
  openaddressSection(): any{
    const dialogref = this.dialog.open(DefaultPopupComponent, {
      width: '800px',
      backdropClass: 'bdrop',
      data: {
        type: 'login',
      },
    });
  }
}
