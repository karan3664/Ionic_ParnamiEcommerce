import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>([]);
  constructor(private httpService: HttpService,
    private storageService: StorageService,
    public storage: Storage,
    public router: Router,
    public nav: NavController,

  ) { }
  getUserData() {
    this.storageService.getData().then(res => {
      this.userData$.next(res);
    });
  }
  AllCategories(posdata): Observable<any> {
    return this.httpService.post('AllCategories', posdata);
  }

  AllSliders(): Observable<any> {
    return this.httpService.post('AllSliders', '');
  }

  GlobalCollecionItem(posdata): Observable<any> {
    return this.httpService.post('GlobalCollecionItem', posdata);
  }
  DiscountedProductsHome(posdata): Observable<any> {
    return this.httpService.post('DiscountedProductsHome', posdata);
  }
  Products(postdata): Observable<any> {
    return this.httpService.post('Products', postdata);
  }
  GetProductDetails(postdata): Observable<any> {
    return this.httpService.post('GetProductDetails', postdata);
  }
  AddToWishList(posdata): Observable<any> {
    return this.httpService.post('AddToWishList', posdata);
  }
  remove_product_from_wishlist(posdata): Observable<any> {
    return this.httpService.post('remove_product_from_wishlist', posdata);
  }

  MyWishList(posdata): Observable<any> {
    return this.httpService.post('MyWishList', posdata);
  }

  FrontLogin(posdata): Observable<any> {
    return this.httpService.post('FrontLogin', posdata);
  }
  FrontRegister(posdata): Observable<any> {
    return this.httpService.post('FrontRegister', posdata);
  }
  AddToCart(posdata): Observable<any> {
    return this.httpService.post('AddToCart', posdata);
  }
  MyCartItems(posdata): Observable<any> {
    return this.httpService.post('viewCart', posdata);
  }
  remove_product_from_cart(posdata): Observable<any> {
    return this.httpService.post('remove_product_from_cart', posdata);
  }
  update_cart(posdata): Observable<any> {
    return this.httpService.post('update_cart', posdata);
  }
  checkout(posdata): Observable<any> {
    return this.httpService.post('checkout', posdata);
  }
  MakeDefault(posdata): Observable<any> {
    return this.httpService.post('MakeDefault', posdata);
  }
  StateList(posdata): Observable<any> {
    return this.httpService.post('StateList', posdata);
  }
  CitiesList(posdata): Observable<any> {
    return this.httpService.post('CitiesList', posdata);
  }
  store_shipping_address(posdata): Observable<any> {
    return this.httpService.post('store_shipping_address', posdata);
  }
  changePassword(posdata): Observable<any> {
    return this.httpService.post('changePassword', posdata);
  }
  MyOrders(posdata): Observable<any> {
    return this.httpService.post('MyOrders', posdata);
  }
  viewProfile(posdata): Observable<any> {
    return this.httpService.post('viewProfile', posdata);
  }
  updateProfile(posdata): Observable<any> {
    return this.httpService.post('updateProfile', posdata);
  }
  update_shipping_address(id, posdata): Observable<any> {
    return this.httpService.post('update_shipping_address/' + id, posdata);
  }
  view_shipping_address(id): Observable<any> {
    return this.httpService.get('view_shipping_address/' + id);
  }
  HomePageSettings(posdata): Observable<any> {
    return this.httpService.post('HomePageSettings', posdata);
  }
  CheckoutCashOnDelivery(posdata): Observable<any> {
    return this.httpService.post('CheckoutCashOnDelivery', posdata);
  }
  ProductsAutoComplete(posdata): Observable<any> {
    return this.httpService.post('ProductsAutoComplete', posdata);
  }
  TurmsAndCondition(): Observable<any> {
    return this.httpService.get('TurmsAndCondition');
  }
  PrivacyPolicy(): Observable<any> {
    return this.httpService.get('PrivacyPolicy');
  }
  AboutUs(): Observable<any> {
    return this.httpService.get('AboutUs');
  }
  FAQ(): Observable<any> {
    return this.httpService.post('FAQ', '');
  }
  ForgetPassword(posdata): Observable<any> {
    return this.httpService.post('ForgetPassword', posdata);
  }
  VerifyOtp(posdata): Observable<any> {
    return this.httpService.post('VerifyOtp', posdata);
  }
  UpdatePassword(posdata): Observable<any> {
    return this.httpService.post('UpdatePassword', posdata);
  }

  ViewOrder(id, lang): Observable<any> {
    return this.httpService.get('ViewOrder/' + id + '/' + lang);
  }

  RateProduct(posdata): Observable<any> {
    return this.httpService.post('RateProduct', posdata);
  }
  ReviewProduct(posdata): Observable<any> {
    return this.httpService.post('ReviewProduct', posdata);
  }

  ApplyCoupon(posdata): Observable<any> {
    return this.httpService.post('ApplyCoupon', posdata);
  }
  RemoveCoupon(posdata): Observable<any> {
    return this.httpService.post('RemoveCoupon', posdata);
  }

  CheckForExtraDiscount(posdata): Observable<any> {
    return this.httpService.post('CheckForExtraDiscount', posdata);
  }

  cancel_order(id): Observable<any> {
    return this.httpService.get('cancel_order/' + id);
  }

  TransporterList(posdata): Observable<any> {
    return this.httpService.post('TransporterList', posdata);
  }

  delete_shipping_address(id): Observable<any> {
    return this.httpService.get('delete_shipping_address/' + id);
  }

  UpdateToken(posdata): Observable<any> {
    return this.httpService.post('UpdateToken', posdata);
  }
  StoreItemNotes(posdata): Observable<any> {
    return this.httpService.post('StoreItemNotes', posdata);
  }
  async logout() {
    this.storage.clear();

    this.userData$.next('');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
