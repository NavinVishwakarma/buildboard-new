import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { ProductListWithCategoryComponent } from './product-list-with-category/product-list-with-category.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    ProductDetailsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    ProductListWithCategoryComponent,
    CartComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule
  ]
})
export class PagesModule { }
