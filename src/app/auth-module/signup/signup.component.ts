import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Output() myEv = new EventEmitter<any>();
  emitIt() {
    this.myEv.emit("hellowww")
  }
}
