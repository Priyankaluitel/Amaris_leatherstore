
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private API = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  // Customer: get my orders
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}`);
  }

  // Admin: get all orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/admin`);
  }

  // Admin: update order status
  updateStatus(orderId: number, status: string): Observable<any> {
    return this.http.post(`${this.API}/update-status/${orderId}`, { status });
  }

  // View invoice
  getInvoice(orderId: number): Observable<any> {
    return this.http.get(`${this.API}/invoice/${orderId}`);
  }

  // Checkout (mock payment)
  checkout(address: string): Observable<any> {
    return this.http.post(`${this.API}/checkout`, { address });
  }
}
