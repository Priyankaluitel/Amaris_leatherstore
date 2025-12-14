import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html'
})

  export class NavbarComponent {
  cartCount$;

  constructor(private store: Store<any>) {
    this.cartCount$ = this.store.select('cart').pipe(
      map(cart => cart.items.length)
    );
  }
  }
