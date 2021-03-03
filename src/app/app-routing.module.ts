import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    // path: 'product-details',
    path: 'product-details/:id',

    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'shipping-address',
    loadChildren: () => import('./pages/shipping-address/shipping-address.module').then(m => m.ShippingAddressPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./pages/add-address/add-address.module').then(m => m.AddAddressPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./pages/payment-method/payment-method.module').then(m => m.PaymentMethodPageModule)
  },
  {
    path: 'wish-list',
    loadChildren: () => import('./pages/wish-list/wish-list.module').then(m => m.WishListPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountPageModule)
  },
  {
    path: 'my-order/:price',
    loadChildren: () => import('./pages/my-order/my-order.module').then(m => m.MyOrderPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'edit-address',
    loadChildren: () => import('./pages/edit-address/edit-address.module').then(m => m.EditAddressPageModule)
  },
  {
    path: 'thankyou-page',
    loadChildren: () => import('./pages/thankyou-page/thankyou-page.module').then(m => m.ThankyouPagePageModule)
  },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  // },
  {
    path: 'all-products',
    loadChildren: () => import('./pages/all-products/all-products.module').then(m => m.AllProductsPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'write-review',
    loadChildren: () => import('./pages/write-review/write-review.module').then(m => m.WriteReviewPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
  },
  {
    path: 'view-invoice',
    loadChildren: () => import('./pages/view-invoice/view-invoice.module').then(m => m.ViewInvoicePageModule)
  },
  {
    path: 'addtocart-popup',
    loadChildren: () => import('./pages/addtocart-popup/addtocart-popup.module').then(m => m.AddtocartPopupPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'manage-address',
    loadChildren: () => import('./pages/manage-address/manage-address.module').then( m => m.ManageAddressPageModule)
  },
  {
    path: 'category-product',
    loadChildren: () => import('./pages/category-product/category-product.module').then( m => m.CategoryProductPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' }),
    // RouterModule.forRoot(routes, { })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
