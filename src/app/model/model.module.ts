import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPopupComponent } from './default-popup/default-popup.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [DefaultPopupComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents:[
    DefaultPopupComponent
  ]
})
export class ModelModule { }
