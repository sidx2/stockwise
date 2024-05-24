import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/Feature-components/signup/signup.component';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './store/auth.effects';
import { AuthWrapperComponent } from './components/Feature-components/auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components/Feature-components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthWrapperComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([authEffects])
  ]
})
export class AuthModule { }
