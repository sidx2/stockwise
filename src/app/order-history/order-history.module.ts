import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';
import { StoreModule } from '@ngrx/store';
import { historyReducer } from './store/order-history.reducers';
import { EffectsModule } from '@ngrx/effects';
import { historyEffects } from './store/order-history.effects';
import { ShareModule } from '../share-module/share.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    MatIconModule,
    ShareModule,
    FormsModule,
    StoreModule.forFeature("history", historyReducer),
    EffectsModule.forFeature([historyEffects])
  ]
})
export class OrderHistoryModule { }
