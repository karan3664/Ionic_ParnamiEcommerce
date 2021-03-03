function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{k578:function(e,t,o){"use strict";o.r(t),o.d(t,"EditProfilePageModule",(function(){return m}));var n,i,s,a=o("ofXK"),r=o("3Pt+"),l=o("TEn/"),c=o("tyNb"),d=o("fXoL"),b=o("lGQG"),p=o("5dVO"),u=o("2g2N"),g=o("n90K"),f=[{path:"",component:(n=function(){function e(t,o,n,i,s,a){var r=this;_classCallCheck(this,e),this.nav=t,this.authService=o,this.loader=n,this.toastService=i,this.router=s,this.storageService=a,this.postData={name:"",email:"",password:"",password_confirmation:"",phone:"",address:"",business_name:"",user_id:""},this.storageService.getData().then((function(e){e?(r.postData.user_id=e.result_FrontLogin.id,r.ViewProfile()):r.postData.user_id=""}))}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ViewProfile",value:function(){var e=this;this.loader.loadingPresent(),this.authService.viewProfile({user_id:this.postData.user_id}).subscribe((function(t){console.log("My shipping_addresses => "+JSON.stringify(t)),!1===t.error?(e.loader.loadingDismiss(),e.postData.name=t.result_viewProfile.name,e.postData.phone=t.result_viewProfile.phone,e.postData.address=t.result_viewProfile.address,e.postData.business_name=t.result_viewProfile.business_name,e.postData.email=t.result_viewProfile.email):(e.loader.loadingDismiss(),e.toastService.presentToast(t.msg))}),(function(t){e.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?e.toastService.presentToast(JSON.stringify(t.error.errors)):e.toastService.presentToast("Network Issue...")}))}},{key:"validateInputs",value:function(){var e=this.postData.name.trim();return this.postData.name&&e.length>0}},{key:"UpdateProfile",value:function(){var e=this;this.validateInputs()?(this.loader.loadingPresent(),this.authService.updateProfile({user_id:this.postData.user_id,name:this.postData.name,phone:this.postData.phone,address:this.postData.address,business_name:this.postData.business_name}).subscribe((function(t){console.log("My shipping_addresses => "+JSON.stringify(t)),!1===t.error?(e.loader.loadingDismiss(),e.toastService.presentToast(t.msg),e.ViewProfile()):(e.loader.loadingDismiss(),e.toastService.presentToast(t.msg))}),(function(t){e.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?e.toastService.presentToast(JSON.stringify(t.error.errors)):e.toastService.presentToast("Network Issue...")}))):(this.loader.loadingDismiss(),this.toastService.presentToast("All fields are required..."))}}]),e}(),n.\u0275fac=function(e){return new(e||n)(d.Kb(l.bb),d.Kb(b.a),d.Kb(p.a),d.Kb(u.a),d.Kb(c.g),d.Kb(g.a))},n.\u0275cmp=d.Eb({type:n,selectors:[["app-edit-profile"]],decls:35,vars:4,consts:[["tappable",""],["color","light"],["slot","start","color","primary"],["fill","clear","routerLink","/my-account","routerDirection","backward"],["slot","icon-only","src","assets/custom-icon-tc-shop/back.svg"],["color","primary"],[2,"margin","10px"],["position","stacked","color","dark"],["color","danger"],["type","text","autocomplete","off","placeholder","Name","name","name","color","dark","clearInput","",3,"ngModel","ngModelChange"],["type","tel","autocomplete","off","maxlength","10","placeholder","Phone","name","phone","color","dark","clearInput","",3,"ngModel","ngModelChange"],["type","text","autocomplete","off","placeholder","Address","name","address","color","dark","clearInput","",3,"ngModel","ngModelChange"],["type","text","autocomplete","off","placeholder","Business Name","name","business_name","color","dark","clearInput","",3,"ngModel","ngModelChange"],[3,"click"]],template:function(e,t){1&e&&(d.Nb(0,"ion-header",0),d.Nb(1,"ion-toolbar",1),d.Nb(2,"ion-buttons",2),d.Nb(3,"ion-button",3),d.Lb(4,"ion-icon",4),d.Mb(),d.Mb(),d.Nb(5,"ion-title",5),d.oc(6,"Edit Profile"),d.Mb(),d.Mb(),d.Mb(),d.Nb(7,"ion-content"),d.Nb(8,"ion-item",6),d.Nb(9,"ion-label",7),d.oc(10,"Name "),d.Nb(11,"ion-text",8),d.oc(12,"* "),d.Mb(),d.Mb(),d.Nb(13,"ion-input",9),d.Vb("ngModelChange",(function(e){return t.postData.name=e})),d.Mb(),d.Mb(),d.Nb(14,"ion-item",6),d.Nb(15,"ion-label",7),d.oc(16,"Phone "),d.Nb(17,"ion-text",8),d.oc(18,"* "),d.Mb(),d.Mb(),d.Nb(19,"ion-input",10),d.Vb("ngModelChange",(function(e){return t.postData.phone=e})),d.Mb(),d.Mb(),d.Nb(20,"ion-item",6),d.Nb(21,"ion-label",7),d.oc(22,"Address "),d.Nb(23,"ion-text",8),d.oc(24,"* "),d.Mb(),d.Mb(),d.Nb(25,"ion-input",11),d.Vb("ngModelChange",(function(e){return t.postData.address=e})),d.Mb(),d.Mb(),d.Nb(26,"ion-item",6),d.Nb(27,"ion-label",7),d.oc(28,"Business Name "),d.Nb(29,"ion-text",8),d.oc(30,"* "),d.Mb(),d.Mb(),d.Nb(31,"ion-input",12),d.Vb("ngModelChange",(function(e){return t.postData.business_name=e})),d.Mb(),d.Mb(),d.Mb(),d.Nb(32,"ion-footer"),d.Nb(33,"ion-button",13),d.Vb("click",(function(){return t.UpdateProfile()})),d.oc(34,"Update"),d.Mb(),d.Mb()),2&e&&(d.zb(13),d.cc("ngModel",t.postData.name),d.zb(6),d.cc("ngModel",t.postData.phone),d.zb(6),d.cc("ngModel",t.postData.address),d.zb(6),d.cc("ngModel",t.postData.business_name))},directives:[l.s,l.V,l.j,l.i,l.gb,c.h,l.t,l.U,l.p,l.v,l.w,l.R,l.u,l.ib,r.d,r.g,r.b,l.q],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--color:#fff}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50%;height:50%}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%]{position:absolute;right:3px;bottom:14px}ion-input[_ngcontent-%COMP%]{border:1px solid var(--ion-color-primary);margin:10px 0;padding:0;font-size:18px!important;font-family:roboto-medium!important;color:#000;border-radius:2px}ion-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--color:#fff;margin:0;width:100%;--border-radius:0}"]}),n)}],h=((s=function e(){_classCallCheck(this,e)}).\u0275mod=d.Ib({type:s}),s.\u0275inj=d.Hb({factory:function(e){return new(e||s)},imports:[[c.i.forChild(f)],c.i]}),s),m=((i=function e(){_classCallCheck(this,e)}).\u0275mod=d.Ib({type:i}),i.\u0275inj=d.Hb({factory:function(e){return new(e||i)},imports:[[a.b,r.a,l.W,h]]}),i)}}]);