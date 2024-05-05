import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ticket } from '../../../models/ticket.model';
import { UserAsset } from '../../../../inventory-module/models/inventory';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  @Output() createTicketEmitter: EventEmitter<Ticket> = new EventEmitter();
  @Input() userAssets: UserAsset[] | null = null;

  ticketFormGroup: FormGroup = new FormGroup({});
  assetIdControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.ticketFormGroup = new FormGroup({
      issueType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      assetId: this.assetIdControl 
    });

    // Listen to changes in the 'issueType' control
    this.ticketFormGroup.get('issueType')?.valueChanges.subscribe((issueType: string) => {
      if (issueType === 'newAssetRequest') {
        this.assetIdControl.clearValidators();
      } else {
        this.assetIdControl.setValidators(Validators.required);
      }
      this.assetIdControl.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    const formData: Ticket = this.ticketFormGroup.value; 
    this.createTicketEmitter.emit({...formData, status:'open'});
  }
}
