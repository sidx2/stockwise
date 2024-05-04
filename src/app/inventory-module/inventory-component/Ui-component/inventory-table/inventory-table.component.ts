import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../models/inventory';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss'
})

export class InventoryTableComponent {
  @Input() items: Item[] | null = []
  @Input() identificationType: string | undefined = undefined;

  @Output() deleteItemEmmiter:EventEmitter<string> = new EventEmitter();
  @Output() updateItemEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() detailedViewEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() checkoutEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() checkinEmmiter: EventEmitter<Item> = new EventEmitter();
  @Output() lifecycleEmmiter: EventEmitter<Item> = new EventEmitter();
 
  
  deleteItemHandler(itemId: string | undefined){
    if(itemId){
      this.deleteItemEmmiter.emit(itemId);
    }
  }

  updateItemHandler(selectedItem: Item){
    this.updateItemEmmiter.emit(selectedItem);
  }

  showDetailedViewHandler(selectedItem: Item){
    this.detailedViewEmmiter.emit(selectedItem);
  }

  checkoutItemHandler(selectedItem: Item){
    this.checkoutEmmiter.emit(selectedItem);
  }

  checkinItemHandler(selectedItem: Item){
    this.checkinEmmiter.emit(selectedItem);
  }

  showLifecycleHandler(selectedItem: Item){
    this.lifecycleEmmiter.emit(selectedItem)
  }
}
