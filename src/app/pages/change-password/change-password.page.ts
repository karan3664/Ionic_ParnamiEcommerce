import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public authUser: any;
  postData = {
    current_password: '',
    password: '',
    confirm_password: '',
    user_id: ''
  };
  current_password_hidden: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private loader: LoaderService,
    public alertController: AlertController,
    public storage: Storage
  ) {
    this.storageService.getData().then((val) => {
      if (val) {
        this.postData.user_id = val.result_FrontLogin.id;
        this.current_password_hidden = val.result_FrontLogin.password;
      }
      else {
        this.postData.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }
    });
  }

  ngOnInit() {


  }

  ChangePassword() {


    const data = {
      'current-password': this.postData.current_password,
      'new-password': this.postData.password,
      'new-password_confirmation': this.postData.confirm_password,
      'current_password_hidden': this.current_password_hidden,
      'user_id': this.postData.user_id

    }
    console.log(JSON.stringify(data));
    this.loader.loadingPresent();
    // tslint:disable-next-line: deprecation
    this.authService.changePassword(data).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.loader.loadingDismiss();
          console.log(res);
          // this.authService.();
          // this.router.navigate(['home/more']);
          this.toastService.presentToast(res.msg);
        } else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res.msg);
        }
      });
  }
}