import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../models/inventory';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../../../employees/store/employees.reducers';
import { AssignedTo, CheckoutDetails } from '../../../models/inventory';

@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrls: ['./item-checkout.component.scss']
})
export class ItemCheckoutComponent {
  @Input() selectedItem: Item | null = null;
  @Input() employees: Employee[] | null = [];

  @Output() checkoutEmmiter: EventEmitter<CheckoutDetails> = new EventEmitter()
  checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = new FormGroup({
      quantity: new FormControl(1, Validators.required),
      employee: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value;

      const assignedToDetails: CheckoutDetails = {
        itemId: this.selectedItem?._id,
        assignedTo: {
          userId: formData.employee._id,
          userName: formData.employee.name,
          quantity: formData.quantity
        }
      }

      console.log("AssignedTo", assignedToDetails);
      this.checkoutEmmiter.emit(assignedToDetails)
    
      } else {
        console.log('Form is not valid');
    }
  }
}
