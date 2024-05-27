import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CheckoutMailDetails, Item } from '../../../models/inventory';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutDetails } from '../../../models/inventory';
import { CheckoutEventData } from '../../../models/inventory';
import { Employee } from '../../../../employees-module/models/employee';

@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrls: ['./item-checkout.component.scss']
})
export class ItemCheckoutComponent {
  @Input() selectedItem: Item | null = null;
  @Input() employees: Employee[] | null = [];

  @Output() checkoutEmitter: EventEmitter<CheckoutEventData> = new EventEmitter();

  checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = new FormGroup({
      quantity: new FormControl(1, Validators.required),
      employee: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid && this.selectedItem) {
      const formData = this.checkoutForm.value;

      const assignedToDetails: CheckoutDetails = {
        itemId: this.selectedItem._id,
        assignedTo: {
          userId: formData.employee._id,
          userName: formData.employee.name,
          quantity: formData.quantity
        }
      }
      
      const checkoutMailDetails: CheckoutMailDetails = {
        userEmail: formData.employee.email,
        messageContent: `You've been assigned a new asset: ${this.selectedItem?.name}. Please visit your profile to view the details of the new asset.`,
        itemImage: this.selectedItem.itemImage || '',
        subject: 'Asset Checkout Completed',
        orgName: ''
      }

      console.log("AssignedTo", assignedToDetails, "checkoutMailDetails", checkoutMailDetails);
      this.checkoutEmitter.emit({ assignedToDetails, checkoutMailDetails });

      this.checkoutForm.reset();
    } else {
      console.log('Form is not valid');
    }
  }
}
