import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtocartPopupPage } from './addtocart-popup.page';

const routes: Routes = [
  {
    path: '',
    component: AddtocartPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtocartPopupPageRoutingModule {}
