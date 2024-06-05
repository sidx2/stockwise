import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})

export class ChangePasswordComponent {
  @Output() changePasswordEmmiter : EventEmitter<{currPassword: string, newPassword: string}> = new EventEmitter();
  currPassword: string = ''
  newPassword: string = ''

  onSubmit(){
    this.changePasswordEmmiter.emit({currPassword: this.currPassword, newPassword: this.newPassword});
  }
}
