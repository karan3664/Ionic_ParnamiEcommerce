import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoginPage } from '../login/login.page';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs';
import { WriteReviewPage } from '../write-review/write-review.page';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AddtocartPopupPage } from '../addtocart-popup/addtocart-popup.page';

@Component({

  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss']

})
export class ProductDetailsPage implements OnInit {
  cartItemCount: BehaviorSubject<number>;
  rating: number = 4;
  ProductName: any;
  gridVisiable: any;
  data: any;
  heart = false;
  wishlist = false;
  slides = [];
  sliderConfig = {
    slidesPerView: 2.5,
    spaceBetween: 0
  }
  rate: any;
  product_qty: number;
  product_id: '';
  Data = {
    price: '',
    stock: '',
    product_detail: '',
    unit_name: ''

  };
  qtyy = 0;
  user_id = '';
  category_1: any;
  category_name_1: any;
  randomNumber: Number;
  rad: Number;
  selling_price_id: any;
  package_name: any;
  selling_price_res: any;
  productPricing: any = [];
  product_discount: any;
  productPricingValue: any;
  filtermonthwise: any;
  selectedIndex: number;
  convertedPrice: any;
  finalprice: any;
  final_selling_price_id: any;
  final_selling_price_res: any;
  final_product_discount: any;
  toke: any;
  total_cart = '';
  product_packages: any;
  master_carton: any;
  unit_name: any;
  weight: any;
  packing: any;
  lang: any;
  constructor(private route: ActivatedRoute,
    public nav: NavController,
    private modalController: ModalController,
    public alertController: AlertController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    public cartService: CartService,
    private socialSharing: SocialSharing,
    private storageService: StorageService,
  ) {
    this.product_id = this.route.snapshot.params['id']
    console.log(this.product_id);
    this.toke = localStorage.getItem('token');
    console.log("toke =>" + this.toke);
    this.lang = localStorage.getItem('lang');
    this.ProductDetails();


    this.randomNumber = Math.random();
    //in 10 seconds do something
    interval(100).subscribe(x => {
      this.storageService.getCartCount().then((val) => {
        if (val) {
          this.total_cart = val;
        }
        else {
          this.total_cart = '0';


        }

      });
    });
    setTimeout(() => {


      this.storageService.getRandomNumber().then((val) => {
        if (val) {
          this.rad = val;
        }
        else {
          this.rad = this.randomNumber;
          this.storageService.setRandomNumber(this.randomNumber);

        }

      });

      this.storageService.getData().then((val) => {
        if (val) {
          this.user_id = val.result_FrontLogin.id;


          this.ProductDetails();
        }
        else {

          this.user_id = '';
          this.ProductDetails();
          // this.storageService.setRandomNumber(this.randomNumber);

        }

      });
    }, 2000);


  }

  ngOnInit() {
    // this.cartItemCount = this.cartService.getCartItemCount();
  }
  ProductDetails() {


    this.loader.loadingPresent();

    const data = {
      user_id: this.user_id,
      product_id: this.product_id,
      lang: this.lang
    }

    console.log('Product Details => ' + JSON.stringify(data));
    this.authService.GetProductDetails(data).subscribe(
      (res: any) => {
        console.log('Product Details => ' + JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.Data = res.result_GetProductDetails;
          this.gridVisiable = res.result_GetProductDetails;
          // if (res.result_GetProductDetails.length == 0) {
          //   this.gridVisiable = false;
          // }
          this.ProductName = res.result_GetProductDetails[0].product_name;
          console.log(JSON.stringify(res.result_GetProductDetails[0].product_name));
          this.category_1 = res.result_GetProductDetails[0].category_1;
          this.category_name_1 = res.result_GetProductDetails[0].category_name_1;
          this.data = res.result_GetProductDetails[0].related_products.data;

          this.Data.price = res.result_GetProductDetails[0].price;
          this.product_qty = res.result_GetProductDetails[0].total_qty;
          this.Data.product_detail = res.result_GetProductDetails[0].desc;
          if (res.result_GetProductDetails[0].master_carton != null) {
            this.master_carton = res.result_GetProductDetails[0].master_carton + ' ' + res.result_GetProductDetails[0].unit_name;

          }
          this.unit_name = res.result_GetProductDetails[0].unit_value + ' ' + res.result_GetProductDetails[0].unit_name;
          // this.packing = res.GetProductDetails[0].packing;
          // this.weight = res.GetProductDetails[0].weight;

          // this.productPricing = res.result_GetProductDetails.product_pricing;
          // this.product_discount = res.result_GetProductDetails.product_discount;
          this.slides = res.result_GetProductDetails[0].product_images;
          console.log(res.result_GetProductDetails[0].wish_list);

          for (let i = 0; i < res.result_GetProductDetails.length; i++) {
            this.product_packages = this.Data[i].product_packages;
            console.log('Product Details => ' + JSON.stringify(this.Data[i].product_packages));

          }

          if (res.result_GetProductDetails[0].wish_list != this.heart) {
            this.heart = !this.heart;
          } else {
            this.heart = this.heart;
          }

          if (this.product_qty > 0) {
            this.Data.stock = 'In Stock'
          }
          else {
            this.Data.stock = 'Out Of Stock'
          }
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
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }
  goToProductPage() {
    localStorage.setItem('cattokenP', this.category_1);
    localStorage.setItem('catNameP', this.category_name_1);

    this.router.navigate(['category-product']);
  }
  async clickWishList() {

    var userid = '';


    if (this.user_id != '') {

      if (this.toke != '') {
        userid = this.toke;
      }
      else {
        userid = this.user_id;
      }

      const data = {
        user_id: userid,
        product_id: this.product_id

      }
      console.log("heart => " + JSON.stringify(data));
      this.loader.loadingPresent();

      if (this.heart != true) {
        this.heart = !this.heart;
        this.authService.AddToWishList(data).subscribe(
          (res: any) => {
            console.log(res);
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast('Added To Wish List!');
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
        this.heart = !this.heart;

        this.authService.remove_product_from_wishlist(data).subscribe(
          (res: any) => {
            console.log(res);
            if (res.error === false) {
              this.loader.loadingDismiss();

              this.toastService.presentToast('Removed From Wish List!');
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
    else {
      const modal = await this.modalController.create({
        component: LoginPage,
        componentProps: {
          'po_id': this.product_id,
          // 'dc_id': '',
          // 'to_user_id': ''
        }
      });

      modal.onDidDismiss()
        .then((data) => {

          const user = data['data']; // Here's your selected user!
          console.log("Token =>" + user);
          this.toke = user;
          window.location.reload();
        });

      return await modal.present();
    }



  }

  goToCartPage() {
    this.nav.navigateForward("cart");
  }

  async share() {
    this.socialSharing.share(this.ProductName, '', null, '');
    // this.toast.presentToast("Share Is Clicked");
  }

  async goToCart() {

    var finalPrice = '';

    if (this.Data[0].discounted_price != null) {
      finalPrice = this.Data[0].discounted_price;
    }
    else {
      finalPrice = this.Data.price;
    }

    if (this.product_packages.length > 0) {
      const modal = await this.modalController.create({
        component: AddtocartPopupPage,
        cssClass: 'cart-modal',
        componentProps: {
          'id': this.product_id,
          'session_id': this.rad,
          'price': finalPrice,
          'user_id': this.user_id
        }
      });
      modal.onDidDismiss()
        .then((data) => {

          const package_res = data['data']; // Here's your selected user!
          console.log("DataPackage =>" + JSON.stringify(package_res));

          // window.location.reload();
        });

      return await modal.present();
    }
    else {
      const data = {
        session_id: this.rad,
        product_id: this.product_id,
        price: finalPrice,
        user_id: this.user_id,
        package_id: '',
        package_res: '',
        discount_res: JSON.stringify(this.Data[0].discount_res)

      }

      console.log('Add To Cart Data => ' + JSON.stringify(data));

      this.loader.loadingPresent();

      this.authService.AddToCart(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            this.toastService.presentToast(res.msg);
            this.loader.loadingDismiss();
            this.storageService.setCartCount(res.total_items);

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
  goToProductDetail(id) {
    // this.nav.navigateForward("product-detail/", id);
    this.router.navigate(["product-details/", id]);
  }

  // goToCartRelated(id, price, packages) {



  //   const data = {
  //     session_id: this.rad,
  //     product_id: id,
  //     price: price,
  //     user_id: this.user_id
  //   }

  //   console.log('Add To Cart Data => ' + JSON.stringify(data));

  //   this.loader.loadingPresent();

  //   this.authService.AddToCart(data).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       if (res.error === false) {
  //         this.toast.presentToast(res.msg);
  //         this.loader.loadingDismiss();
  //         this.storageService.setCartCount(res.total_items);

  //       }
  //       else {
  //         this.loader.loadingDismiss();
  //         this.toast.presentToast(res.msg);
  //       }

  //     },
  //     (error: any) => {
  //       this.loader.loadingDismiss();
  //       if (JSON.stringify(error.error.errors) != null) {
  //   this.toastService.presentToast(JSON.stringify(error.error.errors));
  // }
  // else {
  //   this.toastService.presentToast("Network Issue...");
  // }
  //     }
  //   );

  // }

  async goToCartRelated(id, price, packageres, discounted_price, discount_res) {
    console.log(discounted_price);

    var finalPrice = '';

    if (discounted_price != null) {
      finalPrice = discounted_price;
    }
    else {
      finalPrice = price;
    }


    if (packageres.length > 0) {
      const modal = await this.modalController.create({
        component: AddtocartPopupPage,
        cssClass: 'cart-modal',
        componentProps: {
          'id': id,
          'session_id': this.rad,
          'price': finalPrice,
          'user_id': this.user_id
        }
      });
      modal.onDidDismiss()
        .then((data) => {

          const package_res = data['data']; // Here's your selected user!
          console.log("DataPackage =>" + JSON.stringify(package_res));

          // window.location.reload();
        });

      return await modal.present();
    }
    else {
      const data = {
        session_id: this.rad,
        product_id: id,
        price: finalPrice,
        user_id: this.user_id,
        package_id: '',
        package_res: '',
        discount_res: JSON.stringify(discount_res)

      }

      console.log('Add To Cart Data => ' + JSON.stringify(data));

      this.loader.loadingPresent();

      this.authService.AddToCart(data).subscribe(
        (res: any) => {
          console.log(res);
          if (res.error === false) {
            this.toastService.presentToast(res.msg);
            this.loader.loadingDismiss();
            this.storageService.setCartCount(res.total_items);

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

  async openReviewsPage() {
    const modal = await this.modalController.create({
      component: WriteReviewPage,
      componentProps: {
        'id': this.product_id,
        'session_id': this.rad,
        'price': this.Data.price,
        'user_id': this.user_id
      }
    });

    modal.onDidDismiss()
      .then((data) => {

        // const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        // this.toke = user;
        window.location.reload();
      });

    return await modal.present();
  }

  onModelChange(rating) {
    console.log("changed rating: ", rating);

    const data = {
      star: rating,
      products_id: this.product_id,
      user_id: this.user_id
    }

    console.log('Add To Cart Data => ' + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.RateProduct(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.toastService.presentToast(res.msg);
          this.loader.loadingDismiss();
          // this.storageService.setCartCount(res.total_items);

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

    // do your stuff
  }
}
