import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {


  data: any;
  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
  ) {
    this.TermsAndCondition();
  }

  ngOnInit() {
  }

  TermsAndCondition() {
    this.loader.loadingPresent();

    this.authService.TurmsAndCondition().subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.loader.loadingDismiss();

          this.data = res.result_TurmsAndCondition.desc;
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
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }

}
