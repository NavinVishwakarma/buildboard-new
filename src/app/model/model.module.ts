import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPopupComponent } from './default-popup/default-popup.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [DefaultPopupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule
  ],
    entryComponents: [
      DefaultPopupComponent
  ]
})
export class ModelModule { }
