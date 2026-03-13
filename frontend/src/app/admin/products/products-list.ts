import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../services/products.service';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './products-list.html',
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.productService.getProducts().subscribe((data) => {
            this.products = data;
        });
    }

    deleteProduct(id: number | undefined) {
        if (!id) return;
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe(() => {
                alert('Product deleted');
                this.loadProducts();
            });
        }
    }
}
