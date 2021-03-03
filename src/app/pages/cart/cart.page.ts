import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { LoginPage } from '../login/login.page';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  gridVisiable = true;
  randomNumber: Number;
  rad: Number;
  lang: any;
  CartItems: any;
  Items: any;
  coupon: ''
  product_name: any;
  qty: any;
  total_price: any;
  header_item: any = [];
  user_id: any;
  qtyy = 0;
  product_id: any = [];
  SubTotalPrice = 0;
  product_packages: any;
  showData = false;
  DisFla = false;
  pack: any;
  pack_data: any;
  package_id: null
  package_name: any;
  package_qty: any;
  package_price: any;
  newpack: any;
  CoponsList: any;
  coupon_discount: '';

  CartItem = {
    qtyyes: 0
  }



  totalPrice: any = 0;
  totalItem: any = 0;
  serviceTax: any = 0;
  deliveryCharge: any = 0;
  grandTotal: any = 0;
  dicount: any = 0;
  ItemNotes: any;
  NotesAvailable: any;
  minusButton = false;
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    public menuCtrl: MenuController,
    // private socialSharing: SocialSharing,
    private storageService: StorageService) {
    this.randomNumber = Math.random();
    this.lang = localStorage.getItem('lang');
    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
        // this.MyCart();
        console.log(this.user_id + "val.result_FrontLogin.id");

      }
      else {
        this.user_id = '';
        // this.MyCart();
        console.log(this.user_id + "empty");

        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    setTimeout(() => {



      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
          this.MyCart();
          console.log(this.rad + "RandomNum");

        }
        else {
          // this.MyCart();
          this.rad = this.randomNumber;

          this.storageService.setRandomNumber(this.randomNumber);

          console.log(this.rad + "this.randomNumber");

        }

      });
    }, 1000);



  }

  ngOnInit() {
    setTimeout(() => {
      // this.MyCart();
      this.HomePageSettings();



    }, 1000);

  }

  MyCart() {
    const data = {
      session_id: this.rad,
      user_id: this.user_id,
      lang: this.lang
    }
    // this.nav.navigateForward("cart");


    this.loader.loadingPresent();

    this.authService.MyCartItems(data).subscribe(
      (res: any) => {
        console.log('My Cart Data => ' + JSON.stringify(res.result_viewCart));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.CartItems = res.result_viewCart;
          this.CoponsList = res.result_viewCart.cart_items.coupon_detail.title;
          this.totalPrice = res.result_viewCart.cart_items.header.total_price;
          this.grandTotal = Number(res.result_viewCart.cart_items.header.total_price) + Number(this.deliveryCharge);
          console.log(this.grandTotal);
          if (res.result_viewCart.cart_items.coupon_detail.discount_type != "Flate") {

            res.result_viewCart.cart_items.coupon_detail.DisFla = false;
          }
          else {
            res.result_viewCart.cart_items.coupon_detail.DisFla = true;
          }
          this.coupon_discount = res.result_viewCart.cart_items.coupon_detail.discount_value;
          this.storageService.setCartCount(res.result_viewCart.cart_items.header_item.length);


          // this.total_dc = this.data.length;




          for (let i = 0; i < res.result_viewCart.cart_items.header_item.length; i++) {
            this.product_packages = res.result_viewCart.cart_items.header_item[i].package_id;

            this.pack = res.result_viewCart.cart_items.header_item[i];
            this.package_id = res.result_viewCart.cart_items.header_item[i].package_id;

            console.log(this.package_id);
            if (res.result_viewCart.cart_detail[i].product_detail.notes_available === 1) {
              this.NotesAvailable = 1;
              this.ItemNotes = res.result_viewCart.cart_items.header_item[i].notes;
            }


            if (this.package_id == null) {
              res.result_viewCart.cart_items.header_item[i].showData = false;
            }
            else {
              res.result_viewCart.cart_items.header_item[i].showData = true;

            }

            this.pack_data = this.pack;
            this.newpack = JSON.parse(this.pack_data.package_res);




            console.log('Pacakge Res => ' + res.result_viewCart.cart_items.header_item[i].package_res);



          }

          if (this.CartItems.cart_items.header_item.length == 0) {
            this.gridVisiable = false;
          }

        }
        else {
          this.loader.loadingDismiss();
          this.toastService.presentToast(res);
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

  Delete(product_id) {
    var pack_id = '';
    if (this.product_packages != 'null') {
      pack_id = this.product_packages;
    }
    else {
      pack_id = '';
    }


    const data = {
      session_id: this.rad,
      user_id: this.user_id,
      product_id: product_id,
      package_id: pack_id
      // selling_price_id: sp_id
    }

    this.loader.loadingPresent();

    this.authService.remove_product_from_cart(data).subscribe(
      (res: any) => {
        console.log('My Cart Delete Data => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.toastService.presentToast(res.msg);
          // this.MyCart();
          window.location.reload();

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


  async AddNotes(id, note) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Notes',
      inputs: [
        {
          name: 'notes',
          type: 'text',
          placeholder: '',
          value: note

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

            // this.modalController.dismiss(data);

            this.ItemNotes = d.notes;
            const final_data = {
              id: id,
              notes: d.notes

            }

            console.log(JSON.stringify(final_data));

            this.loader.loadingPresent();

            this.authService.StoreItemNotes(final_data).subscribe(
              (res: any) => {
                console.log(res);
                this.loader.loadingDismiss();
                if (res.error === false) {
                  this.toastService.presentToast(res.msg);
                  this.MyCart();

                }
                else {
                  this.loader.loadingDismiss();
                  this.toastService.presentToast(res.msg);
                }

              },
              (error: any) => {
                const errors = [];
                this.loader.loadingDismiss();
                if (JSON.stringify(error.error.errors) != null) {
                  // 5 - For each error property (which is a form field)
                  for (const property in error.error.errors) {

                    if (error.error.errors.hasOwnProperty(property)) {

                      // 6 - Extract it's array of errors
                      const propertyErrors: Array<string> = error.error.errors[property];

                      // 7 - Push all errors in the array to the errors array
                      propertyErrors.forEach(error => errors.push(error));
                      console.log(errors[0]);
                      
                      this.toastService.presentToast(errors[0]);

                    }
                  }
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

  async AddQty(product_id, j, qty, pp, id) {
    console.log("Add QTY Manully==>>> " + j);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update Quantity',
      inputs: [
        {
          name: 'qty',
          type: 'number',
          placeholder: '',
          value: qty
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
            console.log(pp);

            const pid = this.CartItems.cart_items.header_item[j].product_id;
            if (pid == product_id) {
              // this.CartItems.cart_items.header_item[j].qty++;
              console.log(j + "--" + this.CartItems.cart_items.header_item[j].qty);

              var selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;

              if (selling_price_id != null) {
                selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;
              }
              else {
                selling_price_id = ''
              }

              var pack_id = '';
              if (this.product_packages != 'null') {
                pack_id = this.product_packages;
              }
              else {
                pack_id = '';
              }
              const data = {
                session_id: this.rad,
                user_id: this.user_id,
                product_id: product_id,
                selling_price_id: selling_price_id,
                plus_or_minus: '',
                price: pp,
                package_id: id,
                qty: d.qty

              }
              console.log('Update Cart Data => ' + JSON.stringify(data));

              this.loader.loadingPresent();

              this.authService.update_cart(data).subscribe(
                (res: any) => {
                  // console.log('My Cart Data => ' + JSON.stringify(res));
                  if (res.error === false) {
                    this.loader.loadingDismiss();

                    this.toastService.presentToast(JSON.stringify(res.msg));
                    this.MyCart();
                    this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
                    // this.CartItems.cart_items.header_item[j].qty = JSON.stringify(res.item_qty);
                    // this.CartItems.cart_items.header_item[j].total_price = JSON.stringify(res.item_total_price);
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


              )
            }


          }
        }
      ]
    });

    await alert.present();

  }

  async AddQtySingle(product_id, j, pp, qty) {

    console.log("Add QTY Manully==>>> " + j);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update Quantity',
      inputs: [
        {
          name: 'qty',
          type: 'number',
          placeholder: '',
          value: qty
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
            console.log(pp);

            const pid = this.CartItems.cart_items.header_item[j].product_id;
            if (pid == product_id) {
              // this.CartItems.cart_items.header_item[j].qty++;
              console.log(j + "--" + this.CartItems.cart_items.header_item[j].qty);

              var selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;

              if (selling_price_id != null) {
                selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;
              }
              else {
                selling_price_id = ''
              }

              var pack_id = '';
              if (this.product_packages != 'null') {
                pack_id = this.product_packages;
              }
              else {
                pack_id = '';
              }
              const data = {
                session_id: this.rad,
                user_id: this.user_id,
                product_id: product_id,
                selling_price_id: selling_price_id,
                plus_or_minus: '',
                price: pp,
                package_id: '',
                qty: d.qty

              }
              console.log('Update Cart Data => ' + JSON.stringify(data));

              this.loader.loadingPresent();

              this.authService.update_cart(data).subscribe(
                (res: any) => {
                  // console.log('My Cart Data => ' + JSON.stringify(res));
                  if (res.error === false) {
                    this.loader.loadingDismiss();

                    this.toastService.presentToast(JSON.stringify(res.msg));
                    this.MyCart();
                    this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
                    // this.CartItems.cart_items.header_item[j].qty = JSON.stringify(res.item_qty);
                    // this.CartItems.cart_items.header_item[j].total_price = JSON.stringify(res.item_total_price);
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


              )
            }


          }
        }
      ]
    });

    await alert.present();

  }
  addQuantity(product_id, j, pp, qty) {

    console.log(pp);

    const pid = this.CartItems.cart_items.header_item[j].product_id;
    if (pid == product_id) {
      this.CartItems.cart_items.header_item[j].qty++;
      console.log(j + "--" + this.CartItems.cart_items.header_item[j].qty);

      var selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;

      if (selling_price_id != null) {
        selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;
      }
      else {
        selling_price_id = ''
      }

      var pack_id = '';
      if (this.product_packages != 'null') {
        pack_id = this.product_packages;
      }
      else {
        pack_id = '';
      }
      const data = {
        session_id: this.rad,
        user_id: this.user_id,
        product_id: product_id,
        selling_price_id: selling_price_id,
        plus_or_minus: 'plus',
        price: pp,
        package_id: '',
        qty: qty

      }
      console.log('Update Cart Data => ' + JSON.stringify(data));

      this.loader.loadingPresent();

      this.authService.update_cart(data).subscribe(
        (res: any) => {
          // console.log('My Cart Data => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();

            this.toastService.presentToast(JSON.stringify(res.msg));
            this.MyCart();
            this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
            // this.CartItems.cart_items.header_item[j].qty = JSON.stringify(res.item_qty);
            // this.CartItems.cart_items.header_item[j].total_price = JSON.stringify(res.item_total_price);
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


      )
    }




  }



  minusQuantity(product_id, i, pp, qty) {
    const pid = this.CartItems.cart_items.header_item[i].product_id;
    if (pid == product_id) {
      if (this.CartItems.cart_items.header_item[i].qty != 1) {
        this.CartItems.cart_items.header_item[i].qty--
        console.log(i + "--" + this.CartItems.cart_items.header_item[i].qty);
        this.SubTotalPrice += Number(this.CartItems.cart_items.header_item[i].total_price);


        var selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;

        if (selling_price_id != null) {
          selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;
        }
        else {
          selling_price_id = ''
        }

        var pack_id = '';
        if (this.product_packages != 'null') {
          pack_id = this.product_packages;
        }
        else {
          pack_id = '';
        }
        const data = {
          session_id: this.rad,
          user_id: this.user_id,
          product_id: product_id,
          selling_price_id: selling_price_id,
          plus_or_minus: 'minus',
          price: pp,
          package_id: '',
          qty: qty - 1

        }
        console.log('Update Cart Data => ' + JSON.stringify(data));

        this.loader.loadingPresent();

        this.authService.update_cart(data).subscribe(
          (res: any) => {
            console.log('Update Cart Data => ' + JSON.stringify(res));
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast(JSON.stringify(res.msg));
              this.MyCart();
              this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));

              // this.CartItems.cart_items.header_item[i].qty = JSON.stringify(res.item_qty);
              // this.CartItems.cart_items.header_item[i].total_price = JSON.stringify(res.item_total_price);
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


        )
      }
      else {
        this.CartItems.cart_items.header_item[i].qty = 1;
      }


    }

  }

  // PACKAGE Add Minus

  addQuantityPackage(product_id, j, pp, id, qty) {

    console.log(pp);

    const pid = this.CartItems.cart_items.header_item[j].product_id;
    if (pid == product_id) {
      this.CartItems.cart_items.header_item[j].qty++;
      console.log(j + "--" + this.CartItems.cart_items.header_item[j].qty);

      var selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;

      if (selling_price_id != null) {
        selling_price_id = this.CartItems.cart_items.header_item[j].selling_price_id;
      }
      else {
        selling_price_id = ''
      }

      var pack_id = '';
      if (this.product_packages != 'null') {
        pack_id = this.product_packages;
      }
      else {
        pack_id = '';
      }
      const data = {
        session_id: this.rad,
        user_id: this.user_id,
        product_id: product_id,
        selling_price_id: selling_price_id,
        plus_or_minus: 'plus',
        price: pp,
        package_id: id,
        qty: this.CartItems.cart_items.header_item[j].qty

      }
      console.log('Update Cart Data => ' + JSON.stringify(data));

      this.loader.loadingPresent();

      this.authService.update_cart(data).subscribe(
        (res: any) => {
          // console.log('My Cart Data => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();

            this.toastService.presentToast(JSON.stringify(res.msg));
            this.MyCart();
            this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));
            // this.CartItems.cart_items.header_item[j].qty = JSON.stringify(res.item_qty);
            // this.CartItems.cart_items.header_item[j].total_price = JSON.stringify(res.item_total_price);
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


      )
    }




  }



  minusQuantityPackage(product_id, i, pp, id, qty) {
    const pid = this.CartItems.cart_items.header_item[i].product_id;

    if (pid == product_id) {
      if (this.CartItems.cart_items.header_item[i].qty != 1) {
        this.CartItems.cart_items.header_item[i].qty--
        console.log(i + "--" + this.CartItems.cart_items.header_item[i].qty);
        this.SubTotalPrice += Number(this.CartItems.cart_items.header_item[i].total_price);


        var selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;

        if (selling_price_id != null) {
          selling_price_id = this.CartItems.cart_items.header_item[i].selling_price_id;
        }
        else {
          selling_price_id = ''
        }

        var pack_id = '';
        if (this.product_packages != 'null') {
          pack_id = this.product_packages;
        }
        else {
          pack_id = '';
        }
        const data = {
          session_id: this.rad,
          user_id: this.user_id,
          product_id: product_id,
          selling_price_id: selling_price_id,
          plus_or_minus: 'minus',
          price: pp,
          package_id: id,
          qty: qty - 1

        }
        console.log('Update Cart Data => ' + JSON.stringify(data));

        this.loader.loadingPresent();

        this.authService.update_cart(data).subscribe(
          (res: any) => {
            console.log('Update Cart Data => ' + JSON.stringify(res));
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast(JSON.stringify(res.msg));
              this.MyCart();
              this.SubTotalPrice += Number(JSON.stringify(res.item_total_price));

              // this.CartItems.cart_items.header_item[i].qty = JSON.stringify(res.item_qty);
              // this.CartItems.cart_items.header_item[i].total_price = JSON.stringify(res.item_total_price);
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


        )
      }
      else {
        this.CartItems.cart_items.header_item[i].qty = 1;
      }

    }




  }
  async CheckOutPage() {

    if (this.user_id != '') {


      if (this.NotesAvailable === 1) {
        if (this.ItemNotes !== null) {
          localStorage.setItem('grandTotal', this.grandTotal);
          this.nav.navigateForward("shipping-address");
        }
        else {
          this.toastService.presentToast("Please Add Notes...")
        }
      }
      else {
        localStorage.setItem('grandTotal', this.grandTotal);
        this.nav.navigateForward("shipping-address");
      }

    }
    else {
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          // 'po_id': '',
          // 'dc_id': '',
          // 'to_user_id': ''
        }
      });

      modal.onDidDismiss()
        .then((data) => {

          const user = data['data']; // Here's your selected user!
          console.log("Token =>" + user);
          // this.toke = user;
          window.location.reload();
        });
      return await modal.present();

    }



  }
  async isCoupon() {

    if (this.user_id != '') {
      const data = {

        user_id: this.user_id,
        coupon: this.coupon
        // selling_price_id: sp_id
      }

      this.loader.loadingPresent();

      this.authService.ApplyCoupon(data).subscribe(
        (res: any) => {
          console.log('My Coupon => ' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();

            this.toastService.presentToast(res.msg);
            this.MyCart();

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
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          // 'po_id': '',
          // 'dc_id': '',
          // 'to_user_id': ''
        }
      });

      modal.onDidDismiss()
        .then((data) => {

          const user = data['data']; // Here's your selected user!
          console.log("Token =>" + user);
          // this.toke = user;
          window.location.reload();
        });
      return await modal.present();

    }


  }

  openProductsPage() {
    this.nav.navigateForward("home");
  }

  HomePage() {
    this.nav.navigateForward("home");
  }
  getpackagename(data) {
    return JSON.parse(data.package_res).package_name;
  }
  getpackageqty(data) {
    return JSON.parse(data.package_res).qty;
  }
  getpackageprice(data) {
    return JSON.parse(data.discount_res).price;
  }
  getpackageid(data) {
    return JSON.parse(data.package_res).id;
  }
  getDiscountPrice(data) {


    return JSON.parse(data.package_res).discount_res.dicount;



  }

  getDiscountType(data) {
    return JSON.parse(data.package_res).discount_res.dicount_type;
  }

  getdiscount_res(data) {
    return JSON.parse(data.discount_res);
  }
  getDiscountNonPackagePrice(data) {
    // console.log(data.discount_res);
    return JSON.parse(data.discount_res).dicount;
  }


  getDiscountNonPackageType(data) {
    return JSON.parse(data.discount_res).dicount_type;
  }


  getpackageDisprice(data) {

    if (JSON.parse(data.package_res).discounted_price != null) {
      return JSON.parse(data.package_res).discounted_price;
    }
    else {
      return JSON.parse(data.package_res).price;
    }

  }

  getpackageNoDisprice(data) {
    return JSON.parse(data.package_res).price;
  }

  RemoveCoupon(id) {
    console.log("Coupon Id => " + id);

    this.loader.loadingPresent();
    const data = {

      user_id: this.user_id,
      coupon_id: id
      // selling_price_id: sp_id
    }

    this.authService.RemoveCoupon(data).subscribe(
      (res: any) => {
        console.log('My Coupon => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.toastService.presentToast(res.msg);
          this.MyCart();

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



  HomePageSettings() {




    this.authService.HomePageSettings('').subscribe(
      (res: any) => {
        console.log(res);

        if (res.error === false) {

          this.deliveryCharge = res.result_HomePageSettings.shipping_charge;

        }
        else {

          this.toastService.presentToast(res);

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

  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');

  }
}
