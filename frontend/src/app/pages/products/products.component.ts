import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product, Category } from '../../../services/products.service';
import { CartService } from '../../../services/cart.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';
  categories: Category[] = ['BAGS', 'WALLETS', 'BELTS', 'ACCESSORIES', 'OTHER'];
  selectedCategory?: string;
  searchQuery = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'];
      this.searchQuery = params['search'] || '';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(this.selectedCategory, this.searchQuery).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  onRadioChange(category: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category || null }, // Remove category if empty
      queryParamsHandling: 'merge'
    });
  }

  addToCart(product: Product) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!product.id) return;
    this.cartService.addToCart(product.id).subscribe({
      next: () => alert(`${product.name} added to cart!`),
      error: (err) => {
        console.error('Failed to add to cart', err);
        alert('Could not add item to cart. Please try again.');
      }
    });
  }
}
