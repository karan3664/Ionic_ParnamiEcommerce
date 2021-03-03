import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  alldata: any;
  isItemAvailable: boolean = false;
  data: any[];
  user_id: any;
  price: any = '';
  lang: any;
  constructor(private authService: AuthService,
    public storageService: StorageService,
    private route: Router,
    private router: ActivatedRoute,
    public menuCtrl: MenuController,

    private loader: LoaderService,
    private toastService: ToastService) {
    this.price = this.router.snapshot.params['price'];
    this.lang = localStorage.getItem('lang');
    this.storageService.getData().then((val) => {
      if (val) {
        this.user_id = val.result_FrontLogin.id;
        this.getMyOrder();
      }
      else {
        this.user_id = '';
        // this.storageService.setRandomNumber(this.randomNumber);

      }

    });

  }

  ngOnInit() {
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getMyOrder();
    setTimeout(() => {
      // 
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getMyOrder() {
    this.loader.loadingPresent();
    const data = {
      user_id: this.user_id,
      lang: this.lang
    }
    console.log(JSON.stringify(data));
    this.authService.MyOrders(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();

          this.data = res.result_MyOrders;

          this.alldata = res.result_MyOrders;

        }
        else {
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
  ViewInvoice(id) {
    console.log('Karan=>' + id);
    localStorage.setItem('myorderid', id);
    this.route.navigate(['/view-invoice']);
  }
  getProduct(data) {
    // console.log(data);

    return data.product_name;
  }

  getQty(data) {
    return data.qty;
  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'menuAdmin');

  }
}
