import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from "primeng/button"
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth/auth.component';
import { VendorsComponent } from './vendors/vendors.component';
import { StoreModule } from '@ngrx/store';
import { globalReducer } from './store/global.reducers';

@NgModule({
  declarations: [
    AppComponent,
    VendorsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    AuthModule,
    StoreModule.forRoot({global: globalReducer})
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
