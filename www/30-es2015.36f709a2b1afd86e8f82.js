(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{cjqQ:function(t,i,o){"use strict";o.r(i),o.d(i,"PrivacyPolicyPageModule",(function(){return y}));var r=o("ofXK"),n=o("3Pt+"),e=o("TEn/"),s=o("tyNb"),c=o("fXoL"),a=o("lGQG"),l=o("5dVO"),b=o("2g2N");function d(t,i){if(1&t&&(c.Nb(0,"ion-content",6),c.Nb(1,"ion-label",7),c.oc(2),c.Mb(),c.Mb()),2&t){const t=c.Xb();c.zb(2),c.qc(" ",t.data," ")}}const p=[{path:"",component:(()=>{class t{constructor(t,i,o){this.authService=t,this.loader=i,this.toastService=o,this.PrivacyPolicy()}ngOnInit(){}PrivacyPolicy(){this.loader.loadingPresent(),this.authService.PrivacyPolicy().subscribe(t=>{console.log(t),!1===t.error?(this.loader.loadingDismiss(),this.data=t.result_PrivacyPolicy.desc):(this.loader.loadingDismiss(),this.toastService.presentToast(t.msg))},t=>{this.loader.loadingDismiss(),null!=JSON.stringify(t.error.errors)?this.toastService.presentToast(JSON.stringify(t.error.errors)):this.toastService.presentToast("Network Issue...")})}}return t.\u0275fac=function(i){return new(i||t)(c.Kb(a.a),c.Kb(l.a),c.Kb(b.a))},t.\u0275cmp=c.Eb({type:t,selectors:[["app-privacy-policy"]],decls:7,vars:1,consts:[["tappable",""],["color","light"],["slot","start"],["color","primary","name","menu"],["color","primary"],["padding","",4,"ngIf"],["padding",""],[2,"padding","10px"]],template:function(t,i){1&t&&(c.Nb(0,"ion-header",0),c.Nb(1,"ion-toolbar",1),c.Nb(2,"ion-menu-button",2),c.Lb(3,"ion-icon",3),c.Mb(),c.Nb(4,"ion-title",4),c.oc(5,"Privacy Policy"),c.Mb(),c.Mb(),c.Mb(),c.nc(6,d,3,1,"ion-content",5)),2&t&&(c.zb(6),c.cc("ngIf",i.data))},directives:[e.s,e.V,e.A,e.t,e.U,r.i,e.p,e.w],styles:[""]}),t})()}];let u=(()=>{class t{}return t.\u0275mod=c.Ib({type:t}),t.\u0275inj=c.Hb({factory:function(i){return new(i||t)},imports:[[s.i.forChild(p)],s.i]}),t})(),y=(()=>{class t{}return t.\u0275mod=c.Ib({type:t}),t.\u0275inj=c.Hb({factory:function(i){return new(i||t)},imports:[[r.b,n.a,e.W,u]]}),t})()}}]);