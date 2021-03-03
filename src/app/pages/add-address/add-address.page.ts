import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

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
  state: '';
  city: '';
  state_id: '';

  city_id: '';
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private storageService: StorageService) {
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
  }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  GetStateList() {


    this.loader.loadingPresent();

    this.authService.StateList('').subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_StateList));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.StateListItem = res.result_StateList;

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

  StateList(value) {
    console.log("Selected State => " + JSON.stringify(value));
    this.state = value;
    this.state_id = value.id;
    const data = {
      state_id: value.id
    }
    this.authService.CitiesList(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res.result_CitiesList));
        if (res.error === false) {

          this.CityListItem = res.result_CitiesList;

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

  CityList(value) {
    console.log(value);
    this.city = value;
    this.city_id = value.id
  }

  SaveAddress() {
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
      alternate_phone: this.postData.alt_phone
    }

    console.log("Save Address => " + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.store_shipping_address(data).subscribe(
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
}
