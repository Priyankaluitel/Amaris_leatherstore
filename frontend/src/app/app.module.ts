import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Standalone components
import { AppComponent } from './app.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppComponent,           // ✅ standalone, import here
    OrderHistoryComponent,  // ✅ standalone
    CheckoutComponent,      // ✅ standalone
    AdminOrdersComponent    // ✅ standalone
  ],
  providers: [DatePipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

