import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  postData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
    business_name: '',
    user_id: ''
  };
  constructor(public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private storageService: StorageService) {
    this.storageService.getData().then((val) => {
      if (val) {
        this.postData.user_id = val.result_FrontLogin.id;
        this.ViewProfile();
      }
      else {
        this.postData.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
  }

  ngOnInit() {
  }


  ViewProfile() {


    this.loader.loadingPresent();

    const data = {
      user_id: this.postData.user_id
    }

    this.authService.viewProfile(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.postData.name = res.result_viewProfile.name;
          this.postData.phone = res.result_viewProfile.phone;
          this.postData.address = res.result_viewProfile.address;
          this.postData.business_name = res.result_viewProfile.business_name;
          this.postData.email = res.result_viewProfile.email;


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

  validateInputs() {
    const name = this.postData.name.trim();

    // const phone = this.postData.phone.trim();

    // const address = this.postData.address.trim();

    // const business_name = this.postData.business_name.trim();

    return (
      this.postData.name
      &&

      // this.postData.phone &&
      // this.postData.address &&
      // this.postData.business_name &&

      name.length > 0
      // &&

      // phone.length > 0 &&
      // address.length > 0 &&
      // business_name.length > 0
    );
  }
  // postData = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   password_confirmation: '',
  //   phone: '',
  //   address: '',
  //   business_name: '',
  //   user_id: ''
  // };
  UpdateProfile() {

    if (this.validateInputs()) {
      this.loader.loadingPresent();

      const data = {
        user_id: this.postData.user_id,
        name: this.postData.name,
        phone: this.postData.phone,
        address: this.postData.address,
        business_name: this.postData.business_name,
      }

      this.authService.updateProfile(data).subscribe(
        (res: any) => {
          console.log('My shipping_addresses => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();
            // this.postData.name = res.result_viewProfile.name
            this.toastService.presentToast(res.msg);
            this.ViewProfile();
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
    else {
      this.loader.loadingDismiss();
      this.toastService.presentToast('All fields are required...');
    }


  }


}
