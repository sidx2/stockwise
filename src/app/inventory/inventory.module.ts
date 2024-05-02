import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InventoryEffects } from './store/inventory.effect';
import { InventoryComponent } from './inventory-component/Feature-component/inventory/inventory.component';
import { inventoryReducer } from './store/inventory.reducer';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryTableComponent } from './inventory-component/Ui-component/inventory-table/inventory-table.component';
import { InventoryHeaderComponent } from './inventory-component/Ui-component/inventory-header/inventory-header.component';
import { InventoryFormComponent } from './inventory-component/Feature-component/inventory-form/inventory-form.component';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryFormComponent,
    InventoryTableComponent,
    InventoryHeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InventoryModule { }