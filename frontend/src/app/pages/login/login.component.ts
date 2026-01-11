
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
// import { RecaptchaModule } from 'ng-recaptcha';

// @Component({
//   selector: 'app-login',
//   standalone: true,           // use standalone component
//   imports: [CommonModule, ReactiveFormsModule, RecaptchaModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   error = '';
//  captchaToken: string = '';
//   recaptchaSiteKey = '6LcGoTUsAAAAALfFf3oRozdbVdJFA-7eAY-k94iO'; 

//   constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

// submit() {
//   if (this.loginForm.invalid || !this.captchaToken) {
//     this.error = 'Please fill all fields and verify captcha.';
//     return;
//   }

//   const { email, password } = this.loginForm.value;

//   // Pass captchaToken
//   this.auth.login(email, password, this.captchaToken).subscribe({
//     next: () => {
//       this.error = '';
//       const role = this.auth.getUserRole();
//       if (role === 'ADMIN') this.router.navigate(['/admin/dashboard']);
//       else this.router.navigate(['/customer/dashboard']);
//     },
//     error: (err) => {
//       this.error = err?.error?.message || 'Login failed. Please check your credentials.';
//     },
//   });
// }

// Store captcha token
// captchaResolved(token: string) {
//   this.captchaToken = token; // <-- IMPORTANT!
// }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';
  captchaToken: string | null = null;   // ✅ store the token here
  captchaVerified = false;
  recaptchaSiteKey = '6LcGoTUsAAAAALfFf3oRozdbVdJFA-7eAY-k94iO'; // replace with your real site key

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.loginForm.invalid || !this.captchaToken) {
      this.error = 'Please fill all fields and verify captcha.';
      return;
    }

    const { email, password } = this.loginForm.value;

    // Pass captchaToken
    this.auth.login(email, password, this.captchaToken).subscribe({
     next: (res) => {
  const role = this.auth.getUserRole();

  if (role === 'ADMIN') {
    this.router.navigateByUrl('/admin/dashboard');
  } else {
    this.router.navigateByUrl('/customer/dashboard');
  }
},
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message || 'Login failed. Please check your credentials.';
      },
    });
  }

  // This is called by the reCAPTCHA when it resolves
  captchaResolved(token: string | null) {
    this.captchaToken = token;
    this.captchaVerified = !!token;
  }
}

