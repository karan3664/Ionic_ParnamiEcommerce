import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
import { Storage } from '@ionic/storage';

// const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage,
    public userDataService: UserDataService) { }

  setData(data) {
    // set a key/value
    this.storage.set('userData', data);
    setTimeout(() => {
      this.userDataService.getuser();
    }, 1000);
  }

  getData() {
    // Or to get a key/value pair
    return this.storage.get('userData').then((val) => {
      console.log('Storage data => ', val);
      return val;
    });



  }

  setRandomNumber(data) {
    this.storage.set('Random', data);
  }
  getRandomNumber() {
    return this.storage.get('Random').then((res) => {
      console.log('Random Number => ', res);
      return res;
    });
  }

  setCartCount(data) {
    this.storage.set('CartCount', data);
  }
  getCartCount() {
    return this.storage.get('CartCount').then((res) => {
      // console.log('CartCount  => ', res);
      return res;
    });
  }
  removeCartCount() {
    this.storage.remove('CartCount');
  }

  logout() {
    this.storage.remove('');
  }

  saveToken(token) {
    return this.storage.set('device_token', token);
  }
  getToken() {
    return this.storage.get('device_token');
  }
  // Store the value
  // async store(storageKey: string, value: any) {
  //   const encryptedValue = btoa(escape(JSON.stringify(value)));
  //   await Storage.set({
  //   key: storageKey,
  //   value: encryptedValue
  //   });
  //   }

  // // Get the value
  // async get(storageKey: string) {
  // const ret = await Storage.get({ key: storageKey });
  // return JSON.parse(unescape(atob(ret.value)));
  // }

  // async removeStorageItem(storageKey: string) {
  // await Storage.remove({ key: storageKey });
  // }

  // // Clear storage
  // async clear() {
  // await Storage.clear();
  // }
}
