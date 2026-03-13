
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private API = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  // Customer: get my orders
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/my`);
  }

  // Admin: get all orders
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}`);
  }

  // Admin: update order status
  updateStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(`${this.API}/${orderId}/status`, { status });
  }

  // View invoice
  getInvoice(orderId: number): Observable<any> {
    return this.http.get(`${this.API}/invoice/${orderId}`);
  }
  checkout(address: string): Observable<any> {
    return this.http.post(`${this.API}/checkout`, {
      address,
      paymentMethod: 'DUMMY_PAYMENT',
      paymentStatus: 'PAID',
    });
  }
}
