import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';

// constructor(store: Store) {
//   console.log('STORE INJECTED:', store);
// }
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
})

export class HomeComponent {
  constructor(private store: Store) {}

  addItem() {
    this.store.dispatch(addToCart({
      item: {
        id: 1,
        name: 'Leather Bag',
        price: 1200,
        quantity: 1
      }
    }));
  }
}

