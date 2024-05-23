import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/UI-components/login/login.component';
import { AuthComponent } from './components/Feature-components/auth/login.component';
import { SignupComponent } from './components/UI-components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,

    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
