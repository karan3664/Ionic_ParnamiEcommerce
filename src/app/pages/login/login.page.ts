import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RegisterPage } from '../register/register.page';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() home: any;
  postData = {
    username: '',
    password: ''
  };
  token: any;
  randomNumber: Number;
  rad: Number;
  constructor(private modalController: ModalController,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private loader: LoaderService,
    public navParams: NavParams,
    public alertController: AlertController,
    public navCtrl: NavController,
  ) {
    this.home = this.navParams.data.home;
    console.log("DeToken ===>" + localStorage.getItem('DeviceToken'));

    this.storageService.getToken().then((val) => {
      if (val) {
        this.token = val;
      }
      else {
        // this.rad = this.randomNumber;
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    this.token = localStorage.getItem('DeviceToken');
    setTimeout(() => {
      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
        }
        else {
          // this.rad = this.randomNumber;
          // this.storageService.setRandomNumber(this.randomNumber);

        }

      });

    }, 500);
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  validateInputs() {
    const username = this.postData.username.trim();
    const password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  formLogin() {
    if (this.validateInputs()) {
      this.loader.loadingPresent();
      console.log(this.postData);


      const value = {
        phone: this.postData.username,
        password: this.postData.password,
        old_session: this.rad
      };
      console.log(JSON.stringify(value));
      // this.loader.loadingPresent();
      this.authService.FrontLogin(value).subscribe(
        async (res: any) => {
          console.log('Login Data =>' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();
            // Storing the User data.
            // this.storageService.store(AuthConstants.AUTH, res.logindata);

            this.storageService.setData(res);
            this.randomNumber = Math.random();
            // this.rad = this.randomNumber;
            this.storageService.setRandomNumber(this.randomNumber);
            localStorage.setItem('token', res.result_FrontLogin.id);

            const value = {
              user_id: res.result_FrontLogin.id,
              token: this.token,

            };
            console.log(JSON.stringify(value));
            // this.loader.loadingPresent();
            this.authService.UpdateToken(value).subscribe(
              async (res: any) => {
                console.log('Login Data =>' + JSON.stringify(res));
                if (res.error === false) {

                  await this.modalController.dismiss();



                } else {
                  // this.loader.loadingDismiss();
                  this.toastService.presentToast(res['msg']);
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





          } else {
            this.loader.loadingDismiss();
            this.toastService.presentToast(res['msg']);
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
    } else {
      this.loader.loadingDismiss();
      this.toastService.presentToast('Please enter username or password.');
    }
  }

  // async Register() {
  //   const modal = await this.modalController.create({
  //     component: RegisterPage,
  //     componentProps: {

  //   });



  //   return await modal.present();
  // }

  async goToForgot() {
    let modal = await this.modalController.create({
      component: ForgotpasswordPage,
      componentProps: {
        'hideGuestLogin': true
      }
    });
    return await modal.present();
  }
}

