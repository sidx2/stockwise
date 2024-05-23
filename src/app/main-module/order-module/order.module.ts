import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/Feature-components/order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './store/order.reducers';
import { EffectsModule } from '@ngrx/effects';
import { orderEffects } from './store/order.effects';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    StoreModule.forFeature("order", orderReducer),
    EffectsModule.forFeature([orderEffects])
  ]
})
export class OrderModule { }
