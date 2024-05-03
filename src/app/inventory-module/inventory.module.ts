import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponent } from './inventory-component/Feature-component/inventory/inventory.component';
import { ShareModule } from '../share-module/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryTableComponent } from './inventory-component/Ui-component/inventory-table/inventory-table.component';
import { InventoryHeaderComponent } from './inventory-component/Ui-component/inventory-header/inventory-header.component';
import { InventoryFormComponent } from './inventory-component/Feature-component/inventory-form/inventory-form.component';
import { ItemFilterPipe } from './pipes/item-filter.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryFormComponent,
    InventoryTableComponent,
    InventoryHeaderComponent,
    ItemFilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShareModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ]
})
export class InventoryModule { }
