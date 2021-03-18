import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPopupComponent } from './default-popup/default-popup.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DefaultPopupComponent],
  imports: [CommonModule, BrowserModule, MaterialModule, ReactiveFormsModule, FormsModule],
  entryComponents: [DefaultPopupComponent],
})
export class ModelModule {}
