import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>

    <button class="bg-black text-white px-4 py-2 rounded">
      Add Product
    </button>

    <p class="mt-4">Manage products, orders, users here.</p>
  `,
})
export class AdminComponent {}
