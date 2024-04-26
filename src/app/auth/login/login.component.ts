import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface m_T {
  email: string,
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() formSubmit = new EventEmitter<any>();
    loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })

    onSubmit() {
      console.log(this.loginForm.value)
      this.formSubmit.emit(this.loginForm.value)
    }
}
