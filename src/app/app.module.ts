import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from "primeng/button"
import { AuthModule } from './auth/auth.module';  
import { Store, StoreModule } from '@ngrx/store';
import { globalReducer } from './store/global.reducers';
import { Actions, EffectsModule } from '@ngrx/effects';
import { globalEffects } from './store/global.effects';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { fetchOrg, init } from './store/global.actions';
import { authInterceptor } from './auth.interceptor';
import { RouterComponent } from './router/router.component';
import { EmployeesModule } from './employees/employees.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RouterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    AuthModule,
    EmployeesModule,
    HttpClientModule,
    StoreModule.forRoot({global: globalReducer}),
    EffectsModule.forRoot([globalEffects])
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Actions],
      multi: true
    },
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initializeApp() {
  const store = inject( Store<{ global: any }>)
  return () => {

    store.dispatch(init());
  }
}
