import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
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
