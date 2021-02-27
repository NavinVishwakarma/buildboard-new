import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-default-popup',
  templateUrl: './default-popup.component.html',
  styleUrls: ['./default-popup.component.scss']
})
export class DefaultPopupComponent implements OnInit {
  modeldata: any;

  constructor(
    public dialogRef: MatDialogRef<DefaultPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.type);
   }

  ngOnInit() {

  }

}
