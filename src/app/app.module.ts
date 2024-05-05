import { APP_INITIALIZER, NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CategoryModule } from './category-module/category.module';
import { ButtonModule } from "primeng/button"
import { AuthModule } from './auth/auth.module';
import { VendorsComponent } from './vendors/vendors.component';
import { StoreModule } from '@ngrx/store';
import { globalReducer } from './store/global.reducers';
import { EffectsModule } from '@ngrx/effects';
// import { authEffect } from './store/global.effects';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShareModule } from './share-module/share.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { InventoryModule } from './inventory-module/inventory.module';
import { categoryReducer } from './category-module/store/category.reducer';
import { CategoryEffects } from './category-module/store/category.effect';
import { inventoryReducer } from './inventory-module/store/inventory.reducer';
import { InventoryEffects } from './inventory-module/store/inventory.effect';
import { vendorReducer } from './vendors/store/vendor.reducers';
import { vendorEffects } from './vendors/store/vendor.effects';

import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { globalEffects } from './store/global.effects';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { init } from './store/global.actions';
import { authInterceptor } from './auth.interceptor';
import { RouterComponent } from './router/router.component';
import { LoaderInterceptor } from './share-module/interceptors/loaderInterceptor';
import { EmployeesModule } from './employees/employees.module';
import { employeesReducer } from './employees/store/employees.reducers';
import { EmployeeEffects } from './employees/store/employees.effects';
import { NavbarComponent } from './share-module/component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorsComponent,
    DashboardComponent,
    NavbarComponent,
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
    HttpClientModule,
    StoreModule.forRoot({global: globalReducer}),
    // EffectsModule.forRoot([authEffect]),
    StoreModule.forRoot({ global: globalReducer }),
    CategoryModule,
    InventoryModule,
    EmployeesModule,
    MatIconModule,
    StoreModule.forRoot({ global: globalReducer, categories: categoryReducer, inventory: inventoryReducer, vendors: vendorReducer, employees: employeesReducer}),
    ShareModule,
    EffectsModule.forRoot([globalEffects]),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([globalEffects, CategoryEffects, InventoryEffects, vendorEffects, EmployeeEffects]),
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
