import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  searchQuery = '';
  isSearchVisible = false;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  get cartCount(): number {
    return this.cartService.totalItems;
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get dashboardLink(): string {
    if (!this.isLoggedIn) return '/login';
    return this.auth.isAdmin() ? '/admin/dashboard' : '/customer/dashboard';
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    });
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
      this.isSearchVisible = false;
      this.searchQuery = '';
    }
  }
}


