(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{ABib:function(t,n,o){"use strict";o.r(n),o.d(n,"AllProductsPageModule",(function(){return v}));var e=o("ofXK"),i=o("3Pt+"),r=o("TEn/"),c=o("tyNb"),a=o("mrSG"),s=o("l5mm"),g=o("jx6n"),l=o("fXoL"),d=o("Sy1n"),p=o("lGQG"),b=o("5dVO"),h=o("n90K"),M=o("2g2N");function u(t,n){if(1&t&&(l.Nb(0,"ion-title",29),l.oc(1),l.Mb()),2&t){const t=l.Xb();l.zb(1),l.pc(t.CategoryName)}}function m(t,n){1&t&&(l.Nb(0,"ion-title",29),l.oc(1,"All Products"),l.Mb())}function _(t,n){1&t&&(l.Nb(0,"ion-col",30),l.Nb(1,"ion-thumbnail"),l.Lb(2,"ion-skeleton-text",31),l.Mb(),l.Nb(3,"ion-label"),l.Nb(4,"h3"),l.Lb(5,"ion-skeleton-text",32),l.Mb(),l.Nb(6,"p"),l.Lb(7,"ion-skeleton-text",33),l.Mb(),l.Nb(8,"p"),l.Lb(9,"ion-skeleton-text",34),l.Mb(),l.Mb(),l.Mb())}function C(t,n){if(1&t&&(l.Nb(0,"div"),l.Nb(1,"p"),l.oc(2),l.Mb(),l.Mb()),2&t){const t=l.Xb().$implicit;l.zb(2),l.qc(" MRP: \u20b9 ",t.price,"")}}function P(t,n){if(1&t&&(l.Nb(0,"div"),l.Nb(1,"p"),l.oc(2),l.Mb(),l.Nb(3,"p"),l.oc(4),l.Mb(),l.Mb()),2&t){const t=l.Xb().$implicit;l.zb(2),l.qc("MRP: \u20b9 ",t.price,""),l.zb(2),l.qc("Your Price : \u20b9 ",t.discounted_price,"")}}function O(t,n){if(1&t){const t=l.Ob();l.Nb(0,"ion-col",35),l.Nb(1,"ion-card"),l.Nb(2,"div",36),l.Vb("click",(function(){l.jc(t);const o=n.$implicit;return l.Xb().goToProductDetail(o.id)})),l.Lb(3,"img",37),l.Nb(4,"p",38),l.oc(5),l.Mb(),l.Nb(6,"ion-row"),l.Nb(7,"ion-col",39),l.nc(8,C,3,1,"div",40),l.nc(9,P,5,2,"div",40),l.Mb(),l.Mb(),l.Mb(),l.Nb(10,"div",41),l.Nb(11,"ion-button",42),l.Vb("click",(function(){l.jc(t);const o=n.$implicit;return l.Xb().goToCart(o.id,o.price,o.product_packages,o.discounted_price,o.discount_res)})),l.Nb(12,"ion-label",1),l.oc(13," Add to cart "),l.Mb(),l.Mb(),l.Mb(),l.Mb(),l.Mb()}if(2&t){const t=n.$implicit;l.zb(3),l.ec("src","http://parnamib2b.com/public/product_images/",t.default_image,"",l.kc),l.zb(2),l.pc(t.product_name),l.zb(3),l.cc("ngIf",null===t.discounted_price),l.zb(1),l.cc("ngIf",null!=t.discounted_price)}}const f=[{path:"",component:(()=>{class t{constructor(t,n,o,e,i,r,c,a,g,l,d){this.route=t,this.menuCtrl=n,this.appcompo=o,this.actionSheetController=e,this.nav=i,this.modalController=r,this.router=c,this.authService=a,this.loader=g,this.storageService=l,this.toastService=d,this.cat_id="",this.postData=[{product_name:"",unit_name:""}],this.itemsCategory=[],this.visibleCategory=!1,this.catId=[],this.total_cart="",this.dummy=Array(20),this.randomNumber=Math.random(),this.CategoryName=localStorage.getItem("catName"),this.sortby="new",this.lang=localStorage.getItem("lang"),Object(s.a)(100).subscribe(t=>{this.storageService.getCartCount().then(t=>{this.total_cart=t||"0"})}),setTimeout(()=>{this.storageService.getRandomNumber().then(t=>{t?this.rad=t:(this.rad=this.randomNumber,this.storageService.setRandomNumber(this.randomNumber))})},500),setTimeout(()=>{this.storageService.getData().then(t=>{t?(this.user_id=t.result_FrontLogin.id,this.ProductByCategory()):(this.user_id="",this.ProductByCategory())})},1e3)}ngOnInit(){this.menuCtrl.enable(!1,"menu1"),this.menuCtrl.enable(!0,"menuAdmin")}doRefresh(t){console.log("Begin async operation"),this.ProductByCategory(),this.dummy=Array(20),setTimeout(()=>{this.dummy=[],console.log("Async operation has ended"),t.target.complete()},2e3)}ProductByCategory(){var t=localStorage.getItem("cattoken"),n=localStorage.getItem("BrandId"),o=localStorage.getItem("price_min"),e=localStorage.getItem("price_max");console.log("cattoken => "+t),console.log("brnd => "+n),console.log("pmin => "+o),console.log("pmax => "+e),this.catid=""!=this.catid?t:this.cat_id,this.brdnid=""!=this.brdnid?n:"",this.pricemin=""!=this.pricemin?o:"",this.pricemax=""!=this.pricemax?e:"";const i={page:"",sortBy:"",MinPrice:this.pricemin,MaxPrice:this.pricemax,CategoryIds:this.catid,BrandId:this.brdnid,Text:"",limit:"10000",discounted_products:"",user_id:this.user_id,lang:this.lang};console.log("Params =>  "+JSON.stringify(i)),this.authService.Products(i).subscribe(t=>{if(console.log(t),this.dummy=[],!1===t.error){this.data=t.result_products.products.data,this.finalData=this.data;for(let n=0;n<t.result_products.products.data.length;n++)this.postData=t.result_products.products.data[n]}else this.dummy=[],this.toastService.presentToast(t.msg)},t=>{this.dummy=[],null!=JSON.stringify(t.error.errors)?this.toastService.presentToast(JSON.stringify(t.error.errors)):this.toastService.presentToast("Network Issue...")})}goToSearchPage(){this.nav.navigateForward("search")}goToCartPage(){this.nav.navigateForward("cart")}goToProductDetail(t){this.router.navigate(["product-details/",t])}onIconClick(t){}changeLayout(){}SortByOrder(t){this.loader.loadingPresent(),JSON.stringify(t),console.log(t);const n={page:"",sortBy:t,MinPrice:"",MaxPrice:"",CategoryIds:"",BrandId:"",Text:"",limit:"10000",location_id:"",user_id:this.user_id,lang:this.lang};console.log("Params =>  "+JSON.stringify(n)),this.authService.Products(n).subscribe(t=>{if(console.log(t),!1===t.error){this.loader.loadingDismiss(),this.data=t.result_products.products.data,this.finalData=this.data;for(let n=0;n<t.result_products.products.data.length;n++)this.postData=t.result_products.products.data[n]}else this.loader.loadingDismiss(),this.toastService.presentToast(t.msg)},t=>{this.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?this.toastService.presentToast(JSON.stringify(t.error.errors)):this.toastService.presentToast("Network Issue...")})}refresh(){return Object(a.a)(this,void 0,void 0,(function*(){this.ProductByCategory()}))}openRightMenu(){return Object(a.a)(this,void 0,void 0,(function*(){console.log("funnel clicked"),this.menuCtrl.enable(!1,"menu1"),this.menuCtrl.enable(!0,"menuAdmin")}))}goToCart(t,n,o,e,i){return Object(a.a)(this,void 0,void 0,(function*(){var r;if(console.log(e),r=null!=e?e:n,o.length>0){const n=yield this.modalController.create({component:g.a,cssClass:"cart-modal",componentProps:{id:t,session_id:this.rad,price:r,user_id:this.user_id}});return n.onDidDismiss().then(t=>{console.log("DataPackage =>"+JSON.stringify(t.data))}),yield n.present()}{const n={session_id:this.rad,product_id:t,price:r,user_id:this.user_id,package_id:"",package_res:"",discount_res:JSON.stringify(i)};console.log("Add To Cart Data => "+JSON.stringify(n)),this.loader.loadingPresent(),this.authService.AddToCart(n).subscribe(t=>{console.log(t),!1===t.error?(this.toastService.presentToast(t.msg),this.loader.loadingDismiss(),this.storageService.setCartCount(t.total_items)):(this.loader.loadingDismiss(),this.toastService.presentToast(t.msg))},t=>{this.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?this.toastService.presentToast(JSON.stringify(t.error.errors)):this.toastService.presentToast("Network Issue...")})}}))}ionViewDidLeave(){}}return t.\u0275fac=function(n){return new(n||t)(l.Kb(c.a),l.Kb(r.Z),l.Kb(d.a),l.Kb(r.a),l.Kb(r.bb),l.Kb(r.ab),l.Kb(c.g),l.Kb(p.a),l.Kb(b.a),l.Kb(h.a),l.Kb(M.a))},t.\u0275cmp=l.Eb({type:t,selectors:[["app-all-products"]],decls:50,vars:6,consts:[["tappable",""],["color","light"],["slot","start"],["fill","clear","routerLink","/home","routerDirection","backward"],["slot","icon-only","src","assets/custom-icon-tc-shop/back.svg"],["color","primary","class","ecom-title",4,"ngIf"],["slot","end"],["fill","clear",3,"click"],["slot","icon-only","name","search"],["name","cart-outline",1,"cart-badge"],["no-padding",""],["slot","fixed","pullFactor","0.5","pullMin","100","pullMax","200",3,"ionRefresh"],["lines","none"],["size","6","style","align-items: center;",4,"ngFor","ngForOf"],["no-padding","","scrollX","true"],["size","6","style","text-align: center;","no-padding","",4,"ngFor","ngForOf"],[1,"products-footer"],[3,"click"],["src","assets/interface.svg"],["value","new","okText","Okay","cancelText","Dismiss",3,"ngModel","ngModelChange","ionChange"],["S",""],["value","old"],["value","new"],["value","price_low"],["value","price_high"],["value","name_a_z"],["value","name_z_a"],["name","refresh"],["name","funnel"],["color","primary",1,"ecom-title"],["size","6",2,"align-items","center"],["animated",""],["animated","",2,"width","50%"],["animated","",2,"width","80%"],["animated","",2,"width","60%"],["size","6","no-padding","",2,"text-align","center"],[1,"dhe",3,"click"],[3,"src"],[2,"font-weight","bold"],["size","12"],[4,"ngIf"],[1,"div-recent-btn"],["color","primary",3,"click"]],template:function(t,n){if(1&t){const t=l.Ob();l.Nb(0,"ion-header",0),l.Nb(1,"ion-toolbar",1),l.Nb(2,"ion-buttons",2),l.Nb(3,"ion-button",3),l.Lb(4,"ion-icon",4),l.Mb(),l.Mb(),l.nc(5,u,2,1,"ion-title",5),l.nc(6,m,2,0,"ion-title",5),l.Nb(7,"ion-buttons",6),l.Nb(8,"ion-button",7),l.Vb("click",(function(){return n.goToSearchPage()})),l.Lb(9,"ion-icon",8),l.Mb(),l.Nb(10,"ion-button",7),l.Vb("click",(function(){return n.goToCartPage()})),l.Lb(11,"ion-icon",9),l.Nb(12,"ion-badge"),l.oc(13),l.Mb(),l.Mb(),l.Mb(),l.Mb(),l.Mb(),l.Nb(14,"ion-content",10),l.Nb(15,"ion-refresher",11),l.Vb("ionRefresh",(function(t){return n.doRefresh(t)})),l.Lb(16,"ion-refresher-content"),l.Mb(),l.Nb(17,"div"),l.Nb(18,"ion-list",12),l.Nb(19,"ion-grid"),l.Nb(20,"ion-row"),l.nc(21,_,10,0,"ion-col",13),l.Mb(),l.Mb(),l.Mb(),l.Mb(),l.Nb(22,"div",14),l.Nb(23,"ion-grid",10),l.Nb(24,"ion-row",10),l.nc(25,O,14,4,"ion-col",15),l.Mb(),l.Mb(),l.Mb(),l.Mb(),l.Nb(26,"ion-footer",16),l.Nb(27,"ion-toolbar",1),l.Nb(28,"ion-buttons",2),l.Nb(29,"ion-button",17),l.Vb("click",(function(){return n.changeLayout()})),l.Lb(30,"ion-icon",18),l.Nb(31,"ion-select",19,20),l.Vb("ngModelChange",(function(t){return n.sortby=t}))("ionChange",(function(){l.jc(t);const o=l.ic(32);return n.SortByOrder(o.value)})),l.Nb(33,"ion-select-option",21),l.oc(34,"Old"),l.Mb(),l.Nb(35,"ion-select-option",22),l.oc(36,"Latest"),l.Mb(),l.Nb(37,"ion-select-option",23),l.oc(38,"Price (Low to High)"),l.Mb(),l.Nb(39,"ion-select-option",24),l.oc(40,"Price (High to Low)"),l.Mb(),l.Nb(41,"ion-select-option",25),l.oc(42,"Name (A to Z)"),l.Mb(),l.Nb(43,"ion-select-option",26),l.oc(44,"Name (Z to A)"),l.Mb(),l.Mb(),l.Mb(),l.Mb(),l.Nb(45,"ion-buttons",6),l.Nb(46,"ion-button",17),l.Vb("click",(function(){return n.refresh()})),l.Lb(47,"ion-icon",27),l.Mb(),l.Nb(48,"ion-menu-button",17),l.Vb("click",(function(){return n.openRightMenu()})),l.Lb(49,"ion-icon",28),l.Mb(),l.Mb(),l.Mb(),l.Mb()}2&t&&(l.zb(5),l.cc("ngIf",""!=n.CategoryName),l.zb(1),l.cc("ngIf",""===n.CategoryName),l.zb(7),l.pc(n.total_cart),l.zb(8),l.cc("ngForOf",n.dummy),l.zb(4),l.cc("ngForOf",n.data),l.zb(6),l.cc("ngModel",n.sortby))},directives:[r.s,r.V,r.j,r.i,r.gb,c.h,r.t,e.i,r.h,r.p,r.E,r.F,r.x,r.r,r.H,e.h,r.q,r.L,r.hb,i.d,i.g,r.M,r.A,r.U,r.o,r.T,r.N,r.w,r.k],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--color:#fff}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%]{font-size:16px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%]{position:absolute;right:5px;bottom:14px}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]{height:auto!important}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   p[_ngcontent-%COMP%]{padding-right:0;margin-top:0;font-size:12px;color:#000;font-family:roboto-bold}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;color:#000;margin-left:5px;font-weight:600}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   p[_ngcontent-%COMP%]   del[_ngcontent-%COMP%]{font-size:12px;color:#000;font-weight:600}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(3)   ion-icon[_ngcontent-%COMP%]{zoom:1.2;color:var(--ion-color-primary)}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:100%;height:25px}div[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{border-bottom:solid #eee;border-top:solid #eee;--padding-start:0}div[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]{margin:0;height:100px;width:100px}div[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]   .badge-img[_ngcontent-%COMP%]{position:absolute;z-index:1;height:45px;width:45px}div[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin-bottom:0;position:absolute;top:60px;right:10px}div[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-bottom:auto;margin-left:10px}div[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:10px;font-size:12px;color:#000;font-family:roboto-bold}.skeleton-card[_ngcontent-%COMP%]{margin-top:0}.skeleton-para[_ngcontent-%COMP%]{width:80px!important;height:20px!important;margin-top:-6px!important}.sale-featured[_ngcontent-%COMP%]{position:absolute!important;right:0;color:#fff;z-index:1!important;top:0;font-family:roboto-regular}.sale-featured[_ngcontent-%COMP%]   .sale[_ngcontent-%COMP%]{padding:3px 5px;margin-left:auto;width:auto;height:auto;margin-bottom:3px}.sale-featured[_ngcontent-%COMP%]   .featured[_ngcontent-%COMP%], .sale-featured[_ngcontent-%COMP%]   .sale[_ngcontent-%COMP%]{background:var(--ion-color-primary);text-align:center!important;font-size:9px}.sale-featured[_ngcontent-%COMP%]   .featured[_ngcontent-%COMP%]{padding:4px 5px 13px;width:56px;height:18.57px}.img-list[_ngcontent-%COMP%]{-webkit-filter:none!important;filter:none!important}.icon[_ngcontent-%COMP%]{color:var(--ion-color-primary)}ion-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{text-transform:capitalize;margin-right:0}ion-content[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%]{width:40%}ion-content[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]{background:#f9f9f9}ion-content[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]{--indicator-color:#d3d3d3;font-size:14px;--color:#707070}ion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%]:last-child{height:auto}ion-content[_ngcontent-%COMP%]   app-product[_ngcontent-%COMP%]{width:100%}ion-content[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{padding-left:4px;padding-top:6px!important}ion-content[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{margin-top:0;margin-bottom:-3px;font-size:13.5px}ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--inner-padding-end:0;--padding-start:4px;padding-top:3px;margin-bottom:-15px}ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin-right:5px;font-size:15px;margin-left:6px}ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0;margin-bottom:-2px;font-size:16px!important;font-family:roboto-medium!important;color:#000;margin-left:5px}ion-content[_ngcontent-%COMP%]   .row-segment[_ngcontent-%COMP%]{margin-right:10px}.products-footer[_ngcontent-%COMP%]   ion-buttons[left][_ngcontent-%COMP%]{padding-left:10px}.products-footer[_ngcontent-%COMP%]   ion-buttons[left][_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;margin-bottom:-5px;color:var(--ion-color-primary)}.products-footer[_ngcontent-%COMP%]   ion-buttons[left][_ngcontent-%COMP%]   .bar-button[_ngcontent-%COMP%]{padding-left:0;margin-left:0;margin-bottom:-10px}.products-footer[_ngcontent-%COMP%]   ion-buttons[left][_ngcontent-%COMP%]   .bar-button[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{margin-left:10px}.products-footer[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]{color:var(--ion-color-primary)}.products-footer[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{padding-left:7px;padding-top:8px}.products-footer[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   .bar-button-menutoggle[_ngcontent-%COMP%]{display:inline-block}.products-footer[_ngcontent-%COMP%]   .as-btn[_ngcontent-%COMP%]{--color:var(--ion-color-primary);height:28px}.para-price[_ngcontent-%COMP%]{font-family:roboto-regular;font-size:14px!important}.name-para[_ngcontent-%COMP%]{font-family:roboto-regular!important;font-weight:600!important}ion-action-sheet[_ngcontent-%COMP%]   .action-sheet-group.sc-ion-action-sheet-md[_ngcontent-%COMP%]{background:#fff}.cart-badge[_ngcontent-%COMP%]{font-size:22px!important}.back-icon[_ngcontent-%COMP%]{font-size:16px!important}.col-text[_ngcontent-%COMP%]{padding-left:16px!important}.price-heading[_ngcontent-%COMP%], .usd-icon[_ngcontent-%COMP%]{font-size:20px!important}.price-heading[_ngcontent-%COMP%]{margin-top:10px!important;padding-left:10px!important}.box[_ngcontent-%COMP%]{border-top:1px solid #e2e2e2;border-bottom:1px solid #e2e2e2;width:100%;height:400px;margin:5px;padding:5px;background:#fff}div[_ngcontent-%COMP%]:first-child   ion-card[_ngcontent-%COMP%]{height:180px;margin-top:15px;border-radius:0}div[_ngcontent-%COMP%]:first-child   ion-card[_ngcontent-%COMP%]   ion-skeleton-text[_ngcontent-%COMP%]{height:90px}div[_ngcontent-%COMP%]:first-child   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{height:20px;padding-left:10px}div[_ngcontent-%COMP%]:first-child   ion-card[_ngcontent-%COMP%]   ion-skeleton-text[_ngcontent-%COMP%]:first-child{width:100%;height:110px;margin-top:0}div[_ngcontent-%COMP%]:first-child   ion-card[_ngcontent-%COMP%]   ion-skeleton-text[_ngcontent-%COMP%]:last-child{height:20px;width:90%;margin-top:5px}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]{margin-right:0;margin-top:10px!important;margin-bottom:1px;height:auto;border-radius:0}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   .img-div[_ngcontent-%COMP%]{font-size:11px;font-weight:400;color:#fff;position:absolute;right:0;top:0;z-index:9;text-align:right;text-transform:uppercase}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   .img-div[_ngcontent-%COMP%]   .sale[_ngcontent-%COMP%]{padding:3px 5px 2px;margin-bottom:4px;display:inline-block}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   .img-div[_ngcontent-%COMP%]   .featured[_ngcontent-%COMP%]{padding:3px 5px 2px}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){height:40px;position:absolute;z-index:1;left:0!important;width:53px;top:-1px;margin-left:-8px}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:left;margin-top:5px;margin-bottom:0;padding-right:0;margin-top:0;font-size:12px;color:#000;font-family:roboto-bold}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:0;text-align:center}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   del[_ngcontent-%COMP%], div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;color:#000;font-weight:600}div[_ngcontent-%COMP%]:last-child   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:100%;height:25px}.div-recent-btn[_ngcontent-%COMP%]{width:98%!important}"]}),t})()}];let x=(()=>{class t{}return t.\u0275mod=l.Ib({type:t}),t.\u0275inj=l.Hb({factory:function(n){return new(n||t)},imports:[[c.i.forChild(f)],c.i]}),t})(),v=(()=>{class t{}return t.\u0275mod=l.Ib({type:t}),t.\u0275inj=l.Hb({factory:function(n){return new(n||t)},imports:[[e.b,i.a,r.W,x]]}),t})()}}]);