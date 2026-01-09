import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from '../app/cart/cart.component';
import { DashboardComponent} from '../app/admin/dashboard/dashboard';
import { AddProductComponent} from '../app/admin/add-product/add-product';
import { AuthGuard } from './guards/auth.guard';
import { RecaptchaModule } from 'ng-recaptcha';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptors';

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
  { path: '**', redirectTo: 'login' },

];
@NgModule({
 imports: [RouterModule.forRoot(routes), RecaptchaModule],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}

