import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from './pages/login/login.module';
import { LoginPage } from './pages/login/login.page';
import { AddAddressPage } from './pages/add-address/add-address.page';
import { AddAddressPageModule } from './pages/add-address/add-address.module';
import { EditAddressPage } from './pages/edit-address/edit-address.page';
import { EditAddressPageModule } from './pages/edit-address/edit-address.module';
import { RegisterPage } from './pages/register/register.page';
import { RegisterPageModule } from './pages/register/register.module';
import { WriteReviewPage } from './pages/write-review/write-review.page';
import { WriteReviewPageModule } from './pages/write-review/write-review.module';
import { ForgotpasswordPage } from './pages/forgotpassword/forgotpassword.page';
import { ForgotpasswordPageModule } from './pages/forgotpassword/forgotpassword.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicRatingModule } from 'ionic-rating';
import { AddtocartPopupPage } from './pages/addtocart-popup/addtocart-popup.page';
import { AddtocartPopupPageModule } from './pages/addtocart-popup/addtocart-popup.module';
import { MenuComponentComponent } from './components/menu-component/menu-component.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './services/translate-config.service';
import { FCM } from '@ionic-native/fcm/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, MenuComponentComponent],
  entryComponents: [LoginPage, AddAddressPage, 
    EditAddressPage,  WriteReviewPage, ForgotpasswordPage, AddtocartPopupPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    LoginPageModule,
    AddAddressPageModule,
    FormsModule,
   
    EditAddressPageModule,
    WriteReviewPageModule,
    IonicRatingModule,
    ForgotpasswordPageModule,
    AddtocartPopupPageModule,
    
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateConfigService,
    SocialSharing,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
