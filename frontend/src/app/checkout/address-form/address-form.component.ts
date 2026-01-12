import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
})
export class AddressFormComponent {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder, private checkoutService: CheckoutService) {
    this.checkoutForm = this.fb.group({ address: [''] });
  }

  checkout() {
    if (this.checkoutForm.valid) {
      const address = this.checkoutForm.value.address;
      this.checkoutService.checkout(address).subscribe({
        next: () => alert('Order placed successfully!'),
        error: () => alert('Checkout failed.'),
      });
    }
  }
}
