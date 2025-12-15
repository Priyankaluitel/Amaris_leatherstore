
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <p class="text-lg font-semibold">
        Redirecting to Home...
      </p>
    </div>
  `
})
export class ContactComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}
