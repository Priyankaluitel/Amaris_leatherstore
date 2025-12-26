import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ourteam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ourteam.component.html',
  styleUrls: ['./ourteam.component.css']
})
export class OurteamComponent {
  teamMembers = [
    { name: 'Priyanka Luitel', role: 'CEO' },
    { name: 'Bobby Singh', role: 'Developer' },
    { name: 'Kazol', role: 'Designer' }
  ];
}
