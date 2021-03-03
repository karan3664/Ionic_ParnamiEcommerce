import { Component, OnInit, NgZone, ViewChildren, QueryList } from '@angular/core';

import { Platform, ModalController, NavController, MenuController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastService } from './services/toast.service';
import { LoginPage } from './pages/login/login.page';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { ProductsPageModule } from './pages/products/products.module';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { TranslateConfigService } from './services/translate-config.service';
import { FCM } from '@ionic-native/fcm/ngx';
// import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userData$ = new BehaviorSubject<any>([]);
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;


  public selectedIndex = 0;
  public counter = 0;
  catId: any = [];
  pricemin: any;
  pricemax: any;
  sortby: any;
  catid: any;
  brdnid: any;
  cat_id = '';
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home-outline',
      status: true
    },
    {
      title: 'My Wish List',
      url: '/wish-list',
      icon: 'heart-outline',
      status: true
    },
    {
      title: 'My Account',
      url: '/my-account',
      icon: 'person-add-outline',
      status: true
    },
    {
      title: 'My Order',
      url: '/my-order/:price',
      icon: 'file-tray-full-outline',
      status: true
    },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'key-outline',
      status: true
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: 'cog-outline',
      status: true
    },
    {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      icon: 'settings-outline',
      status: true
    },
    {
      title: 'F A Q',
      url: '/faq',
      icon: 'chatbubbles-outline',
      status: true
    },
    {
      title: 'Terms & Conditions',
      url: '/terms-and-conditions',
      icon: 'newspaper-outline',
      status: true

    }
  ];
  showBtnLogin = true;
  currentUser: any;
  public authUser: any;
  Name = "";

  Categories: any;
  Brand: any;
  // public itemsHome: any = [];//home list
  public itemsCategory: any = [];//category list
  visibleCategory = false;//for category expand

  public itemsBrand: any = [];//category list
  visibleBrand = false;//for category expand

  price_filter: any;

  BrandId: any = [];

  public itemsPrice: any = [];//category list
  visiblePrice = false;//for category expand
  selected = false;
  selectedLanguage: any;
  // lang: any;
  lang = [{ name: 'English', id: 'en' }, { name: 'Hindi', id: 'hi' }, { name: 'Gujarati', id: 'gu' }]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastService: ToastService,
    private modalController: ModalController,
    public ngZone: NgZone,
    private authService: AuthService,
    public storageService: StorageService,
    public navCtrl: NavController,
    private router: Router,
    public storage: Storage,
    public menuCtrl: MenuController,
    private translateConfigService: TranslateConfigService,
    private fcm: FCM,



    // private appRate: AppRate
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('lang');

    this.initializeApp();

    setTimeout(() => {
      this.checkLogin();
    }, 2000);
    this.price_filter =
      [
        {
          id: '0',
          min: "0",
          max: "99",
          select: false
        },

        {
          id: '1',
          min: "100",
          max: "199",
          select: false
        },
        {
          id: '2',
          min: "200",
          max: "299",
          select: false
        },
        {
          id: '3',
          min: "300",
          max: "399",
          select: false
        },
        {
          id: '4',
          min: "400",
          max: "499",
          select: false
        },
        {
          id: '5',
          min: "500",
          max: "599",
          select: false
        },
      ];
    this.itemsCategory = [
      { expandedHelp: false },
    ];
    this.itemsBrand = [
      { expandedHelp: false },
    ];
    this.itemsPrice = [
      { expandedHelp: false },
    ];
    this.getCategories();
    this.ProductByCategory();

    var priceCheck = localStorage.getItem('priceCheck');
    console.log(priceCheck);

    // for (let v = 0; v < this.price_filter.length; v++) {
    //   if (this.price_filter[v].id == priceCheck) {
    //     this.selected = true
    //   } else {
    //     this.selected = false
    //   }
    // }


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('d9692e');
      this.fcm.getToken().then(token => {
        console.log(token);
        // this.device_token = token;
        localStorage.setItem('DeviceToken', token);

        this.storageService.saveToken(token).then(item => {

          console.log("TOKEN => " + " " + item);

        });
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });
      this.platform.backButton.subscribe(() => {
        document.addEventListener("backbutton", () => {
          this.routerOutlets.forEach((outlet: IonRouterOutlet) => {


            if (outlet && outlet.canGoBack()) {
              outlet.pop();
            } else if (this.router.url === "/home") {
              navigator['app'].exitApp(); // work for ionic 4
            } else if (!outlet.canGoBack()) {
              navigator['app'].exitApp(); // work for ionic 4
            }
            else {
              window.history.back();
            }
          });
        });

      });
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  languageChanged(item) {
    console.log(JSON.stringify(item));
    localStorage.setItem('lang', item);

    this.translateConfigService.setLanguage(this.selectedLanguage);
    window.location.reload();

  }
  async Login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: {
        'home': 'home',
        // 'dc_id': '',
        // 'to_user_id': ''
      }
    });
    modal.onDidDismiss()
      .then((data) => {

        const user = data['data']; // Here's your selected user!
        // console.log("Token =>" + user);
        // this.toke = user;
        window.location.reload();
        // this.navCtrl.navigateRoot('home');
      });
    return await modal.present();
  }
  // appRating() {
  //   this.platform.ready().then(() => {

  //     // set certain preferences
  //     this.appRate.preferences.storeAppURL = {
  //       ios: '<app_id>',
  //       android: 'market://details?id=<package_name>',
  //       windows: 'ms-windows-store://review/?ProductId=<store_id>'
  //     }

  //     this.appRate.promptForRating(true);
  //   })
  // }

  checkLogin() {
    this.ngZone.run(() => {
      this.storageService.getData().then(val => {
        this.authUser = val;


        // console.log(val);
        if (!val) {
          // console.log(res);
          this.Name = "Guest"
          this.showBtnLogin = false;
          for (let i = 0; i < this.appPages.length; i++) {
            if (this.appPages[i].title === 'My Wish List') {
              this.appPages[i].status = false;
            }
            if (this.appPages[i].title === 'Change Password') {
              this.appPages[i].status = false;
            }
            if (this.appPages[i].title === 'My Order') {
              this.appPages[i].status = false;
            }
            if (this.appPages[i].title === 'My Account') {
              this.appPages[i].status = false;
            }
          }
        } else {
          this.Name = val.result_FrontLogin.name;
          this.showBtnLogin = true;
          for (let i = 0; i < this.appPages.length; i++) {
            if (this.appPages[i].title === 'My Wish List') {
              this.appPages[i].status = true;
            }
            if (this.appPages[i].title === 'Change Password') {
              this.appPages[i].status = true;
            }
            if (this.appPages[i].title === 'My Order') {
              this.appPages[i].status = true;
            }
            if (this.appPages[i].title === 'My Account') {
              this.appPages[i].status = true;
            }
          }
          // this.userService.user_id = val.id;

        }
      })
    });


  }
  ionViewWillEnter() {
    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');
  }
  logout() {

    console.log('LOGOUT');

    this.storage.clear();

    this.userData$.next('');
    localStorage.clear();

    // this.router.navigate(['']);
    // this.authService.logout();
    this.Name = "Guest"
    for (let i = 0; i < this.appPages.length; i++) {
      if (this.appPages[i].title === 'My Wish List') {
        this.appPages[i].status = false;
      }
      if (this.appPages[i].title === 'Change Password') {
        this.appPages[i].status = false;
      }
      if (this.appPages[i].title === 'My Order') {
        this.appPages[i].status = false;
      }
      if (this.appPages[i].title === 'My Account') {
        this.appPages[i].status = false;
      }
    }
    this.showBtnLogin = false;
    // window.location.reload();
  }


  //for category expandable
  expandItemCategory(item): void {
    console.log(item)
    this.visibleCategory = !this.visibleCategory;
    if (item.expandedHelp) {
      item.expandedHelp = false;
    } else {
      this.itemsCategory.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  //for Brand expandable
  expandItemBrand(item): void {
    console.log(item)
    this.visibleBrand = !this.visibleBrand;
    if (item.expandedHelp) {
      item.expandedHelp = false;
    } else {
      this.itemsBrand.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  //for Price expandable
  expandItemPrice(item): void {
    console.log("expandItemPrice =>" + JSON.stringify(item));
    this.visiblePrice = !this.visiblePrice;
    if (item.expandedHelp) {
      item.expandedHelp = false;
      console.log('KARAN 1');

    } else {
      this.itemsPrice.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
          console.log('KARAN 2');


        } else {
          listItem.expanded = false;
          console.log('KARAN 3');

        }
        return listItem;
      });
    }
  }



  checkEvent(item, name_en) {

    this.catId.push(item);

    console.log(this.catId.toString());
    localStorage.setItem('cattoken', this.catId.toString());

    this.router.navigate(['all-products']).then(e => {
      this.router.navigate(['products'])
    })

  }



  getCategories() {
    // this.loader.loadingPresent();
    const data = {
      lang: localStorage.getItem('lang')
    }
    this.authService.AllCategories(data).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Categories = res.result_AllCategories;

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


  ProductByCategory() {

    const params = {
      page: '',
      sortBy: '',
      MinPrice: '',
      MaxPrice: '',
      CategoryIds: '',
      BrandId: '',
      Text: '',
      location_id: ''
    }
    this.authService.Products(JSON.stringify(params)).subscribe(
      (res: any) => {
        // console.log('Brands => ' + JSON.stringify(res));
        if (res.error === false) {
          this.Brand = res.result_products.brands;



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


  checkEventBrand(item, name_en) {

    this.BrandId.push(item);

    console.log(item + name_en);
    localStorage.setItem('BrandId', this.BrandId.toString());

    this.router.navigate(['all-products']).then(e => {
      this.router.navigate(['products'])
    })



  }

  checkEventPrice(min, max, id) {

    localStorage.setItem('price_min', min);
    localStorage.setItem('price_max', max);

    // this.navCtrl.navigateForward(['products']);
    // this.router.navigate(['products']);

    this.router.navigate(['all-products']).then(e => {
      this.router.navigate(['products'])
    })
    //   this.router.navigateByUrl('/products', {skipLocationChange: true}).then(()=>{
    //     this.router.navigate(['products']);
    // });


  }

  ionViewDidLeave() {
    // this.menuCtrl.enable(false, 'menu1');
    // this.menuCtrl.enable(true, 'menuAdmin');

    // this.menuCtrl.enable(true, 'menu1');
    // this.menuCtrl.enable(false, 'menuAdmin');

  }

  Reset() {

    // localStorage.clear();
    window.location.reload();
    localStorage.removeItem('cattoken');
    localStorage.removeItem('price_min');
    localStorage.removeItem('price_max');
    localStorage.removeItem('BrandId');
  }
}
