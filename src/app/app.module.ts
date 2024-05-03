import { APP_INITIALIZER, NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CategoryModule } from './category/category.module';
import { ButtonModule } from "primeng/button"
import { ShareModule } from './share/share.module';
import { AuthComponent } from './auth/auth/auth.component';
import { VendorsComponent } from './vendors/vendors.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { InventoryModule } from './inventory/inventory.module';
import { categoryReducer } from './category/store/category.reducer';
import { CategoryEffects } from './category/store/category.effect';
import { inventoryReducer } from './inventory/store/inventory.reducer';
import { InventoryEffects } from './inventory/store/inventory.effect';

import {MatIconModule} from '@angular/material/icon';
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
    CategoryModule,
    InventoryModule,
    StoreModule.forRoot({ global: globalReducer, categories: categoryReducer, inventory: inventoryReducer }),
    ShareModule,
    EffectsModule.forRoot([CategoryEffects, InventoryEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),

    MatIconModule,
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
  bootstrap: [AppComponent],

})
export class AppModule { }

export function initializeApp() {
  const store = inject( Store<{ global: any }>)
  return () => {

    store.dispatch(init());
  }
}
