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

  ngOnInit(): void {
    this.ticketFormGroup = new FormGroup({
      issueType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
    });

    this.ticketFormGroup.get('issueType')?.valueChanges.subscribe((issueType: string) => {
      if (issueType && issueType !== 'newAssetRequest') {
        this.ticketFormGroup.addControl('assetId', new FormControl('', Validators.required));
      }else{
        this.ticketFormGroup.removeControl('assetId');
      }
    });
  }

  onSubmit(): void {
    const formData: Ticket = this.ticketFormGroup.value; 
    this.createTicketEmitter.emit({...formData, status:'open'});
  }
}
