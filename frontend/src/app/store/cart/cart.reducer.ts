import { createReducer, on } from '@ngrx/store';
import { initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),

  on(CartActions.removeFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  })),

  on(CartActions.clearCart, () => initialCartState)
);
