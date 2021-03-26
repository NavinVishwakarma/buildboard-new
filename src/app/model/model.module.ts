import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPopupComponent } from './default-popup/default-popup.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DefaultPopupComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMaskModule,
    FormsModule,
  ],
  entryComponents: [DefaultPopupComponent],
})
export class ModelModule {}
