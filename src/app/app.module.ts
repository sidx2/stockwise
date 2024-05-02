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
import { InventoryModule } from './inventory/inventory.module';
import { categoryReducer } from './category/store/category.reducer';
import { CategoryEffects } from './category/store/category.effect';
import { inventoryReducer } from './inventory/store/inventory.reducer';
import { InventoryEffects } from './inventory/store/inventory.effect';


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
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
