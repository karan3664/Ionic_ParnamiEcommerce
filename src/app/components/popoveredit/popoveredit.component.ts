import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popoveredit',
  templateUrl: './popoveredit.component.html',
  styleUrls: ['./popoveredit.component.scss'],
})
export class PopovereditComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }
  select(type) {
    this.popoverController.dismiss(type);
  }
}
