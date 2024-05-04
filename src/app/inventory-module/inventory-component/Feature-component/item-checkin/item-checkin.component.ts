import { Component, Input } from '@angular/core';
import { Item } from '../../../models/inventory';

@Component({
  selector: 'app-item-checkin',
  templateUrl: './item-checkin.component.html',
  styleUrl: './item-checkin.component.scss'
})
export class ItemCheckinComponent {
  @Input() selectedItem: Item | null = null;
}
