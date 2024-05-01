import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CategoryModule } from './category/category.module';
import { ButtonModule } from "primeng/button"
import { AuthModule } from './auth/auth.module';
import { ShareModule } from './share/share.module';
import { AuthComponent } from './auth/auth/auth.component';
import { VendorsComponent } from './vendors/vendors.component';
import { StoreModule } from '@ngrx/store';
import { globalReducer } from './store/global.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';


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
    StoreModule.forRoot({ global: globalReducer }),
    CategoryModule,
    ShareModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
