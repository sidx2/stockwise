import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsRoutingModule } from './vendors-routing.module';
import { StoreModule } from '@ngrx/store';
import { vendorReducer } from './store/vendor.reducers';
import { EffectsModule } from '@ngrx/effects';
import { vendorEffects } from './store/vendor.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared-module/shared.module';

import { VendorsComponent } from './components/feature-components/vendors/vendors.component';
import { VendorsTableComponent } from './components/ui-components/vendors-table/vendors-table.component';
import { AddVendorComponent } from './components/ui-components/add-vendor/add-vendor.component';

@NgModule({
  declarations: [
    VendorsComponent,
    VendorsTableComponent,
    AddVendorComponent
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    StoreModule.forFeature("vendors", vendorReducer),
    EffectsModule.forFeature([vendorEffects])
  ]
})
export class VendorsModule { }
