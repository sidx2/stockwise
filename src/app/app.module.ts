import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';

import { globalReducer } from './store/global.reducers';
import { categoryReducer } from './main-module/category-module/store/category.reducer';
import { inventoryReducer } from './main-module/inventory-module/store/inventory.reducer';
import { vendorReducer } from './main-module/vendors-module/store/vendor.reducers';
import { employeesReducer } from './main-module/employees-module/store/employees.reducers';

import { globalEffects } from './store/global.effects';
import { CategoryEffects } from './main-module/category-module/store/category.effect';
import { InventoryEffects } from './main-module/inventory-module/store/inventory.effect';
import { EmployeeEffects } from './main-module/employees-module/store/employees.effects';
import { vendorEffects } from './main-module/vendors-module/store/vendor.effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared-module/shared.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthModule } from './auth-module/auth.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './shared-module/interceptors/loaderInterceptor';
import { ErrorInterceptor } from './interceptors/errorInterceptor';

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
    SharedModule,

    SocketIoModule.forRoot(config),

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 3000
    }),

    StoreModule.forRoot({ global: globalReducer, categories: categoryReducer, inventory: inventoryReducer, vendors: vendorReducer, employees: employeesReducer }),

    EffectsModule.forRoot([globalEffects, CategoryEffects, InventoryEffects, vendorEffects, EmployeeEffects]),
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
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

