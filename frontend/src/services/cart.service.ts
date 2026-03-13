import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: any;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  loadCart() {
    this.getCart().subscribe();
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addToCart(productId: number, quantity = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { productId, quantity }).pipe(
      tap(() => this.loadCart())
    );
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${cartItemId}`).pipe(
      tap(() => this.loadCart())
    );
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${cartItemId}`, { quantity }).pipe(
      tap(() => this.loadCart())
    );
  }

  get totalItems(): number {
    const cart = this.cartSubject.value;
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
