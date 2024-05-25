import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Item, CheckinDetails } from '../../../models/inventory';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-checkin',
  templateUrl: './item-checkin.component.html',
  styleUrls: ['./item-checkin.component.scss']
})
export class ItemCheckinComponent implements OnInit {
  @Input() selectedItem: Item | null = null;
  @Output() checkinEmmiter: EventEmitter<CheckinDetails> = new EventEmitter()


  checkinFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.checkinFormGroup = new FormGroup({
      selectedEmployee: new FormControl('', this.selectedItem?.identificationType === 'non-unique' ? Validators.required : null),
      quantity: new FormControl('', this.selectedItem?.identificationType === 'non-unique' ? Validators.required : null)
    });
  }

  onSubmit() {
    console.log(this.checkinFormGroup.value);
    let checkInData: CheckinDetails;

    if (this.selectedItem && this.selectedItem.identificationType === 'unique') {
      checkInData = {
        itemId: String(this.selectedItem._id),
        quantity: 1,
        userId: String(this.selectedItem.assignedTo[0]?.userId) 
      };
    } else {
      const formData = this.checkinFormGroup.value;
      checkInData = {
        itemId: this.selectedItem?._id || '',
        quantity: +formData?.quantity,
        userId: formData?.selectedEmployee?.userId || ''
      };
    }

    this.checkinEmmiter.emit(checkInData);

  }
}
