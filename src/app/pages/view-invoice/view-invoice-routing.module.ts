import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInvoicePage } from './view-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvoicePageRoutingModule {}
