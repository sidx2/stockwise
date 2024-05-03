import { APP_INITIALIZER, NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CategoryModule } from './category-module/category.module';
import { ButtonModule } from "primeng/button"
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

import {MatIconModule} from '@angular/material/icon';
import { AuthModule } from './auth/auth.module';  
import { Store, StoreModule } from '@ngrx/store';
import { globalReducer } from './store/global.reducers';
import { Actions, EffectsModule } from '@ngrx/effects';
import { globalEffects } from './store/global.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { init } from './store/global.actions';
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
    StoreModule.forRoot({ global: globalReducer, categories: categoryReducer, inventory: inventoryReducer, vendors: vendorReducer }),
    ShareModule,
    EffectsModule.forRoot([globalEffects,CategoryEffects, InventoryEffects, vendorEffects]),
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
