import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule,           
    FormsModule      
  ],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  statuses = ['PENDING', 'SHIPPED', 'DELIVERED'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }

  updateStatus(order: any) {
    this.orderService.updateStatus(order.id, order.status).subscribe(() => {
      alert(`Order #${order.id} status updated to ${order.status}`);
      this.loadOrders();
    });
  }

  viewInvoice(order: any) {
    window.open(`http://localhost:3000/orders/${order.id}/invoice`, '_blank');
  }
}
