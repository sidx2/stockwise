import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipsModule } from "primeng/chips"
import { ChipModule } from "primeng/chip"
import { TagModule } from "primeng/tag"
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './components/Feature-components/vendors/vendors.component';
import { CardModule } from "primeng/card"

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { StoreModule } from '@ngrx/store';
import { vendorReducer } from './store/vendor.reducers';
import { EffectsModule } from '@ngrx/effects';
import { vendorEffects } from './store/vendor.effects';
import { VendorsTableComponent } from './components/UI-components/vendors-table/vendors-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ShareModule } from '../share-module/share.module';
import { AddVendorComponent } from './components/UI-components/add-vendor/add-vendor.component';

@NgModule({
  declarations: [
    VendorsComponent,
    VendorsTableComponent,
    AddVendorComponent
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
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ShareModule,
    MatIconModule,
    MatTooltipModule,
    StoreModule.forFeature("vendors", vendorReducer),
    EffectsModule.forFeature([vendorEffects])
  ]
})
export class VendorsModule { }
