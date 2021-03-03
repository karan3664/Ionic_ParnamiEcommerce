import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController, MenuController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { interval } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AddtocartPopupPage } from '../addtocart-popup/addtocart-popup.page';
@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.page.html',
  styleUrls: ['./category-product.page.scss'],
})
export class CategoryProductPage implements OnInit {

  CategoryName: any;
  cat_id = '';
  data: any[];
  finalData: any;
  randomNumber: Number;
  rad: Number;
  user_id: any;
  customer_id: any;
  postData: any = [{
    product_name: '',
    unit_name: ''
  }];
  catid: any;
  brdnid: any;
  actionSheet: any;
  filtermonthwise: '';
  Categories: any;
  // public itemsHome: any = [];//home list
  public itemsCategory: any = [];//category list
  visibleCategory = false;//for category expand
  catId: any = [];
  pricemin: any;
  pricemax: any;
  sortby: any;
  dummy = Array(20);
  total_cart = '';
  lang: any;
  constructor(private route: ActivatedRoute,
    public menuCtrl: MenuController,
    public appcompo: AppComponent,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    public router: Router,
    private authService: AuthService,
    private loader: LoaderService,
    private storageService: StorageService,
    private toastService: ToastService) {
    this.randomNumber = Math.random();
    this.lang = localStorage.getItem('lang');

    this.CategoryName = localStorage.getItem('catNameP');
    // this.cat_id = this.route.snapshot.params['id'];
    // this.CategoryName = this.route.snapshot.params['name'];
    // console.log(this.cat_id);
    // this.lang = localStorage.getItem('lang');


    this.sortby = 'new';
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

    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
        this.ProductByCategory();
      }
      else {

        this.user_id = '';
        this.ProductByCategory();
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });



  }

  
  ngOnInit() {
    this.menuCtrl.enable(true, 'menuAdmin');

  }
  ionViewDidEnter(){
    
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ProductByCategory();
    this.dummy = Array(20);
    setTimeout(() => {
      this.dummy = [];
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ProductByCategory() {
    // this.loader.loadingPresent();
    var toke = localStorage.getItem('cattokenP');
    var brnd = localStorage.getItem('BrandId');
    var pmin = localStorage.getItem('price_min');
    var pmax = localStorage.getItem('price_max');

    console.log('cattoken => ' + toke);
    console.log('brnd => ' + brnd);
    console.log('pmin => ' + pmin);
    console.log('pmax => ' + pmax);

    if (this.catid != '') {
      this.catid = toke;
    }
    else {
      this.catid = this.cat_id;
    }

    if (this.brdnid != '') {
      this.brdnid = brnd;
    }
    else {
      this.brdnid = '';
    }

    if (this.pricemin != '') {
      this.pricemin = pmin
    }
    else {
      this.pricemin = ''
    }
    if (this.pricemax != '') {
      this.pricemax = pmax
    }
    else {
      this.pricemax = ''
    }
    const params = {
      page: '',
      sortBy: '',
      MinPrice: this.pricemin,
      MaxPrice: this.pricemax,
      CategoryIds: this.catid,
      BrandId: this.brdnid,
      Text: '',
      limit: '10000',
      discounted_products: '',
      user_id: this.user_id,
      lang: this.lang

    }

    console.log('Params =>  ' + JSON.stringify(params));

    this.authService.Products(params).subscribe(
      (res: any) => {
        console.log(res);
        this.dummy = [];
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.data = res.result_products.products.data;
          this.finalData = this.data;
          // console.log(this.finalData);

          for (let i = 0; i < res.result_products.products.data.length; i++) {
            this.postData = res.result_products.products.data[i];

            // console.log('Product Name => ' + JSON.stringify(this.postData));
          }

        }
        else {
          // this.loader.loadingDismiss();
          this.toastService.presentToast(res.msg);
        }

      },
      (error: any) => {
        // this.loader.loadingDismiss();
        this.dummy = [];
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

  goToSearchPage() {
    this.nav.navigateForward("/search");
  }
  goToCartPage() {
    this.nav.navigateForward("/cart");
  }
  goToProductDetail(id) {
    this.router.navigate(["/product-details/", id]);
  }
  onIconClick(p) {

  }

  changeLayout() {
    // if (this.productView == 'list') this.productView = "grid";
    // else this.productView = "list";
  }
  SortByOrder(value) {
    this.loader.loadingPresent();
    var valsue = JSON.stringify(value);
    console.log(value);
    const params = {
      page: '',
      sortBy: value,
      MinPrice: '',
      MaxPrice: '',
      CategoryIds: this.catid,
      BrandId: '',
      Text: '',
      location_id: '',
      limit: '10000',
      user_id: this.customer_id,
      lang: this.lang

    }

    console.log('Params =>  ' + JSON.stringify(params));

    this.authService.Products(params).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_products.products.data;
          this.finalData = this.data;
          // console.log(this.finalData);

          for (let i = 0; i < res.result_products.products.data.length; i++) {
            this.postData = res.result_products.products.data[i];

            // console.log('Product Name => ' + JSON.stringify(this.postData));
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

  }

  async refresh() {
    this.ProductByCategory();
  }

  openRightMenu() {
    console.log("funnel clicked")
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(true, 'menuAdmin');
  }

  ionViewDidLeave() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');

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

    if (this.customer_id != '') {
      if (packageres.length > 0) {
        const modal = await this.modalController.create({
          component: AddtocartPopupPage,
          cssClass: 'cart-modal',
          componentProps: {
            'id': id,
            'session_id': this.rad,
            'price': finalPrice,
            'user_id': this.user_id
            // sales_person_id: this.,
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
          user_id: this.customer_id,
          sales_person_id: this.user_id,
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
    else {

    }


  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');

  }
}
