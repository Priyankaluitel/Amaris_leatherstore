import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    loading = true;
    error?: string;
    quantity = 1;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private auth: AuthService,
        private cartService: CartService,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadProduct(id);
            }
        });
    }

    loadProduct(id: string) {
        this.loading = true;
        this.productService.getProductById(id).subscribe({
            next: (data) => {
                this.product = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Product not found';
                this.loading = false;
            }
        });
    }

    get imageSrc(): string {
        if (!this.product) return '';
        if (this.product.imageUrl?.startsWith('http')) return this.product.imageUrl;
        return this.product.imageUrl ? `http://localhost:3000${this.product.imageUrl}` : 'https://via.placeholder.com/600x800';
    }

    increaseQuantity() {
        if (this.product && this.quantity < this.product.stock) {
            this.quantity++;
        }
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToCart() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        if (this.product?.id) {
            this.cartService.addToCart(this.product.id, this.quantity).subscribe({
                next: () => {
                    alert('Added to cart!');
                },
                error: (err) => {
                    alert('Failed to add to cart: ' + (err?.error?.message || 'Unknown error'));
                }
            });
        }
    }

    goBack() {
        this.location.back();
    }
}
