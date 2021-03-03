import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service'; import Swal from 'sweetalert2';
declare const RazorpayCheckout: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  user_id: any;
  transported_id: any;
  delivery_option: any;
  currency: any;
  freight: any;
  notes: any;
  constructor(public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loaderservice: LoaderService,
    private toastService: ToastService,

    private storageService: StorageService) {

    this.transported_id = localStorage.getItem('transported_id');
    this.delivery_option = localStorage.getItem('delivery_option');
    this.freight = localStorage.getItem('freight');
    this.currency = localStorage.getItem('grandTotal');
    this.notes = localStorage.getItem('notes');
    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;


      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
  }

  ngOnInit() {
  }
  openRazorpay() {


    const options = {
      description: 'Credits towards Parnami',
      image: 'http://parnamib2b.com/public/home_page_images/4e7b67faf1c12a7f1e171e8d60404385.png',
      currency: 'INR',
      key: 'rzp_live_oUl09l5hlzy0Cq',
      amount: this.currency + '00',
      name: 'Parnami',
      // redirect: true,
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: {
        color: '#F77734'
      },
      modal: {
        ondismiss() {
          alert('dismissed');
        }
      }
    };




    var successCallback = (payment_id) => {
      // alert('payment_id: ' + payment_id);
      // this.payment_id = payment_id;

      this.loaderservice.loadingPresent();
      var new_transported_id = '';
      var new_delivery_option = '';
      var new_freight = '';
      var new_notes = '';
      if (this.transported_id == 'undefined') {
        new_transported_id = '';
      }
      else {
        new_transported_id = this.transported_id
      }
      if (this.delivery_option == 'undefined') {
        new_delivery_option = '';
      }
      else {
        new_delivery_option = this.delivery_option;
      }
      if (this.freight == 'undefined') {
        new_freight = '';
      }
      else {
        new_freight = this.freight;
      }

      if (this.notes == 'undefined') {
        new_notes = '';
      }
      else {
        new_notes = this.notes;
      }

      const data = {
        payment_type: 'online',
        user_id: this.user_id,
        payment_response: payment_id,
        transporter: new_transported_id,
        delivery_option: new_delivery_option,
        freight: new_freight,
        notes: this.notes

      }
      console.log(JSON.stringify(data));


      this.authService.CheckoutCashOnDelivery(data).subscribe(
        (res: any) => {
          this.loaderservice.loadingDismiss();

          if (res.error === false) {

            this.storageService.removeCartCount();
            this.nav.navigateForward("my-order/:price");
            Swal.fire({
              title: 'Success',
              text: 'Your Order is created succesfully',
              icon: 'success',
              backdrop: false,
            });


          }
          else {
            this.toastService.presentToast(res.msg);

          }

        },
        (error: any) => {
          this.loaderservice.loadingDismiss();
          if (JSON.stringify(error.error.errors) != null) {
            this.toastService.presentToast(JSON.stringify(error.error.errors));
          }
          else {
            this.toastService.presentToast("Network Issue...");
          }
        }
      );

    };


    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')')
    }

    RazorpayCheckout.open(options, successCallback, cancelCallback);


  }
  payWithCredit() {

  }

  placeOrder() {

    console.log('place order');
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      backdrop: false,
      background: 'white',
      confirmButtonText: 'Yes',
      cancelButtonText: 'cancel',
    }).then((data) => {
      console.log(data);
      if (data && data.value) {
        console.log('go to procesed');

        var new_transported_id = '';
        var new_delivery_option = '';
        var new_freight = '';
        var new_notes = '';
        if (this.transported_id == 'undefined') {
          new_transported_id = '';
        }
        else {
          new_transported_id = this.transported_id
        }
        if (this.delivery_option == 'undefined') {
          new_delivery_option = '';
        }
        else {
          new_delivery_option = this.delivery_option;
        }
        if (this.freight == 'undefined') {
          new_freight = '';
        }
        else {
          new_freight = this.freight;
        }
        if (this.notes == 'undefined') {
          new_notes = '';
        }
        else {
          new_notes = this.notes;
        }
        const data = {
          payment_type: 'cash_on_delivery',
          user_id: this.user_id,
          payment_response: '',
          transporter: new_transported_id,
          delivery_option: new_delivery_option,
          freight: new_freight,
          notes: new_notes
        }

        console.log('COD = > ' + JSON.stringify(data));

        this.loaderservice.loadingPresent('Creating Order');
        this.authService.CheckoutCashOnDelivery(data).subscribe(
          (res: any) => {
            if (res.error === false) {

              this.loaderservice.loadingDismiss();
              // this.toastService.presentToast(res.msg);
              this.storageService.removeCartCount();
              this.nav.navigateForward("my-order/:price");
              Swal.fire({
                title: 'Success',
                text: 'Your Order is created succesfully',
                icon: 'success',
                backdrop: false,
              });



            }
            else {
              this.loaderservice.loadingDismiss();
              this.toastService.presentToast(res.msg);

            }

          },
          (error: any) => {
            this.loaderservice.loadingDismiss();
            if (JSON.stringify(error.error.errors) != null) {
              this.toastService.presentToast(JSON.stringify(error.error.errors));
            }
            else {
              this.toastService.presentToast("Network Issue...");
            }
          }
        );


      }
    });
  }
}
