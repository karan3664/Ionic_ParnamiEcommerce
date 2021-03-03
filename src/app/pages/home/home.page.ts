import { Component, OnInit, NgZone, ViewChild, ElementRef, } from '@angular/core';

import { NavController, MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { interval } from 'rxjs';
import { AddtocartPopupPage } from '../addtocart-popup/addtocart-popup.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  lang: any;
  alldata: any;
  segment: string;
  newestItems: any;
  OfferedProduct: any;
  Categories: any;
  sliderConfig = {
    slidesPerView: 2.5,
    spaceBetween: 0
  }
  total_cart = '';
  randomNumber: Number;
  rad: Number;
  user_id: any;
  product_id: '';
  Data = {
    price: '',
    stock: '',
    product_detail: '',
    unit_name: ''



  };

  p: any[] = [1];
  catId: any = [];

  product_packages: any;
  product_packages_OFFER: any;
  dummy = Array(20);
  flipAnim: any;
  constructor(public nav: NavController,
    private modalController: ModalController,
    private authService: AuthService,
    public menuCtrl: MenuController,
    private loader: LoaderService,
    public ngZone: NgZone,
    private router: Router,
    private storageService: StorageService,
    private toastService: ToastService) {
    this.segment = 'home';
    this.lang = localStorage.getItem('lang');
    this.randomNumber = Math.random();
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
    }, 500);

    setTimeout(() => {
      this.storageService.getData().then((val) => {
        if (val) {
          this.user_id = val.result_FrontLogin.id;
          this.GlobalCollecionItem();
          this.OfferedProductItem();
          this.CategoriesItem();
        }
        else {

          this.user_id = '';
          this.GlobalCollecionItem();
          this.OfferedProductItem();
          this.CategoriesItem();
          // this.storageService.setRandomNumber(this.randomNumber);

        }

      });
    }, 1000)
  }

  ngOnInit() {


  }



  doRefresh(event) {
    console.log('Begin async operation');
    this.GlobalCollecionItem();
    this.OfferedProductItem();
    this.CategoriesItem();
    this.dummy = Array(20);
    setTimeout(() => {
      this.dummy = [];
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  ReloadHome() {
    // this.loader.loadingPresent();
    this.dummy = Array(20);
    this.ngZone.run(() => {

      this.GlobalCollecionItem();
      this.OfferedProductItem();
      this.CategoriesItem();
      setTimeout(() => {
        this.dummy = [];
        // this.loader.loadingDismiss();
        console.log('Async operation has ended');
      }, 2000);
    });


  }
  GlobalCollecionItem() {
    // this.loader.loadingPresent();
    const data = {
      user_id: this.user_id,
      lang: this.lang
    }
    this.authService.GlobalCollecionItem(data).subscribe(
      (res: any) => {
        console.log(res);
        this.dummy = [];
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.newestItems = res.result_GlobalCollecionItem;
          this.alldata = res.result_GlobalCollecionItem;
          // this.newestItems = res.result_BestSellingItemsHome;
          // this.dummy = [];
          for (let i = 0; i < this.newestItems.length; i++) {
            this.product_packages = this.newestItems[i].product_packages;
            console.log('Product Global => ' + JSON.stringify(this.product_packages));

          }
        }
        else {
          // this.loader.loadingDismiss();
          this.dummy = [];
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.dummy = [];
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

  OfferedProductItem() {
    const data = {
      user_id: this.user_id,
      lang: this.lang
    }
    // this.loader.loadingPresent();
    this.authService.DiscountedProductsHome(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.OfferedProduct = res.result_DiscountedProductsHome;
          // this.newestItems = res.result_BestSellingItemsHome;
          for (let i = 0; i < this.OfferedProduct.data.length; i++) {
            this.product_packages_OFFER = this.OfferedProduct.data[i].product_packages;
            console.log('Product Offer => ' + JSON.stringify(this.product_packages_OFFER));

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

  goToProductDetail(id) {
    // this.nav.navigateForward("product-detail/", id);
    this.router.navigate(["product-details/", id]);
  }
  goToSearchPage() {
    this.nav.navigateForward("search");
  }
  goToCartPage() {
    this.nav.navigateForward("cart");
  }

  CategoriesItem() {
    // this.loader.loadingPresent();
    const data = {
      lang : this.lang
    }
    this.authService.AllCategories(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Categories = res.result_AllCategories;
          // this.newestItems = res.result_BestSellingItemsHome;

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


  goToProduct(id, name) {

    console.log(id, name);
    // this.catId.push(id)
    // localStorage.setItem('cattoken', id);
    // localStorage.setItem('catName', name);


    this.router.navigate(['all-products']);

  }
  goToCategoryProduct(id, name) {

    console.log(id, name);
    // this.catId.push(id) 
    localStorage.setItem('cattokenP', id);
    localStorage.setItem('catNameP', name);

    this.router.navigate(['category-product']);

  }



  async goToCart(id, price, packageres, discounted_price, discount_res) {
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
        // cssClass: 'test-modal',
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

  goToProductPage() {


    this.router.navigate(['all-products']);
  }
  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');
    localStorage.removeItem('cattoken');
    localStorage.removeItem('price_min');
    localStorage.removeItem('price_max');
    localStorage.removeItem('BrandId');

    // window.location.reload();
  }


}

