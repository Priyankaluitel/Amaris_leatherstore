import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { AddProductComponent } from './add-product/add-product';
import { ProductsListComponent } from './products/products-list';
import { EditProductComponent } from './products/edit-product';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
