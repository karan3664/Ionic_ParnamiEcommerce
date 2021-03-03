import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankyouPagePageRoutingModule } from './thankyou-page-routing.module';

import { ThankyouPagePage } from './thankyou-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankyouPagePageRoutingModule
  ],
  declarations: [ThankyouPagePage]
})
export class ThankyouPagePageModule {}
