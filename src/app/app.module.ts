import { APP_INITIALIZER, NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from "primeng/button"
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { ShareModule } from './share-module/share.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category-module/category.module';
import { InventoryModule } from './inventory-module/inventory.module';
import { EmployeesModule } from './employees/employees.module';
import { TicketModule } from './ticket-module/ticket.module';

import { AppComponent } from './app.component';
import { RouterComponent } from './router/router.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { categoryReducer } from './category-module/store/category.reducer';
import { inventoryReducer } from './inventory-module/store/inventory.reducer';
import { vendorReducer } from './vendors/store/vendor.reducers';
import { globalReducer } from './store/global.reducers';
import { employeesReducer } from './employees/store/employees.reducers';

import { globalEffects } from './store/global.effects';
import { CategoryEffects } from './category-module/store/category.effect';
import { InventoryEffects } from './inventory-module/store/inventory.effect';
import { EmployeeEffects } from './employees/store/employees.effects';
import { vendorEffects } from './vendors/store/vendor.effects';

import { Store, StoreModule } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';

import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { init } from './store/global.actions';
import { authInterceptor } from './auth.interceptor';
import { LoaderInterceptor } from './share-module/interceptors/loaderInterceptor';

import { ticketReducer } from './ticket-module/store/ticket.reducer';
import { TicketEffects } from './ticket-module/store/ticket.effect';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RouterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    AuthModule,
    
    CategoryModule,
    InventoryModule,
    TicketModule,
    EmployeesModule,

    MatIconModule,
    MatCardModule,
    MatListModule,
    ShareModule,

    StoreModule.forRoot({ global: globalReducer, categories: categoryReducer, inventory: inventoryReducer, vendors: vendorReducer, employees: employeesReducer, tickets: ticketReducer}),
    ShareModule,
    EffectsModule.forRoot([globalEffects, CategoryEffects, InventoryEffects, vendorEffects, EmployeeEffects, TicketEffects]),
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
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Actions],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptors([authInterceptor,]))
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

export function initializeApp() {
  const store = inject(Store<{ global: any }>)
  return () => {
    store.dispatch(init());
  }
}
