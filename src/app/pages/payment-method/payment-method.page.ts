import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, AlertController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

declare const RazorpayCheckout: any;

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  notes: any;
  rad: Number;
  Name: '';
  Mobile: '';
  Address: '';
  user_id: '';
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
  CartItems: any;
  SubTotalPrice = 0;
  ShippingCharge = 0;
  Total = 0;
  product_packages: any;
  showData = false;
  DisFla = false;
  DisExtra = false;
  pack: any;
  pack_data: any;
  package_id: null
  package_name: any;
  package_qty: any;
  package_price: any;
  newpack: any;
  paymentMethods = ["Direct bank transfer", "Cash on delivery"];

  payment_Value = '';
  DiscountValue: any;
  ExtraDiscountValue = 0;
  EDV = 0;
  V1 = 0;
  V2 = 0;
  V3 = 0;
  V4 = 0;
  V5 = 0;
  V6 = 0;
  V7 = 0;

  extra_discount_type: any;

  Transporter: any;
  transporter: any;
  delivery_option: any;
  freight: any;

  transporter_id: '';

  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router,
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

        this.ConfirmDetails();
        this.HomePageSettings();
        this.TransporterList();
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    setTimeout(() => {


    }, 3000);
  }

  ngOnInit() {

  }


  ConfirmDetails() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id
    }
    // this.nav.navigateForward("cart");

    console.log('My shipping_addresses => ' + JSON.stringify(data));
    this.loader.loadingPresent();

    this.authService.checkout(data).subscribe(
      (res: any) => {
        console.log('My shipping_addresses => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          // console.log('My shipping_addresses 2 => ' + JSON.stringify(res.result_checkout.shipping_addresses));

          this.postData.address = res.result_checkout.default_address.address;
          this.postData.name = res.result_checkout.default_address.name;
          this.postData.mobile_number = res.result_checkout.default_address.mobile;
          this.postData.email = res.result_checkout.default_address.email;
          this.postData.pincode = res.result_checkout.default_address.pincode;
          this.postData.locality = res.result_checkout.default_address.locality;
          this.postData.landmark = res.result_checkout.default_address.lang_mark;
          this.postData.alt_phone = res.result_checkout.default_address.alternate_phone;
          this.postData.city = res.result_checkout.default_address.city;
          this.ExtraDiscountValue = res.result_checkout.cart_items.header.extra_discount;
          this.DiscountValue = res.result_checkout.cart_items.header.discount_price;
          this.extra_discount_type = res.result_checkout.cart_items.header.extra_discount_type;
          for (let i = 0; i < res.result_checkout.cart_items.header_item.length; i++) {
            this.SubTotalPrice += Number(res.result_checkout.cart_items.header_item[i].total_price);
            // this.price = this.Data[i].product_packages[i].price;
          }

          this.V1 = this.SubTotalPrice;
          this.V2 = this.ShippingCharge;



          this.V4 = this.DiscountValue;

          this.V3 = (Number(this.V1) - Number(this.V4));
          console.log("V3 => " + this.V3);
          console.log("V4 => " + this.V4);
          // if (this.V4 != null) {
          //   if (res.result_checkout.cart_items.coupon_detail.discount_type != "Flate") {

          //     res.result_checkout.cart_items.coupon_detail.DisFla = false;
          //     this.V5 = this.V3 - ((this.V3 * this.V4) / 100);
          //   }
          //   else {
          //     this.V5 = ((this.V3 - this.V4));
          //     res.result_checkout.cart_items.coupon_detail.DisFla = true;

          //   }
          // }

          this.V5 = (Number(this.V3) + Number(this.V2));
          // if (this.V3 != 0) {
          //   this.Total = this.V3;
          // } else {

          // }
          this.Total = this.V5;
          console.log("V5 => " + this.V3);
          console.log(this.Total + "Fianl Amount");


          // nettotal = total -  ((total - discount)/100)
          this.CartItems = res.result_checkout;
          for (let i = 0; i < res.result_checkout.cart_detail.length; i++) {
            // this.product_packages = res.result_checkout.cart_detail[i].package_id;

            // this.pack = res.result_checkout.cart_detail[i];
            this.package_id = res.result_checkout.cart_detail[i].package_id;

            console.log(this.package_id);



            if (this.package_id == null) {
              res.result_checkout.cart_detail[i].showData = false;
            }
            else {
              res.result_checkout.cart_detail[i].showData = true;

            }

            // this.pack_data = this.pack;
            // this.newpack = JSON.parse(this.pack_data.package_res);




            // console.log('Pacakge Res => ' + res.result_viewCart.cart_items.header_item[i].package_res);



          }


        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toastService.presentToast("Error..." + JSON.stringify(error.error.errors));
      }
    );

  }


  HomePageSettings() {




    this.authService.HomePageSettings('').subscribe(
      (res: any) => {
        console.log(res);

        if (res.error === false) {

          this.ShippingCharge = res.result_HomePageSettings.shipping_charge;

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


  TransporterList() {

    const data = {
      name: ''
    }


    this.authService.TransporterList(data).subscribe(
      (res: any) => {
        console.log(res);

        if (res.error === false) {

          this.Transporter = res.result_TransporterList;

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


  TransporterSelect(value) {
    console.log(value);
    this.transporter_id = value.id;

  }

  DeliveryOption(value) {
    console.log(value);
    this.delivery_option = value;

  }

  Selectfreight(value) {
    console.log(value);
    this.freight = value;
  }




  goToPaymentOption() {
    console.log(this.notes);

    localStorage.setItem('transported_id', this.transporter_id);
    localStorage.setItem('delivery_option', this.delivery_option);
    localStorage.setItem('freight', this.freight);
    localStorage.setItem('notes', this.notes)
    // this.nav.navigateForward("payment");
    this.router.navigateByUrl('payment');
  }

  pay() {

  }

  getpackagename(data) {
    return JSON.parse(data.package_res).package_name;
  }
  getpackageqty(data) {
    return JSON.parse(data.package_res).qty;
  }
  getpackageprice(data) {
    return JSON.parse(data.package_res).price;
  }
}