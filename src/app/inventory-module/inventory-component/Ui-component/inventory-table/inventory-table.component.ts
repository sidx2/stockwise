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
  @Output() updateItemEmmiter: EventEmitter<Item> = new EventEmitter()
  
  deleteItemHandler(itemId: string | undefined){
    if(itemId){
      this.deleteItemEmmiter.emit(itemId);
    }
  }

  updateItemHandler(selectedItem: Item){
    console.log("selected item inside table", selectedItem);
    this.updateItemEmmiter.emit(selectedItem);
  }
}
