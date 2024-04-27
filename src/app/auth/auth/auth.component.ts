import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginUser } from '../../store/global.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(private store: Store<{global: any}>) { }

  handleFormSubmit(e: any) {
      console.log("event", e); 
        this.store.dispatch(loginUser(e));
    }

}
