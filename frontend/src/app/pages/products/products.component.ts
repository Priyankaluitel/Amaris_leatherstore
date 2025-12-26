import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    { name: 'Leather Bag', price: 1200, image: 'assets/products/bag.jpg' },
    { name: 'Wallet', price: 450, image: 'assets/products/wallet.jpg' },
    { name: 'Belt', price: 300, image: 'assets/products/belt.jpg' },
    { name: 'Leather Jacket', price: 2500, image: 'assets/products/jacket.jpg' }
  ];
}
