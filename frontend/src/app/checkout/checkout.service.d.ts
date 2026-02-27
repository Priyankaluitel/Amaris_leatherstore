import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
}
export declare class CheckoutService {
    private http;
    private API;
    constructor(http: HttpClient);
    getCartItems(): Observable<CartItem[]>;
    checkout(address: string): Observable<any>;
}
