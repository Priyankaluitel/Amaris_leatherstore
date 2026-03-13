import { Component, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  address = '';
  processing = false;
  orderPlaced = false;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  processPayment() {
    if (!this.address) {
      alert("Please enter a delivery address");
      return;
    }

    this.processing = true;
    this.cdr.detectChanges(); // force UI update

    // Diagnostic alert to verify request starts
    // alert("Starting checkout request...");

    this.orderService.checkout(this.address).subscribe({
      next: (res) => {
        console.log("Checkout Success:", res);
        this.processing = false;
        this.orderPlaced = true;
        this.cdr.detectChanges(); // force UI update

        // Refresh cart silently in background
        this.cartService.getCart().pipe(
          catchError(() => EMPTY)
        ).subscribe();
      },
      error: (err: any) => {
        console.error("Checkout Failed:", err);
        this.processing = false;
        this.cdr.detectChanges(); // force UI update

        if (err.status === 401 || err.status === 403) {
          alert('Your session has expired. Please log in again.');
        } else {
          alert('Checkout failed: ' + (err.error?.message || err.message || 'Please try again.'));
        }
      }
    });
  }
}