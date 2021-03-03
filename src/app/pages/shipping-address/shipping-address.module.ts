import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingAddressPageRoutingModule } from './shipping-address-routing.module';

import { ShippingAddressPage } from './shipping-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShippingAddressPageRoutingModule
  ],
  declarations: [ShippingAddressPage]
})
export class ShippingAddressPageModule {}
