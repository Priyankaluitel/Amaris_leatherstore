import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product, Category } from '../../../services/products.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  orders: any[] = [];
  activeTab: 'products' | 'orders' = 'products';

  // Form fields
  productForm = {
    id: undefined as number | undefined,
    name: '',
    price: 0,
    stock: 0,
    category: 'OTHER' as Category,
    imageUrl: '',
    introduction: '',
    description: ''
  };

  isEditing = false;
  loading = false;
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  updateOrderStatus(orderId: number, event: any) {
    const newStatus = event.target.value;
    this.orderService.updateStatus(orderId, newStatus).subscribe({
      next: () => {
        alert('Order status updated to ' + newStatus);
        this.loadOrders();
      },
      error: (err) => alert('Failed to update status: ' + err.message)
    });
  }

  switchTab(tab: 'products' | 'orders') {
    this.activeTab = tab;
    if (tab === 'products') this.loadProducts();
    if (tab === 'orders') this.loadOrders();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (!this.productForm.name || !this.productForm.price) {
      alert('Name and price are required');
      return;
    }

    this.loading = true;

    if (this.selectedFile) {
      // Upload file first
      this.productService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.productForm.imageUrl = res.imageUrl;
          this.saveProduct();
        },
        error: (err) => {
          this.loading = false;
          alert('Image upload failed: ' + err.message);
        }
      });
    } else {
      this.saveProduct();
    }
  }

  private saveProduct() {
    if (this.isEditing && this.productForm.id) {
      this.productService.updateProduct(this.productForm.id, this.productForm).subscribe({
        next: () => {
          alert('Product updated');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          this.loading = false;
          alert('Update failed: ' + err.message);
        }
      });
    } else {
      this.productService.createProduct(this.productForm).subscribe({
        next: () => {
          alert('Product added');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          this.loading = false;
          alert('Add failed: ' + err.message);
        }
      });
    }
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.productForm = {
      id: product.id,
      name: product.name || '',
      price: product.price || 0,
      stock: product.stock || 0,
      category: product.category || 'OTHER',
      imageUrl: product.imageUrl || '',
      introduction: product.introduction || '',
      description: product.description || ''
    };
  }

  deleteProduct(productId?: number) {
    if (!productId) return;
    if (confirm('Delete this product permanently?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted');
        this.loadProducts();
      });
    }
  }

  resetForm() {
    this.productForm = {
      id: undefined,
      name: '',
      price: 0,
      stock: 0,
      category: 'OTHER',
      imageUrl: '',
      introduction: '',
      description: ''
    };
    this.selectedFile = null;
    this.isEditing = false;
  }
}
