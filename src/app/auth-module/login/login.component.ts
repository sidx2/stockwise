import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  onFormSubmit() {
    console.log(this.loginForm.value)
    this.formSubmit.emit(this.loginForm.value)
  }

}
