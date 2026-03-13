import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../services/products.service';

@Component({
  selector: 'app-order-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent {
  @Input() cartItems: { product: Product; quantity: number }[] = [];
  total = 0;

  ngOnChanges() {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  checkout() {
    console.log('Checkout clicked', this.cartItems);
    // You can later call API to create order
  }
}
