import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared-module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';

import { InventoryComponent } from './components/feature-component/inventory/inventory.component';
import { InventoryTableComponent } from './components/ui-component/inventory-table/inventory-table.component';
import { InventoryFormComponent } from './components/ui-component/inventory-form/inventory-form.component';
import { ItemDetailedViewComponent } from './components/ui-component/item-detailed-view/item-detailed-view.component';
import { ItemCheckoutComponent } from './components/ui-component/item-checkout/item-checkout.component';
import { ItemCheckinComponent } from './components/ui-component/item-checkin/item-checkin.component';
import { ItemLifecycleComponent } from './components/ui-component/item-lifecycle/item-lifecycle.component';

import { ItemFilterPipe } from './pipes/item-filter.pipe';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryFormComponent,
    InventoryTableComponent,
    ItemDetailedViewComponent,
    ItemCheckoutComponent,
    ItemCheckinComponent,
    ItemLifecycleComponent,
    ItemFilterPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    NgxPaginationModule,
    InventoryRoutingModule,
  ]
})

export class InventoryModule { }
