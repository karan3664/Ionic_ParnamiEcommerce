(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"/u1B":function(t,n,e){"use strict";e.r(n),e.d(n,"MyAccountPageModule",(function(){return b}));var o=e("ofXK"),i=e("3Pt+"),s=e("TEn/"),a=e("tyNb"),r=e("fXoL"),c=e("lGQG"),d=e("5dVO"),_=e("2g2N"),g=e("n90K");const l=[{path:"",component:(()=>{class t{constructor(t,n,e,o,i,s){this.nav=t,this.authService=n,this.router=e,this.loader=o,this.toastService=i,this.storageService=s,this.photo="assets/images/user.jpg",this.postData={name:"",email:"",password:"",password_confirmation:"",phone:"",address:"",business_name:"",user_id:""},this.storageService.getData().then(t=>{t?(this.postData.user_id=t.result_FrontLogin.id,this.ViewProfile()):this.postData.user_id=""})}ngOnInit(){}ViewProfile(){this.loader.loadingPresent(),this.authService.viewProfile({user_id:this.postData.user_id}).subscribe(t=>{console.log("My shipping_addresses => "+JSON.stringify(t)),!1===t.error?(this.loader.loadingDismiss(),this.postData.name=t.result_viewProfile.name,this.postData.phone=t.result_viewProfile.phone,this.postData.address=t.result_viewProfile.address,this.postData.business_name=t.result_viewProfile.business_name,this.postData.email=t.result_viewProfile.email):(this.loader.loadingDismiss(),this.toastService.presentToast(t.msg))},t=>{this.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?this.toastService.presentToast(JSON.stringify(t.error.errors)):this.toastService.presentToast("Network Issue...")})}validateInputs(){const t=this.postData.name.trim(),n=this.postData.phone.trim(),e=this.postData.address.trim(),o=this.postData.business_name.trim();return this.postData.name&&this.postData.phone&&this.postData.address&&this.postData.business_name&&t.length>0&&n.length>0&&e.length>0&&o.length>0}UpdateProfile(){this.validateInputs()?(this.loader.loadingPresent(),this.authService.updateProfile({user_id:this.postData.user_id,name:this.postData.name,phone:this.postData.phone,address:this.postData.address,business_name:this.postData.business_name}).subscribe(t=>{console.log("My shipping_addresses => "+JSON.stringify(t)),!1===t.error?(this.loader.loadingDismiss(),this.toastService.presentToast(t.msg),this.ViewProfile()):(this.loader.loadingDismiss(),this.toastService.presentToast(t.msg))},t=>{this.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?this.toastService.presentToast(JSON.stringify(t.error.errors)):this.toastService.presentToast("Network Issue...")})):(this.loader.loadingDismiss(),this.toastService.presentToast("All fields are required..."))}goToAddress(){this.router.navigate(["manage-address"])}goToEditProfile(){this.router.navigate(["edit-profile"])}}return t.\u0275fac=function(n){return new(n||t)(r.Kb(s.bb),r.Kb(c.a),r.Kb(a.g),r.Kb(d.a),r.Kb(_.a),r.Kb(g.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-my-account"]],decls:19,vars:4,consts:[["tappable",""],["color","light"],["slot","start"],["autoHide","false","color","primary"],["color","primary"],[1,"main_content_div"],[1,"back_image"],[1,"content_div"],[1,"usernane"],[1,"location"],[1,"flex_div"],[3,"click"]],template:function(t,n){1&t&&(r.Nb(0,"ion-header",0),r.Nb(1,"ion-toolbar",1),r.Nb(2,"ion-buttons",2),r.Lb(3,"ion-menu-button",3),r.Mb(),r.Nb(4,"ion-label",4),r.oc(5," My Account "),r.Mb(),r.Mb(),r.Mb(),r.Nb(6,"ion-content"),r.Nb(7,"div",5),r.Lb(8,"div",6),r.Nb(9,"div",7),r.Nb(10,"ion-label",8),r.oc(11),r.Mb(),r.Nb(12,"ion-label",9),r.oc(13),r.Mb(),r.Nb(14,"div",10),r.Nb(15,"ion-label",11),r.Vb("click",(function(){return n.goToEditProfile()})),r.oc(16,"Edit Profile"),r.Mb(),r.Nb(17,"ion-label",11),r.Vb("click",(function(){return n.goToAddress()})),r.oc(18,"Manage Address"),r.Mb(),r.Mb(),r.Mb(),r.Mb(),r.Mb()),2&t&&(r.zb(8),r.mc("background-image","url(assets/splash.png)",r.Db),r.zb(3),r.pc(n.postData.name),r.zb(2),r.qc(" ",n.postData.email," "))},directives:[s.s,s.V,s.j,s.A,s.w,s.p],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--color:#fff}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50%;height:50%}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%]{position:absolute;right:3px;bottom:14px}.main_content_div[_ngcontent-%COMP%]{width:100%}.main_content_div[_ngcontent-%COMP%]   .back_image[_ngcontent-%COMP%]{height:300px;width:100%;background-position:50%;background-size:cover;background-repeat:no-repeat;position:relative}.main_content_div[_ngcontent-%COMP%]   .back_image[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{position:absolute;bottom:20px;right:20px;--background:#fff;color:#000;font-weight:600}.main_content_div[_ngcontent-%COMP%]   .white_div[_ngcontent-%COMP%]{height:90px;width:90px;background:#fff;border-radius:50%;margin:-45px auto auto;position:relative;border:4px solid #fff;background-position:50%;background-size:cover;background-repeat:no-repeat}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]{padding:20px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{display:block}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .usernane[_ngcontent-%COMP%]{text-align:center;font-weight:600;font-size:18px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]{margin-top:10px;text-align:center;color:grey;font-size:14px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .pin[_ngcontent-%COMP%]{color:grey}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]{margin-top:20px;display:flex;flex-direction:row;align-items:center;justify-content:space-around}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:.8rem;padding:5px;text-align:center}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%], .main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#000;border:1px solid #d3d3d3;border-radius:5px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div1[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:center;flex-direction:column;align-items:center}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div1[_ngcontent-%COMP%]   .gray_div[_ngcontent-%COMP%]{height:60px;width:60px;border-radius:5px;background:#d3d3d3;position:relative}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div1[_ngcontent-%COMP%]   .history[_ngcontent-%COMP%]{width:45px;height:45px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_div[_ngcontent-%COMP%]{display:flex;margin-top:20px;border-bottom:1px solid #d3d3d3}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-right:30px;color:grey;padding-bottom:10px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_div[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{border-bottom:1px solid red}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_detail[_ngcontent-%COMP%]{padding-top:20px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_detail[_ngcontent-%COMP%]   .sleepy[_ngcontent-%COMP%]{margin:auto;display:block}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_detail[_ngcontent-%COMP%]   .sleepy_lbl[_ngcontent-%COMP%]{display:block;text-align:center;margin-top:20px;margin-bottom:20px;color:grey;font-size:14px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .logout[_ngcontent-%COMP%]{--border-radius:5px;margin-top:20px;font-weight:600}"]}),t})()}];let p=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(n){return new(n||t)},imports:[[a.i.forChild(l)],a.i]}),t})(),b=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(n){return new(n||t)},imports:[[o.b,i.a,s.W,p]]}),t})()}}]);