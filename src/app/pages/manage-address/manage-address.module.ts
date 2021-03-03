import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAddressPageRoutingModule } from './manage-address-routing.module';

import { ManageAddressPage } from './manage-address.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopovereditComponent } from 'src/app/components/popoveredit/popoveredit.component';

@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAddressPageRoutingModule
  ],
  declarations: [ManageAddressPage]
})
export class ManageAddressPageModule {}
