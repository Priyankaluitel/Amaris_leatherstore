import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { OurteamComponent } from './pages/ourteam/ourteam.component';
import { OurservicesComponent } from './pages/ourservices/ourservices.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqsComponent } from './pages/faq/faq.component';
import { ProductListComponent } from '../products/product-list.compomnent';
import { AdminDashboardComponent } from './pages/admin/dashboard.component';
import { CustomerDashboardComponent } from './pages/customer/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { adminGuard, customerGuard } from './guards/role.guard';
export const routes: Routes = [
  // Public pages
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  { path: 'register', component: RegisterComponent },

  { path: 'faq', component: FaqsComponent },
  { path: 'team', component: OurteamComponent },
  { path: 'services', component: OurservicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },

  // Dashboards
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin/dashboard.component')
        .then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, adminGuard],
  },
  {
    path: 'customer/dashboard',
    loadComponent: () =>
      import('./pages/customer/dashboard.component')
        .then(m => m.CustomerDashboardComponent),
    canActivate: [AuthGuard],
  },

  // Always last
  { path: '**', redirectTo: 'home' },
];
