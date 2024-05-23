import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateStatus } from '../../../models/ticket.model';

@Component({
  selector: 'app-update-status-form',
  templateUrl: './update-status-form.component.html',
  styleUrls: ['./update-status-form.component.scss']
})
export class UpdateStatusFormComponent {

  @Output() updateStatusEmmiter: EventEmitter<UpdateStatus> = new EventEmitter();

  updateStatusFormGroup: FormGroup;

  constructor() {
    this.updateStatusFormGroup = new FormGroup({
      status: new FormControl('', Validators.required),
      remark: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.updateStatusFormGroup.valid) {
      const formData = this.updateStatusFormGroup.value;
      this.updateStatusEmmiter.emit(formData);
    }
  }
}
