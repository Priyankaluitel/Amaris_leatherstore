import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent 
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  products = [
    { name: 'Leather Bag', price: 1200 },
    { name: 'Leather Wallet', price: 800 },
    { name: 'Leather Belt', price: 600 }
  ];
}
