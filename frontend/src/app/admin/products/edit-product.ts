import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product, Category } from '../../../services/products.service';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './edit-product.html',
})
export class EditProductComponent implements OnInit {
    product: Partial<Product> = {
        name: '',
        price: 0,
        stock: 0,
        category: 'OTHER',
        description: '',
        imageUrl: '',
    };
    id!: number;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.productService.getProductById(this.id).subscribe((data) => {
            this.product = data;
        });
    }

    updateProduct() {
        this.productService.updateProduct(this.id, this.product).subscribe({
            next: () => {
                alert('Product updated successfully');
                this.router.navigate(['/admin/products']);
            },
            error: (err) => {
                console.error(err);
                alert('Failed to update product');
            },
        });
    }
}
