import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/Feature-components/signup/signup.component';
import { AuthWrapperComponent } from './components/Feature-components/auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components/Feature-components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,

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
