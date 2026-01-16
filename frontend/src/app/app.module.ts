import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderHistoryComponent,
    CheckoutComponent,
    AdminOrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [DatePipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

