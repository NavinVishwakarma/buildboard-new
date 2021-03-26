import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { CmsRoutingModule } from './cms-routing.module';
import { SellerComponent } from './seller/seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ContactComponent, SellerComponent, AboutUsComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule
  ]
})
export class CmsModule { }
