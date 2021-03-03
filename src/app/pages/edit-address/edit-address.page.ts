import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  @Input() id: string;
  @Input() registered_address;

  StateListItem: any;
  CityListItem: any;
  filtermonthwise: any;
  postData = {
    user_id: '',
    name: '',
    mobile_number: '',
    pincode: '',
    locality: '',
    email: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alt_phone: ''
  }
  states: any;
  state: any;
  SelectedState: any;
  city: any;
  state_id: '';
  city_id: '';
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    public ngZone: NgZone,
    private loader: LoaderService,
    private toastService: ToastService,
    public navParams: NavParams,
    private storageService: StorageService) {
    this.id = this.navParams.data.id;
    this.registered_address = this.navParams.data.registered_address;
    this.storageService.getData().then((val) => {
      if (val) {
        this.postData.user_id = val.result_FrontLogin.id;
      }
      else {
        this.postData.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    this.GetStateList();


    // this.ViewAddress();

    setTimeout(() => {
      //code for your new value.
      this.ViewAddress();
    }, 200);

  }

  ngOnInit() {


  }


  GetStateList() {


    // this.loader.loadingPresent();

    this.authService.StateList('').subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_StateList));
        if (res.error === false) {
          // this.loader.loadingDismiss();

          this.StateListItem = res.result_StateList;

        }
        else {
          // this.loader.loadingDismiss();
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        // this.loader.loadingDismiss();
        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.toastService.presentToast("Network Issue...");
        }
      }
    );

  }

  ViewAddress() {

    this.loader.loadingPresent();

    this.authService.view_shipping_address(this.id).subscribe(
      (res: any) => {
        console.log('My store_shipping_address => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          for (let s = 0; s < res.result_view_shipping_address.length; s++) {

            this.ngZone.run(() => {

              this.postData.name = res.result_view_shipping_address[s].name;
              this.postData.mobile_number = res.result_view_shipping_address[s].mobile;
              this.postData.email = res.result_view_shipping_address[s].email;
              this.postData.pincode = res.result_view_shipping_address[s].pincode;
              this.postData.locality = res.result_view_shipping_address[s].locality;
              this.postData.address = res.result_view_shipping_address[s].address;
              this.SelectedState = res.result_view_shipping_address[s].state;
              this.SelectedStateList(this.SelectedState);
              this.postData.landmark = res.result_view_shipping_address[s].lang_mark;
              this.postData.alt_phone = res.result_view_shipping_address[s].alternate_phone;
              this.city = res.result_view_shipping_address[s].city;
              console.log("Selected State => " + this.SelectedState + " " + this.city);
              const data = {
                state_id: this.SelectedState
              }

              console.log("Data => " + JSON.stringify(data));

              this.authService.CitiesList(data).subscribe(
                (res: any) => {
                  console.log('My shipping_addresses => ' + JSON.stringify(res.result_CitiesList));
                  if (res.error === false) {

                    this.ngZone.run(() => {

                      this.CityListItem = res.result_CitiesList;
                      // this.city = thi
                      this.SelectedCityList(this.city);

                    });


                  }
                  else {
                    this.toastService.presentToast(res.msg);
                  }

                },
                (error: any) => {
                  if (JSON.stringify(error.error.errors) != null) {
                    this.toastService.presentToast(JSON.stringify(error.error.errors));
                  }
                  else {
                    this.toastService.presentToast("Network Issue...");
                  }
                }
              );

            });



          }

          // this.toast.presentToast(res.msg);

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

  SelectedStateList(value) {
    console.log("Selected State From Statelist=> " + JSON.stringify(value));
    // this.state = value.state_name;
    this.state_id = value;


    const data = {
      state_id: value
    }

    console.log("Data => " + JSON.stringify(data));

    this.authService.CitiesList(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_CitiesList));
        if (res.error === false) {

          this.ngZone.run(() => {

            this.CityListItem = res.result_CitiesList;
            // this.city = thi
            this.SelectedCityList(this.city);

          });


        }
        else {
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        if (JSON.stringify(error.error.errors) != null) {
          this.toastService.presentToast(JSON.stringify(error.error.errors));
        }
        else {
          this.toastService.presentToast("Network Issue...");
        }
      }
    );
  }

  SelectedCityList(id) {
    this.ngZone.run(() => {
      console.log(id);
      this.city = id;
      this.city_id = id;
    });
  }


  SaveAddress() {

    var registered = '';
    if (this.registered_address == 1) {
      registered = this.registered_address;
    }
    else {
      registered = '';
    }
    const data = {
      user_id: this.postData.user_id,
      name: this.postData.name,
      mobile: this.postData.mobile_number,
      shipping_email: this.postData.email,
      pincode: this.postData.pincode,
      locality: this.postData.locality,
      address: this.postData.address,
      city: this.city_id,
      state: this.state_id,
      lang_mark: this.postData.landmark,
      alternate_phone: this.postData.alt_phone,
      registered_address: registered
    }

    console.log("Save Address => " + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.update_shipping_address(this.id, data).subscribe(
      (res: any) => {
        console.log('My store_shipping_address => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

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


  async closeModal() {
    await this.modalController.dismiss();
    // this.modalController.dismiss()
    //   .then((data) => {
    //     this.nav.navigateForward("shipping-address");
    //   });
  }



}