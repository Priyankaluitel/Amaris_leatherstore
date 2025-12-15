import { createReducer, on } from '@ngrx/store';
import { addToCart } from './cart.actions';

export interface CartState {
  items: any[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  }))
);
