import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent,NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
