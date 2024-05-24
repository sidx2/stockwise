import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../Feature-components/order-history/order-history.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order!: Order
  @Input() history!: Order[]

  @Output() statusUpdated = new EventEmitter<any>();

  editing = "-1"
  m_status!:string

  edit(_id:string) {
    if (_id == "-1") {
      this.editing = "-1";
      return;
    }
    this.editing = _id
    this.m_status = this.history.filter((h:Order) => h._id == _id)[0].status;
  }

  onStatusUpdate(updatedStatus: string) {
    this.statusUpdated.emit({orderId: this.editing, updatedStatus });
    this.edit("-1");
  }
}
