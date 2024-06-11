import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Output() changePasswordEmitter: EventEmitter<{ currPassword: string, newPassword: string }> = new EventEmitter();

  changePasswordFormGroup: FormGroup = new FormGroup({});

  constructor() {
    this.changePasswordFormGroup = new FormGroup({
      currPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.changePasswordFormGroup.valid) {
      const formData = this.changePasswordFormGroup.value;
      this.changePasswordEmitter.emit(formData);
    }
  }
}
