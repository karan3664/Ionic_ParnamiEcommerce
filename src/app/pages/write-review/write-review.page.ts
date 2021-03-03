import { Component, OnInit, Input } from '@angular/core';
import { MenuController, ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
})
export class WriteReviewPage implements OnInit {

  @Input() id: string;
  @Input() session_id: string;
  @Input() price: string;
  @Input() user_id: string;
  star: number;
  rate: any;
  formData = { nick_name: '', review_title: '', your_review: '' };
  constructor(
    public menuCtrl: MenuController,
    public mdCtrl: ModalController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    public navParams: NavParams
  ) {
    this.id = this.navParams.data.id;
    this.session_id = this.navParams.data.session_id;
    this.price = this.navParams.data.price;
    this.user_id = this.navParams.data.user_id;
  }
  ngOnInit() {
  }

  async closeModal() {
    await this.mdCtrl.dismiss();
  }
  goToproductDetail() {
    this.nav.navigateForward("product-details/");
  }

  onModelChange(rating) {
    console.log("changed rating: ", rating);
    this.star = rating;


    // do your stuff
  }
  PostReview() {
    const data = {
      star: this.star,
      product_id: this.id,
      user_id: this.user_id,
      review_title: this.formData.review_title,
      your_review: this.formData.your_review,
      nick_name: this.formData.nick_name
    }

    console.log('Review=> ' + JSON.stringify(data));

    this.loader.loadingPresent();

    this.authService.ReviewProduct(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.toastService.presentToast(res.msg);
          this.loader.loadingDismiss();
          // this.storageService.setCartCount(res.total_items);
          this.mdCtrl.dismiss();
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
