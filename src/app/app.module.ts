import { APP_INITIALIZER, NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { init } from './store/global.actions';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IGlobalState } from './store/global.reducers';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';

import { categoryReducer } from './main-module/category-module/store/category.reducer';
import { inventoryReducer } from './main-module/inventory-module/store/inventory.reducer';
import { vendorReducer } from './main-module/vendors-module/store/vendor.reducers';
import { globalReducer } from './store/global.reducers';
import { employeesReducer } from './main-module/employees-module/store/employees.reducers';
import { ticketReducer } from './main-module/ticket-module/store/ticket.reducer';

import { globalEffects } from './store/global.effects';
import { CategoryEffects } from './main-module/category-module/store/category.effect';
import { InventoryEffects } from './main-module/inventory-module/store/inventory.effect';
import { EmployeeEffects } from './main-module/employees-module/store/employees.effects';
import { vendorEffects } from './main-module/vendors-module/store/vendor.effects';
import { TicketEffects } from './main-module/ticket-module/store/ticket.effect';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthModule } from './auth-module/auth.module';
import { authInterceptor } from './interceptors/auth.interceptor';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SocketIoModule.forRoot(config),

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 3000
    }),

    StoreModule.forRoot({ global: globalReducer, categories: categoryReducer, inventory: inventoryReducer, vendors: vendorReducer, employees: employeesReducer, tickets: ticketReducer }),
    EffectsModule.forRoot([globalEffects, CategoryEffects, InventoryEffects, vendorEffects, EmployeeEffects, TicketEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
  providers: [
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Actions],
      multi: true
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

export function initializeApp() {
  const store = inject(Store<{ global: IGlobalState }>)
  return () => {
    store.dispatch(init());
  }
}
