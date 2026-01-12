import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { OrderReviewComponent } from './order-review/order-review.component';

@NgModule({
  declarations: [AddressFormComponent, OrderReviewComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddressFormComponent, OrderReviewComponent],
})
export class CheckoutModule {}
