import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-customer-dashboard',
  templateUrl: './dashboard.component.html',
})
export class CustomerDashboardComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}

