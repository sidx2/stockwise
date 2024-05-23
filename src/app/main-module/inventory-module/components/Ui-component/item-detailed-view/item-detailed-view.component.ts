import { Component, Input } from '@angular/core';
import { Item } from '../../../models/inventory';

@Component({
  selector: 'app-item-detailed-view',
  templateUrl: './item-detailed-view.component.html',
  styleUrl: './item-detailed-view.component.scss'
})

export class ItemDetailedViewComponent {

  @Input() selectedItem: Item | null = null;

  handleImageError() {
    console.log('Image loading failed.');
    const imgElement = document.querySelector('.image') as HTMLImageElement;
    imgElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTuSpR_FwEIFFf0C8vSnQ4kMVW7KO4iNdYgjdUok3Ew&s';
  }

}
