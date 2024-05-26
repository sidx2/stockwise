import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/feature-components/order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './store/order.reducers';
import { EffectsModule } from '@ngrx/effects';
import { orderEffects } from './store/order.effects';
import { SharedModule } from '../../shared-module/shared.module';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    StoreModule.forFeature("order", orderReducer),
    EffectsModule.forFeature([orderEffects])
  ]
})
export class OrderModule { }
