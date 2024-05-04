import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipsModule } from "primeng/chips"
import { ChipModule } from "primeng/chip"
import { TagModule } from "primeng/tag"
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { CardModule } from "primeng/card"

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StoreModule } from '@ngrx/store';
import { vendorReducer } from './store/vendor.reducers';
import { EffectsModule } from '@ngrx/effects';
import { vendorEffects } from './store/vendor.effects';

@NgModule({
  declarations: [
    VendorsComponent
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    TableModule,
    ChipsModule,
    ChipModule,
    TagModule,
    CardModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    StoreModule.forFeature("vendors", vendorReducer),
    EffectsModule.forFeature([vendorEffects])
  ]
})
export class VendorsModule { }
