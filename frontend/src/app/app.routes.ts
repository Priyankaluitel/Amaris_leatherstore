import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { OurteamComponent } from './pages/ourteam/ourteam.component';
import { OurservicesComponent } from './pages/ourservices/ourservices.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqsComponent } from './pages/faq/faq.component';
import {AuthService } from './../app/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent , canActivate: [authGuard]   },
  { path: 'cart', component: CartComponent, canActivate: [authGuard]   },
  { path: 'faq', component: FaqsComponent }, // ✅ FIXED
  { path: 'team', component: OurteamComponent },
  { path: 'services', component: OurservicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' }
];
