import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user_id: any;
  data: any;
  constructor(public storage: Storage) { }

  getuser() {
    this.storage.get('userData').then(data => {
      this.user_id = data.id;
      console.log(JSON.stringify(data.result_FrontLogin));
    });



  }
}
