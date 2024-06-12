import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStatusUpdated, Order } from '../../../models/order-history';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() history!: Order[];

  @Output() statusUpdated = new EventEmitter<IStatusUpdated>();
  @Output() deleteOrder = new EventEmitter<string>();

  editingId: string = "-1";
  m_status!: string;

  edit(_id: string, status: string) {
    if (_id == "-1") {
      this.editingId = "-1";
      return;
    }
    this.editingId = _id;
    this.m_status = status;
  }

  onDelete(_id: string) {
    this.deleteOrder.emit(_id);
  }

  onStatusUpdate(updatedStatus: string) {
    this.statusUpdated.emit({ _id: this.editingId, updatedStatus });
    this.edit("-1", "");
  }
}
