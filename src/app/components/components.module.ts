import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { BannerComponent } from './banner/banner.component';
import { PopoverComponent } from './popover/popover.component';
import { PopovereditComponent } from './popoveredit/popoveredit.component';


@NgModule({
  declarations: [BannerComponent, PopoverComponent,PopovereditComponent],
  exports: [BannerComponent, PopoverComponent,PopovereditComponent],

  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
