import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemCount = new BehaviorSubject(0);
  constructor() { }

  getCartItemCount() {
    return this.cartItemCount;
  }
}
