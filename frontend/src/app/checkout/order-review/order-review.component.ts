import { Component, OnInit } from '@angular/core';
import { CheckoutService, CartItem } from '../checkout.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.checkoutService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    });
  }

  checkout() {
    // Navigate to address form or directly call checkout API
  }
}
