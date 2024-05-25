import { Component, Input } from '@angular/core';
import { Item } from '../../../../inventory-module/models/inventory';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrl: './asset-details.component.scss'
})
export class AssetDetailsComponent{
   @Input() selectedItem: Item | null = null;
  noItemImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTuSpR_FwEIFFf0C8vSnQ4kMVW7KO4iNdYgjdUok3Ew&s';
}
