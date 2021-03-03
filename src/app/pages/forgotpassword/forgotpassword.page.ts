import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController, AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  formData = {
    customers_email_address: '',
  };

  constructor(private modalCtrl: ModalController,
    private nav: NavController,
    public alertController: AlertController,
    private toastService: ToastService,
    private authService: AuthService,
    private loader: LoaderService,
    public menuCtrl: MenuController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }
  async SendOTP() {

    const data = {
      email: this.formData.customers_email_address
    }

    this.loader.loadingPresent();
    this.authService.ForgetPassword(data).subscribe(
      async (res: any) => {
        console.log('Forgot Data =>' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // Storing the User data.
          // this.storageService.store(AuthConstants.AUTH, res.logindata);
          // this.toastService.presentToast(res.msg);
          this.toastService.presentToast(res['msg']);

          const alert = await this.alertController.create(
            {
              header: 'Verify Email & OTP',
              inputs: [
                {
                  name: 'email',
                  type: 'text',
                  placeholder: 'Enter Email'
                },
                {
                  name: 'otp',
                  type: 'text',
                  placeholder: 'Enter OTP'
                }
              ],
              buttons: [
                {
                  text: 'Dismiss',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Confirm Cancel');
                  }
                },
                {
                  text: 'Continue',
                  // tslint:disable-next-line: no-shadowed-variable
                  handler: (d: any) => {
                    const verify_otp = {
                      email: d.email,
                      otp: d.otp,

                    };
                    console.log(JSON.stringify(verify_otp));

                    console.log('Confirm Ok');

                    this.loader.loadingPresent();
                    this.authService.VerifyOtp(verify_otp).subscribe(
                      async (res: any) => {
                        console.log('Verify Data =>' + JSON.stringify(res));
                        if (res.error === false) {
                          this.loader.loadingDismiss();
                          // Storing the User data.
                          // this.storageService.store(AuthConstants.AUTH, res.logindata);
                          // this.toastService.presentToast(res.msg);
                          this.toastService.presentToast(res['msg']);

                          const alert = await this.alertController.create(
                            {
                              header: 'Enter New Password',
                              inputs: [
                                {
                                  name: 'current_password',
                                  type: 'password',
                                  placeholder: 'Enter New Password'
                                },
                                {
                                  name: 'confirm_password',
                                  type: 'password',
                                  placeholder: 'Enter Confirm Password'
                                }
                              ],
                              buttons: [
                                {
                                  text: 'Dismiss',
                                  role: 'cancel',
                                  cssClass: 'secondary',
                                  handler: () => {
                                    console.log('Confirm Cancel');
                                  }
                                },
                                {
                                  text: 'Continue',
                                  // tslint:disable-next-line: no-shadowed-variable
                                  handler: (d: any) => {
                                    const changePassword = {
                                      'new-password': d.current_password,
                                      'new-password_confirmation': d.confirm_password,
                                      'user_id': res.result_VerifyOtp.id

                                    };
                                    console.log(JSON.stringify(changePassword));

                                    console.log('Confirm Ok');

                                    this.loader.loadingPresent();
                                    this.authService.UpdatePassword(changePassword).subscribe(
                                      async (res: any) => {
                                        console.log('Verify Data =>' + JSON.stringify(res));
                                        if (res.error === false) {
                                          this.loader.loadingDismiss();
                                          // Storing the User data.
                                          // this.storageService.store(AuthConstants.AUTH, res.logindata);
                                          // this.toastService.presentToast(res.msg);
                                          this.toastService.presentToast(res['msg']);

                                          await this.modalCtrl.dismiss();


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
                                  }
                                }
                              ]
                            }
                          );
                          await alert.present();


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
                  }
                }
              ]
            }
          );
          await alert.present();


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

    // const alert = await this.alertController.create({
    //   header: 'Forgot Password',
    //   inputs: [
    //     {
    //       name: 'mobile',
    //       type: 'tel',
    //       placeholder: 'Enter Register Mobile Number'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Dismiss',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: () => {
    //         console.log('Confirm Cancel');
    //       }
    //     },
    //     {
    //       text: 'Continue',
    //       handler: (d: any) => {
    //         const mobileRegister = {
    //           mobile: d.mobile
    //         };
    //         this.loader.loadingPresent();
    //         this.authService
    //           .ForgetPassword(mobileRegister)
    //           .subscribe(async (res: any) => {
    //             if (res.status === false) {
    //               const mobileVerifyOtp = {
    //                 mobile: res.Forgotpassworddata.mobile,
    //                 user_id: res.Forgotpassworddata.user_id
    //               };
    //               this.loader.loadingDismiss();
    //               this.loader.loadingPresent();
    //               this.authService
    //                 .VerifyOtp(mobileVerifyOtp)
    //                 .subscribe(async (resOtp: any) => {
    //                   console.log(resOtp);
    //                   if (resOtp.status === true) {
    //                     this.loader.loadingDismiss();
    //                     console.log(resOtp);
    //                     // this.route.navigate(['']);
    //                     // tslint:disable-next-line: no-shadowed-variable
    //                     const alert = await this.alertController.create(
    //                       {
    //                         header: 'Change Password',
    //                         inputs: [
    //                           {
    //                             name: 'password',
    //                             type: 'text',
    //                             placeholder: 'Enter Password'
    //                           },
    //                           {
    //                             name: 'confirm_password',
    //                             type: 'text',
    //                             placeholder: 'Enter Confirm Password'
    //                           }
    //                         ],
    //                         buttons: [
    //                           {
    //                             text: 'Dismiss',
    //                             role: 'cancel',
    //                             cssClass: 'secondary',
    //                             handler: () => {
    //                               console.log('Confirm Cancel');
    //                             }
    //                           },
    //                           {
    //                             text: 'Continue',
    //                             // tslint:disable-next-line: no-shadowed-variable
    //                             handler: (d: any) => {
    //                               const changepassword = {
    //                                 password: d.password,
    //                                 confirm_password:
    //                                   d.confirm_password,
    //                                 user_id:
    //                                   res.Forgotpassworddata.user_id
    //                               };
    //                               console.log(changepassword);
    //                               this.loader.loadingPresent();
    //                               this.authService
    //                                 .changePassword(changepassword)
    //                                 .subscribe((resPass: any) => {
    //                                   console.log(resPass);
    //                                   if (resPass.status === true) {
    //                                     this.loader.loadingDismiss();
    //                                     console.log(resPass);
    //                                     // this.router.navigate(['']);
    //                                     this.toastService.presentToast(
    //                                       'Password Change Successfully...'
    //                                     );
    //                                   } else {
    //                                     this.loader.loadingDismiss();
    //                                     this.toastService.presentToast(
    //                                       'Password Not Matched'
    //                                     );
    //                                   }
    //                                 });
    //                               console.log('Confirm Ok');
    //                             }
    //                           }
    //                         ]
    //                       }
    //                     );
    //                     await alert.present();
    //                   } else {
    //                     this.loader.loadingDismiss();
    //                     this.toastService.presentToast('Invalid Otp');
    //                   }
    //                 });
    //               console.log(res.Forgotpassworddata);
    //             } else {
    //               this.loader.loadingDismiss();
    //               this.toastService.presentToast(res.error);
    //             }
    //           });
    //         console.log('Confirm Ok');
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }
}
