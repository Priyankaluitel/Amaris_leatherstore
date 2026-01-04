import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from '../app/cart/cart.component';
import { DashboardComponent} from '../app/admin/dashboard/dashboard';
import { AddProductComponent} from '../app/admin/add-product/add-product';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
  {path: 'cart', component: CartComponent},
  {path: 'admin',
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-product', component: AddProductComponent },
  ],
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

