import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';

// constructor(store: Store) {
//   console.log('STORE INJECTED:', store);
// }
 @Component({
  selector: 'app-home',
 standalone: true,
 templateUrl: './home.component.html'
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

