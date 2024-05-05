import { Component, Input } from '@angular/core';
import { Item } from '../../../models/inventory';

@Component({
  selector: 'app-item-lifecycle',
  templateUrl: './item-lifecycle.component.html',
  styleUrl: './item-lifecycle.component.scss'
})
export class ItemLifecycleComponent {
  @Input() selectedItem: Item | null  = null
}
