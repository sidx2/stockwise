import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/UI-components/login/login.component';
import { AuthComponent } from './components/Feature-components/auth/auth.component';
import { SignupComponent } from './components/UI-components/signup/signup.component';
import { AuthWrapperComponent } from './components/Feature-components/auth-wrapper/auth-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,

    children: [
      {
        path: 'login',
        component: AuthComponent,
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
