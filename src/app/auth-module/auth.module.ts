import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/feature-components/signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './store/auth.effects';
import { AuthWrapperComponent } from './components/feature-components/auth-wrapper/auth-wrapper.component';
import { LoginComponent } from './components/feature-components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthWrapperComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([authEffects])
  ]
})
export class AuthModule { }
