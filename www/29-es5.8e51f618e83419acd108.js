function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{mDHw:function(e,t,r){"use strict";r.r(t),r.d(t,"PaymentPageModule",(function(){return v}));var o,n,i,s=r("ofXK"),a=r("3Pt+"),c=r("TEn/"),l=r("tyNb"),d=r("PSD3"),u=r.n(d),p=r("fXoL"),f=r("lGQG"),b=r("5dVO"),g=r("2g2N"),h=r("n90K"),m=[{path:"",component:(o=function(){function e(t,r,o,n,i,s){var a=this;_classCallCheck(this,e),this.alertController=t,this.nav=r,this.authService=o,this.loaderservice=n,this.toastService=i,this.storageService=s,this.transported_id=localStorage.getItem("transported_id"),this.delivery_option=localStorage.getItem("delivery_option"),this.freight=localStorage.getItem("freight"),this.currency=localStorage.getItem("grandTotal"),this.notes=localStorage.getItem("notes"),this.storageService.getData().then((function(e){a.user_id=e?e.result_FrontLogin.id:""}))}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"openRazorpay",value:function(){var e=this;RazorpayCheckout.open({description:"Credits towards Parnami",image:"http://parnamib2b.com/public/home_page_images/4e7b67faf1c12a7f1e171e8d60404385.png",currency:"INR",key:"rzp_live_oUl09l5hlzy0Cq",amount:this.currency+"00",name:"Parnami",prefill:{email:"",contact:"",name:""},theme:{color:"#F77734"},modal:{ondismiss:function(){alert("dismissed")}}},(function(t){e.loaderservice.loadingPresent();var r={payment_type:"online",user_id:e.user_id,payment_response:t,transporter:"undefined"==e.transported_id?"":e.transported_id,delivery_option:"undefined"==e.delivery_option?"":e.delivery_option,freight:"undefined"==e.freight?"":e.freight,notes:e.notes};console.log(JSON.stringify(r)),e.authService.CheckoutCashOnDelivery(r).subscribe((function(t){e.loaderservice.loadingDismiss(),!1===t.error?(e.storageService.removeCartCount(),e.nav.navigateForward("my-order/:price"),u.a.fire({title:"Success",text:"Your Order is created succesfully",icon:"success",backdrop:!1})):e.toastService.presentToast(t.msg)}),(function(t){e.loaderservice.loadingDismiss(),null!=JSON.stringify(t.error.errors)?e.toastService.presentToast(JSON.stringify(t.error.errors)):e.toastService.presentToast("Network Issue...")}))}),(function(e){alert(e.description+" (Error "+e.code+")")}))}},{key:"payWithCredit",value:function(){}},{key:"placeOrder",value:function(){var e=this;console.log("place order"),u.a.fire({title:"Are you sure?",text:"",icon:"question",showCancelButton:!0,backdrop:!1,background:"white",confirmButtonText:"Yes",cancelButtonText:"cancel"}).then((function(t){if(console.log(t),t&&t.value){console.log("go to procesed");var r={payment_type:"cash_on_delivery",user_id:e.user_id,payment_response:"",transporter:"undefined"==e.transported_id?"":e.transported_id,delivery_option:"undefined"==e.delivery_option?"":e.delivery_option,freight:"undefined"==e.freight?"":e.freight,notes:"undefined"==e.notes?"":e.notes};console.log("COD = > "+JSON.stringify(r)),e.loaderservice.loadingPresent("Creating Order"),e.authService.CheckoutCashOnDelivery(r).subscribe((function(t){!1===t.error?(e.loaderservice.loadingDismiss(),e.storageService.removeCartCount(),e.nav.navigateForward("my-order/:price"),u.a.fire({title:"Success",text:"Your Order is created succesfully",icon:"success",backdrop:!1})):(e.loaderservice.loadingDismiss(),e.toastService.presentToast(t.msg))}),(function(t){e.loaderservice.loadingDismiss(),null!=JSON.stringify(t.error.errors)?e.toastService.presentToast(JSON.stringify(t.error.errors)):e.toastService.presentToast("Network Issue...")}))}}))}}]),e}(),o.\u0275fac=function(e){return new(e||o)(p.Kb(c.b),p.Kb(c.bb),p.Kb(f.a),p.Kb(b.a),p.Kb(g.a),p.Kb(h.a))},o.\u0275cmp=p.Eb({type:o,selectors:[["app-payment"]],decls:22,vars:0,consts:[["tappable",""],["color","light"],["slot","start"],["mode","md","color","primary"],["color","primary"],[1,"header"],[1,"title"],[3,"click"],["src","assets/jaanu.png"],["mode","ios","name","arrow-forward-outline","slot","end"],["src","assets/cod.png"]],template:function(e,t){1&e&&(p.Nb(0,"ion-header",0),p.Nb(1,"ion-toolbar",1),p.Nb(2,"ion-buttons",2),p.Lb(3,"ion-back-button",3),p.Mb(),p.Nb(4,"ion-title",4),p.oc(5,"Payment Options"),p.Mb(),p.Mb(),p.Mb(),p.Nb(6,"ion-content"),p.Nb(7,"div",5),p.Nb(8,"ion-label",6),p.oc(9,"Payment Options"),p.Mb(),p.Mb(),p.Nb(10,"ion-item",7),p.Vb("click",(function(){return t.openRazorpay()})),p.Nb(11,"ion-thumbnail",2),p.Lb(12,"img",8),p.Mb(),p.Nb(13,"ion-label"),p.oc(14,"Pay with Razorpay"),p.Mb(),p.Lb(15,"ion-icon",9),p.Mb(),p.Nb(16,"ion-item",7),p.Vb("click",(function(){return t.placeOrder()})),p.Nb(17,"ion-thumbnail",2),p.Lb(18,"img",10),p.Mb(),p.Nb(19,"ion-label"),p.oc(20,"Cash on Delivery"),p.Mb(),p.Lb(21,"ion-icon",9),p.Mb(),p.Mb())},directives:[c.s,c.V,c.j,c.f,c.g,c.U,c.p,c.w,c.v,c.T,c.t],styles:[".header[_ngcontent-%COMP%]{background:#f3f3f3;padding:20px}.header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1rem;font-weight:700}"]}),o)}],y=((i=function e(){_classCallCheck(this,e)}).\u0275mod=p.Ib({type:i}),i.\u0275inj=p.Hb({factory:function(e){return new(e||i)},imports:[[l.i.forChild(m)],l.i]}),i),v=((n=function e(){_classCallCheck(this,e)}).\u0275mod=p.Ib({type:n}),n.\u0275inj=p.Hb({factory:function(e){return new(e||n)},imports:[[s.b,a.a,c.W,y]]}),n)}}]);