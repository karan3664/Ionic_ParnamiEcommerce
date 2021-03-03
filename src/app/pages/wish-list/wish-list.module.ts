import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishListPageRoutingModule } from './wish-list-routing.module';

import { WishListPage } from './wish-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishListPageRoutingModule
  ],
  declarations: [WishListPage]
})
export class WishListPageModule {}
