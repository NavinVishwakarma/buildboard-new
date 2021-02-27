import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { SellerComponent } from './seller/seller.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'Want-to-be-a-seller',
        component: SellerComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
