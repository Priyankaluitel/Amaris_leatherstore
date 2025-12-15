import { Routes } from '@angular/router';
import { OurteamComponent } from './pages/ourteam/ourteam.component';
import { OurservicesComponent } from './pages/ourservices/ourservices.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
    { path: 'team', component: OurteamComponent },
  { path: 'services', component: OurservicesComponent },
  { path: 'contact', component: ContactComponent },
   { path: '**', redirectTo: 'home' }
];
