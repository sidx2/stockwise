import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStatusUpdated, Order } from '../../../models/order-history';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order!: Order
  @Input() history!: Order[]

  @Output() statusUpdated = new EventEmitter<IStatusUpdated>();

  editingId: string = "-1"
  m_status!: string

  edit(_id: string) {
    if (_id == "-1") {
      this.editingId = "-1";
      return;
    }
    this.editingId = _id
    this.m_status = this.history.filter((h: Order) => h._id == _id)[0].status;
  }

  onStatusUpdate(updatedStatus: string) {
    this.statusUpdated.emit({ _id: this.editingId, updatedStatus });
    this.edit("-1");
  }
}
