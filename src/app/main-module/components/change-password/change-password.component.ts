import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})

export class ChangePasswordComponent {
  @Output() changePasswordEmmiter : EventEmitter<string> = new EventEmitter();
  password: string = ''

  onSubmit(){
    console.log("changed password", this.password)
    this.changePasswordEmmiter.emit(this.password);
  }
}
