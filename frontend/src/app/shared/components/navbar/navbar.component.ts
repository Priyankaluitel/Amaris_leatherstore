import { Component,Input  } from '@angular/core';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
     RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
   cartCount = 0;
}


