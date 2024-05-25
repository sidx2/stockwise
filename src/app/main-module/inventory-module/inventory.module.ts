import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared-module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemFilterPipe } from './pipes/item-filter.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InventoryComponent } from './components/feature-component/inventory/inventory.component';
import { InventoryTableComponent } from './components/ui-component/inventory-table/inventory-table.component';
import { InventoryHeaderComponent } from './components/ui-component/inventory-header/inventory-header.component';
import { InventoryFormComponent } from './components/feature-component/inventory-form/inventory-form.component';
import { ItemDetailedViewComponent } from './components/ui-component/item-detailed-view/item-detailed-view.component';
import { ItemCheckoutComponent } from './components/ui-component/item-checkout/item-checkout.component';
import { ItemCheckinComponent } from './components/ui-component/item-checkin/item-checkin.component';
import { ItemLifecycleComponent } from './components/ui-component/item-lifecycle/item-lifecycle.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryFormComponent,
    InventoryTableComponent,
    InventoryHeaderComponent,
    ItemFilterPipe,
    ItemDetailedViewComponent,
    ItemCheckoutComponent,
    ItemCheckinComponent,
    ItemLifecycleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule, 
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
