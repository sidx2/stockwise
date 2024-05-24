import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() formSubmit = new EventEmitter<any>();

  router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  onFormSubmit() {
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      alert("Invalid credentials");
      return;
    };

    this.formSubmit.emit(this.loginForm.value)
  }
}