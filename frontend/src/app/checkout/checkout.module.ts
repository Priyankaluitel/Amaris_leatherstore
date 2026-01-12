import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form/address-form.component';
import { OrderReviewComponent } from './order-review/order-review.component';

@NgModule({
  imports: [CommonModule, AddressFormComponent, OrderReviewComponent],
  exports: [AddressFormComponent, OrderReviewComponent],
})
export class CheckoutModule {}

