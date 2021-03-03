import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.page.html',
  styleUrls: ['./view-invoice.page.scss'],
})
export class ViewInvoicePage implements OnInit {
  user_id: '';
  lang: any;
  Data: any;
  DATA: any;
  CartItems: any;
  orderid = "";
  OrderID = "";
  PaymentType = "";
  DeliveryStatus = "";
  name = "";
  mobile = "";
  email = "";
  pincode = "";
  address = "";
  city = "";
  state = "";
  lang_mark = "";
  total_qty = "";
  created_at: any;
  payment_status = "";
  total_price = "";
  shipping_charge = "";
  Total = 0;
  package_id: null
  showData = false;
  discount_price = 0;
  extra_discount_price = 0;
  sowsD = false;
  DiscountValue = 0;
  ExtraDiscountValue = 0;
  EDV = 0;
  V1 = 0;
  V2 = 0;
  V3 = 0;
  V4 = 0;
  V5 = 0;
  V6 = 0;
  V7 = 0;
  extra_discount_type: any;
  SubTotalPrice = 0;
  ShippingCharge = 0;
  // Total = 0;
  order_status: any;
  Transporter: any;
  DeliveryOption: any;
  transporter_id: any;
  business_name: any;
  sales_person_name: any;

  Freight: any;
  notes: any;
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    public alertController: AlertController,
    public nav: NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private toastService: ToastService,
    private storageService: StorageService) {
    this.lang = localStorage.getItem('lang');
    this.orderid = localStorage.getItem('myorderid');

    this.ViewOrder();



  }

  ngOnInit() {
  }






  ViewOrder() {




    this.loader.loadingPresent();

    this.authService.ViewOrder(this.orderid, this.lang).subscribe(
      (res: any) => {
        console.log("Invoice==>" + JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();

          this.Data = res.result_ViewOrder.sales_detail;
          this.CartItems = res.result_ViewOrder;
          this.OrderID = res.result_ViewOrder.sales_header.id;
          this.sales_person_name = res.result_ViewOrder.sales_header.sales_person_name;

          this.business_name = res.result_ViewOrder.sales_header.business_name;
          this.PaymentType = res.result_ViewOrder.sales_header.payment_type;
          this.DeliveryStatus = res.result_ViewOrder.sales_header.delivety_status;
          this.total_qty = res.result_ViewOrder.sales_header.total_qty;
          this.SubTotalPrice = res.result_ViewOrder.sales_header.sub_total;
          this.DiscountValue = res.result_ViewOrder.sales_header.discount_price;
          this.EDV = res.result_ViewOrder.sales_header.extra_discount_price;
          this.notes = res.result_ViewOrder.sales_header.notes;
          // this.ShippingCharge = res.result_ViewOrder.sales_header.shipping_charge;
          this.name = res.result_ViewOrder.shipping_info.name;
          this.mobile = res.result_ViewOrder.shipping_info.mobile;
          this.email = res.result_ViewOrder.shipping_info.email;
          this.address = res.result_ViewOrder.shipping_info[0].address;
          this.lang_mark = res.result_ViewOrder.shipping_info[0].lang_mark;
          this.city = res.result_ViewOrder.shipping_info[0].city_name;
          this.state = res.result_ViewOrder.shipping_info[0].state_name;
          this.pincode = res.result_ViewOrder.shipping_info[0].pincode;

          this.payment_status = res.result_ViewOrder.sales_header.payment_status;
          this.created_at = res.result_ViewOrder.sales_header.created_at;
          this.order_status = res.result_ViewOrder.sales_header.order_status;
          this.Transporter = res.result_ViewOrder.sales_header.transporter_name;
          this.DeliveryOption = res.result_ViewOrder.sales_header.delivery_option;
          this.Freight = res.result_ViewOrder.sales_header.freight;

          this.transporter_id = res.result_ViewOrder.sales_header.transporter;

          // this.ExtraDiscountValue = res.result_ViewOrder.sales_header.extra_discount;
          // this.DiscountValue = res.result_ViewOrder.sales_header.discount_price;
          // this.extra_discount_type = res.rresult_ViewOrder.sales_header.extra_discount_type;
          // for (let i = 0; i < res.result_ViewOrder.sales_header.length; i++) {
          // this.SubTotalPrice += Number(res.result_ViewOrder.sales_header[i].total_price);
          // this.price = this.Data[i].product_packages[i].price;
          // }

          this.V1 = this.SubTotalPrice;
          this.V2 = this.ShippingCharge;



          this.V4 = this.DiscountValue;

          // if (this.V4 == null) {
          //   res.result_ViewOrder.sales_header.discount_price.sowsD = false;
          // }
          // else {
          //   res.result_ViewOrder.sales_header.discount_price.sowsD = true;

          // }

          this.V3 = (Number(this.V1) - Number(this.V4));
          console.log("V3 => " + this.V3);
          console.log("V4 => " + this.V4);

          this.V5 = (Number(this.V3) + Number(this.V2));
          this.Total = this.V5;
          console.log("V5 => " + this.V3);
          console.log(this.Total + "Fianl Amount");

          // this.EDV = res.result_checkout.cart_items.header.extra_discount_price;

          this.V7 = (Number(this.V5) - Number(this.EDV));
          this.Total = this.V7;
          console.log(this.Total + "Fianl New Amount");
          for (let i = 0; i < this.Data.length; i++) {
            // this.product_packages = res.result_checkout.cart_detail[i].package_id;

            // this.pack = res.result_checkout.cart_detail[i];
            this.package_id = this.Data[i].data.package_id;
            console.log(this.package_id);

            const dd = JSON.stringify(this.Data[i].data);
            this.DATA = this.Data[i].data;
            console.log(JSON.stringify(this.DATA));

            if (this.package_id == null) {
              res.result_ViewOrder.sales_detail[i].showData = false;
            }
            else {
              res.result_ViewOrder.sales_detail[i].showData = true;

            }

            // this.pack_data = this.pack;
            // this.newpack = JSON.parse(this.pack_data.package_res);




            // console.log('Pacakge Res => ' + res.result_viewCart.cart_items.header_item[i].package_res);



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

  CancelOrder() {
    // this.loader.loadingPresent();


    const swalWithBootstrapButtons = Swal.mixin({
      // customClass: {
      //   confirmButton: 'btn btn-success',
      //   cancelButton: 'btn btn-danger'
      // },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Are you sure?',
      text: "to cancel this order",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.loader.loadingPresent();
        this.authService.cancel_order(this.orderid).subscribe(
          (res: any) => {
            console.log("Cancel Order =>" + JSON.stringify(res));

            if (res.error === false) {
              this.loader.loadingDismiss();
              Swal.fire(
                'Your Order has been Canceled'

              )

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


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swalWithBootstrapButtons.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })



    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'to cancel this order',
    //   icon: 'question',
    //   confirmButtonText: 'Yes',
    //   backdrop: false,
    //   background: 'white',
    //   showCancelButton: true,
    //   showConfirmButton: true,
    //   cancelButtonText: 'cancel'
    // }).then(data => {
    //   console.log(data);

    // });


  }

  getpackagename(data) {
    // console.log("data "+JSON.stringify(data.package_res));
    return JSON.parse(data.package_res).package_name;
  }
  getpackageqty(data) {
    return JSON.parse(data.package_res).qty;
  }
  getpackageprice(data) {
    return JSON.parse(data.package_res).price;
  }

  getunit_name(data) {
    return JSON.parse(data.package_res).unit_name;
  }

  getpackageoriginal_unit_price(data) {
    return JSON.parse(data.package_res).original_unit_price;
  }

  getoriginal_unit_discounted_price(data) {
    return JSON.parse(data.package_res).original_unit_discounted_price;

  }
}
