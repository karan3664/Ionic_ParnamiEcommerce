import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddressPageRoutingModule } from './edit-address-routing.module';

import { EditAddressPage } from './edit-address.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopovereditComponent } from 'src/app/components/popoveredit/popoveredit.component';

@NgModule({
  entryComponents: [
    PopoverComponent,
    PopovereditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAddressPageRoutingModule
  ],
  declarations: [EditAddressPage]
})
export class EditAddressPageModule {}
