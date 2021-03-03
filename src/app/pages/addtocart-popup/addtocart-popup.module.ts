import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtocartPopupPageRoutingModule } from './addtocart-popup-routing.module';

import { AddtocartPopupPage } from './addtocart-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtocartPopupPageRoutingModule
  ],
  declarations: [AddtocartPopupPage]
})
export class AddtocartPopupPageModule {}
