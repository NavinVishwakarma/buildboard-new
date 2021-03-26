import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListWithCategoryComponent } from './product-list-with-category/product-list-with-category.component';
import { ProfileComponent } from './profile/profile.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'product-details/:productid',
    component: ProductDetailsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-and-Conditions',
    component: TermsAndConditionComponent
  },
  {
    path: 'product-list/:categoryId',
    component: ProductListWithCategoryComponent
  },
  {
    path: 'summary',
    component: OrderSummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: ProfileComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: './',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
