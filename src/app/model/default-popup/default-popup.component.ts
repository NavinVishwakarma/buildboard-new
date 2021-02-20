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
    private dialogRef: MatDialogRef<DefaultPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.modeldata = data;
   }

  ngOnInit(): void {

  }

}
