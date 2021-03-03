import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { interval } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AddtocartPopupPage } from '../addtocart-popup/addtocart-popup.page';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  dummy = Array(20);
  data: any[];
  FruitList: any;
  FruitList_temp: any;
  UnitList: any[];
  UnitList_temp: any;
  DataStatus: any;
  showFruitList: any;
  showUnitList: any;

  SelectedQty: any;
  SelectedFruit: any;
  total_cart = '';
  randomNumber: Number;
  rad: Number;
  user_id: any;
  constructor(private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    public router: Router,
    public modalController: ModalController,
    public nav: NavController,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute) {
    this.ProductSelect();
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
      }
      else {

        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });
    // this.total_price = (this.price * this.qty);
  }

  ngOnInit() {
  }

  ProductSelect() {

    // this.loader.loadingPresent();

    const data = {
      search: ''
    }
    this.authService.ProductsAutoComplete(data).subscribe(
      (res: any) => {
        this.dummy = [];
        console.log(JSON.stringify(res));
        if (res.error === false) {

          // this.loader.loadingDismiss();
          this.FruitList = res.result_ProductsAutoComplete;
          this.FruitList_temp = res.result_ProductsAutoComplete;
          // this.toast.presentToast(res.msg);
        } else {
          // this.loader.loadingDismiss();
          this.dummy = [];
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
  }

  getItems(ev: any) {
    console.log(JSON.stringify(ev));
    // Reset items back to all of the items
    this.FruitList = this.FruitList_temp;
    this.data = [];
    const val = ev;
    console.log("Value " + val);

    if (val == undefined || val === null || val.trim() == '') {
      this.FruitList = this.FruitList_temp;
    } else if (val && val.trim() != '') {
      this.data = this.FruitList_temp.filter((item) => {
        return (item.product_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      console.log("Size" + this.FruitList_temp.length);
      if (this.data.length == 0) {
        this.DataStatus = 1;
      } else {
        this.DataStatus = 0;
      }
    }
  }


  checkFocus(flag: any) {
    if (flag == 'icon') {
      this.showFruitList = !this.showFruitList;
      this.showUnitList = false;

    } else {
      this.showFruitList = true;
      this.showUnitList = false;

    }

  }
  checkFocus2(flag: any) {
    if (flag == 'icon') {
      this.showUnitList = !this.showUnitList;
      this.showFruitList = false;
    } else {
      this.showUnitList = true;
      this.showFruitList = false;
    }
  }

  setdata(data) {
    console.log(data)
    this.UnitList = [];
    this.SelectedFruit = data.product_name;

    // this.product_id = data.product_id;
    // this.purchase_order_items_id = data.purchase_order_items_id;

    // this.unit_name = data.unit_name;
    // this.code = data.code;
    // this.price = data.price;

    // this.unit_id = data.unit_id;
    // this.variation_value_id = data.variation_value_id;
    // this.variation_id = data.variation_id;
    // this.to_user_id = data.to_user_id;
    // this.dc_id = data.dc_id;

    this.UnitList.push(data);

    this.showFruitList = false;
    this.showUnitList = false;
  }

  setdata2(data) {
    this.UnitList = [];
    console.log(data)


    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  goToCartPage() {
    this.nav.navigateForward("cart");
  }
  goToProductDetail(id) {
    this.router.navigate(["product-details/", id]);
  }

  

  async goToCart(id, price, packageres) {
    console.log(packageres.length);


    if (packageres.length > 0) {
      const modal = await this.modalController.create({
        component: AddtocartPopupPage,
        componentProps: {
          'id': id,
          'session_id': this.rad,
          'price': price,
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
        price: price,
        user_id: this.user_id,
        package_id: '',
        package_res: ''

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
}
