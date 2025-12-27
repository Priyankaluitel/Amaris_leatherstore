import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  captchaVerified = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
     next: (res) => {
  this.authService.saveToken(res.access_token);
}
 ,
      error: () => alert('Login failed')
    });
  }
}


