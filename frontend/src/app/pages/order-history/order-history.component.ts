import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
   imports: [
    CommonModule,           
    FormsModule      
  ],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }

  viewInvoice(order: any) {
    window.open(`/orders/invoice/${order.id}`, '_blank');
  }
}
