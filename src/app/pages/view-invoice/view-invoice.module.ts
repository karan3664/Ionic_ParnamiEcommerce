import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInvoicePageRoutingModule } from './view-invoice-routing.module';

import { ViewInvoicePage } from './view-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInvoicePageRoutingModule
  ],
  declarations: [ViewInvoicePage]
})
export class ViewInvoicePageModule {}
