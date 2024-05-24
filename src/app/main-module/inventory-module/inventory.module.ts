import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponent } from './components/Feature-component/inventory/inventory.component';
import { SharedModule } from '../../shared-module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryTableComponent } from './components/Ui-component/inventory-table/inventory-table.component';
import { InventoryHeaderComponent } from './components/Ui-component/inventory-header/inventory-header.component';
import { InventoryFormComponent } from './components/Feature-component/inventory-form/inventory-form.component';
import { ItemFilterPipe } from './pipes/item-filter.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemDetailedViewComponent } from './components/Ui-component/item-detailed-view/item-detailed-view.component';
import { ItemCheckoutComponent } from './components/Ui-component/item-checkout/item-checkout.component';
import { ItemCheckinComponent } from './components/Ui-component/item-checkin/item-checkin.component';
import { ItemLifecycleComponent } from './components/Ui-component/item-lifecycle/item-lifecycle.component';
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
