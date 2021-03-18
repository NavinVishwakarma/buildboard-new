import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-default-popup',
  templateUrl: './default-popup.component.html',
  styleUrls: ['./default-popup.component.scss'],
})
export class DefaultPopupComponent implements OnInit {
  modeldata: any;
  profileform: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DefaultPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.type);
  }

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
  submit(value: any): any {}
}
