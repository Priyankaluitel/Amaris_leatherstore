import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
})
export class FaqsComponent {

  activeIndex: number | null = null;

  faqs = [
    {
      question: 'Do you use genuine leather?',
      answer: 'Yes, all Amaris products are made from 100% genuine leather.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently we ship within Nepal. International shipping is coming soon.'
    },
    {
      question: 'What is your return policy?',
      answer: 'Returns are accepted within 7 days if the product is unused.'
    },
    {
      question: 'Are your products handmade?',
      answer: 'Yes, all products are handcrafted by skilled artisans.'
    }
  ];

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
