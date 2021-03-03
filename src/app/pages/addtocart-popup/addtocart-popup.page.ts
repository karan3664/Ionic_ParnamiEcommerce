import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-addtocart-popup',
  templateUrl: './addtocart-popup.page.html',
  styleUrls: ['./addtocart-popup.page.scss'],
})
export class AddtocartPopupPage implements OnInit {
  toke: any;



  @Input() id: string;
  @Input() session_id: string;
  // @Input() price: string;
  @Input() user_id: string;
  @Input() discount_res;
  price: any;
  Data: any;
  product_packages: any;
  constructor(private route: ActivatedRoute,
    public nav: NavController,
    private modalController: ModalController,
    public alertController: AlertController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private storageService: StorageService,
    public navParams: NavParams,) {
    this.toke = localStorage.getItem('token');
    this.id = this.navParams.data.id;
    this.session_id = this.navParams.data.session_id;
    this.discount_res = this.navParams.data.discount_res;

    this.user_id = this.navParams.data.user_id;
    this.ProductDetails();
  }

  ngOnInit() {
  }

  ProductDetails() {


    // this.loader.loadingPresent();

    const data = {
      user_id: this.user_id,
      product_id: this.id
    }

    console.log('Product Details => ' + JSON.stringify(data));
    this.authService.GetProductDetails(data).subscribe(
      (res: any) => {
        console.log('Product Details => ' + JSON.stringify(res));
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Data = res.result_GetProductDetails;

          for (let i = 0; i < this.Data.length; i++) {
            this.product_packages = this.Data[i].product_packages;
            console.log('Product Details => ' + JSON.stringify(this.Data[i].product_packages[i].price));
            // this.price = this.Data[i].product_packages[i].price;
          }

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
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }

  closeModal() {
    this.modalController.dismiss();
  }
  async MakeDefault(event) {
    var data = event.detail.value;
    // let data = { 'foo': 'bar' };
    //  this.viewCtrl.dismiss(data);
    console.log(JSON.stringify(event.detail.value.discounted_res));
    // this.modalController.dismiss(data);


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Quantity',
      inputs: [
        {
          name: 'qty',
          type: 'number',
          placeholder: '',
          value: 1
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (d: any) => {
            console.log('Confirm Ok');

            var finalPrice = '';

            if (data.discounted_price != null) {
              finalPrice = data.discounted_price;
            }
            else {
              finalPrice = data.price;
            }


            const final_data = {
              session_id: this.session_id,
              product_id: this.id,
              price: finalPrice,
              user_id: this.user_id,
              package_id: event.detail.value.id,
              package_res: JSON.stringify(event.detail.value),
              discount_res: JSON.stringify(event.detail.value.discount_res),
              qty: d.qty
            }

            console.log(JSON.stringify(final_data));

            this.loader.loadingPresent();

            this.authService.AddToCart(final_data).subscribe(
              (res: any) => {
                console.log(res);
                if (res.error === false) {
                  this.toastService.presentToast(res.msg);
                  this.loader.loadingDismiss();
                  this.storageService.setCartCount(res.total_items);
                  // total_items
                  this.modalController.dismiss(data);
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
      ]
    });

    await alert.present();


  }
}
