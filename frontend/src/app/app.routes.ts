// import { Routes } from '@angular/router';
// import { OurteamComponent } from './pages/ourteam/ourteam.component';
// import { OurservicesComponent } from './pages/ourservices/ourservices.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { HomeComponent } from './pages/home/home.component';
// import { LoginComponent } from './pages/login/login.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { RegisterComponent } from './pages/register/register.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//    { path: 'cart', component: CartComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'products', component: ProductsComponent },
//     { path: 'team', component: OurteamComponent },
//   { path: 'services', component: OurservicesComponent },
//   { path: 'contact', component: ContactComponent },
//    { path: '**', redirectTo: 'home' }
// ];
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { OurteamComponent } from './pages/ourteam/ourteam.component';
import { OurservicesComponent } from './pages/ourservices/ourservices.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },      // 👈 root
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'team', component: OurteamComponent },
  { path: 'services', component: OurservicesComponent },
  { path: 'contact', component: ContactComponent },

  { path: '**', redirectTo: '' }               // 👈 fallback
];


