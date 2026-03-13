import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private auth: AuthService) { }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get dashboardLink(): string {
    return this.auth.isAdmin() ? '/admin/dashboard' : '/customer/dashboard';
  }
}
