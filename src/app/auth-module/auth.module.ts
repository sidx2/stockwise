import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/UI-components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthComponent } from './components/Feature-components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/UI-components/signup/signup.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './store/auth.effects';
import { AuthWrapperComponent } from './components/Feature-components/auth-wrapper/auth-wrapper.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SignupComponent,
    AuthWrapperComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([authEffects])
  ]
})
export class AuthModule { }
