import { Component, Input } from '@angular/core';
import { Item } from '../../../models/inventory';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrl: './item-checkout.component.scss'
})
export class ItemCheckoutComponent {
  @Input() selectedItem: Item | null = null;
  checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = new FormGroup({
      username: new FormControl('', Validators.required),
      quantity: new FormControl(1)
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value;
      console.log(formData);
    }
  }
}
