import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { LoginPage } from '../login/login.page';
import { AddAddressPage } from '../add-address/add-address.page';
import { EditAddressPage } from '../edit-address/edit-address.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { PopovereditComponent } from 'src/app/components/popoveredit/popoveredit.component';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {

  rad: Number;
  Name: '';
  Mobile: '';
  Address: '';
  user_id: '';
  Data: any;
  selectedRadioGroup: any;
  selectedRadioItem: any;
  defaultSelectedRadio = '';
  address_id = '';
  dummy = Array(10);

  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private toastService: ToastService,
    private storageService: StorageService) {
    setTimeout(() => {
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
        }
        else {

        }

      });
    }, 500);

    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;

        this.ShippingDetails();
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    setTimeout(() => {

    }, 1000);


  }

  ngOnInit() {
  }






  MakeDefault(event) {
    this.address_id = JSON.stringify(event.detail.value.id);
    // console.log("radioGroupChange", JSON.stringify(event.detail.value.id) + '---' + event.detail.value.front_user_id);
    const data = {
      address_id: JSON.stringify(event.detail.value.id),
      user_id: event.detail.value.front_user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My MakeDefault => ' + JSON.stringify(data));
    this.loader.loadingPresent();

    this.authService.MakeDefault(data).subscribe(
      (res: any) => {
        // console.log('My shipping_addresses => ' + JSON.stringify(res.result_checkout.shipping_addresses));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));


          this.toastService.presentToast(res.msg);

        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.toastService.presentToast("Network Issue...");
        }
      }
    );
  }




  async AddAddress() {
    const modal = await this.modalController.create({
      component: AddAddressPage,
      componentProps: {
        // 'po_id': '',
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });
    modal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        // this.toke = user;
        window.location.reload();
        this.ShippingDetails();
      });
    return await modal.present();
  }

  ShippingDetails() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My shipping_addresses => ' + JSON.stringify(data));
    // this.loader.loadingPresent();

    this.authService.checkout(data).subscribe(
      (res: any) => {
        this.dummy = [];
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_checkout));
        if (res.error === false) {
          // this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));

          this.Data = res.result_checkout.shipping_addresses;


        }
        else {
          // this.loader.loadingDismiss();
          this.toastService.presentToast(res);
        }

      },
      (error: any) => {
        // this.loader.loadingDismiss();
        this.dummy = [];
        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.toastService.presentToast("Network Issue...");
        }
      }
    );

  }
  SelectPayment() {
    if (this.address_id == '') {
      this.toastService.presentToast('Select Default Address');

    }
    else {
      this.nav.navigateForward("payment-method");
    }


  }

  async Edit(id) {
    console.log(id);

    const modal = await this.modalController.create({
      component: EditAddressPage,
      componentProps: {
        'id': id,
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });
    modal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        this.ShippingDetails();
        // window.location.reload();
      });

    return await modal.present();
  }


  async openMenu(item, events) {

    console.log("item.registered_address ===>>>>" + item.registered_address);

    if (item.registered_address != null) {
      const popover = await this.popoverController.create({
        component: PopovereditComponent,
        event: events,
        mode: 'ios',
      });
      popover.onDidDismiss().then(async data => {
        console.log(data.data);
        if (data && data.data) {
          if (data.data === 'edit') {
            const navData: NavigationExtras = {
              queryParams: {
                from: 'edit',
                data: JSON.stringify(item)
              }
            };
            const modal = await this.modalController.create({
              component: EditAddressPage,
              componentProps: {
                'id': item.id,
                'registered_address': item.registered_address,
                // 'to_user_id': ''
              }
            });
            modal.onDidDismiss()
              .then((data) => {

                const user = data['data']; // Here's your selected user!
                // console.log("Token =>" + user);
                this.ShippingDetails();
                // window.location.reload();
              });

            return await modal.present();
            // this.router.navigate(['add-new-address'], navData);


          }
        }
      });
      await popover.present();
    }
    else {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: events,
        mode: 'ios',
      });
      popover.onDidDismiss().then(async data => {
        console.log(data.data);
        if (data && data.data) {
          if (data.data === 'edit') {
            const navData: NavigationExtras = {
              queryParams: {
                from: 'edit',
                data: JSON.stringify(item)
              }
            };
            const modal = await this.modalController.create({
              component: EditAddressPage,
              componentProps: {
                'id': item.id,
                'registered_address': item.registered_address,
                // 'to_user_id': ''
              }
            });
            modal.onDidDismiss()
              .then((data) => {

                const user = data['data']; // Here's your selected user!
                // console.log("Token =>" + user);
                this.ShippingDetails();
                // window.location.reload();
              });

            return await modal.present();
            // this.router.navigate(['add-new-address'], navData);
          } else if (data.data === 'delete') {
            console.log(item);
            Swal.fire({
              title: 'Are you sure?',
              text: 'to delete this address',
              icon: 'question',
              confirmButtonText: 'Yes',
              backdrop: false,
              background: 'white',
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: 'cancel'
            }).then(data => {
              console.log(data);
              if (data && data.value) {

                this.authService.delete_shipping_address(item.id).subscribe(
                  (res: any) => {

                    console.log('My shipping_addresses => ' + JSON.stringify(res.result_checkout.shipping_addresses));

                    if (res.error === false) {
                      // this.loader.loadingDismiss();
                      // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));

                      this.ShippingDetails();

                      this.toastService.presentToast(res.msg);
                    }
                    else {
                      // this.loader.loadingDismiss();.

                      this.toastService.presentToast(res);
                    }

                  },
                  (error: any) => {
                    this.dummy = [];
                    // this.loader.loadingDismiss();
                    if (JSON.stringify(error.error.errors) != null) {
                      this.toastService.presentToast(JSON.stringify(error.error.errors));
                    }
                    else {
                      this.dummy = [];
                      this.toastService.presentToast("Network Issue...");
                    }
                  }
                );
              }
            });

          }
        }
      });
      await popover.present();
    }

  }
}
