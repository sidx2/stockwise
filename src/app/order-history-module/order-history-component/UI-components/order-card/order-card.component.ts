import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() order: any
  @Input() history: any

  @Output() statusUpdated = new EventEmitter<any>();

  editing = -1
  m_status!:any

  edit(_id:any) {
    if (_id == -1) {
      this.editing = -1;
      return;
    }
    this.editing = _id
    this.m_status = this.history.filter((h:any) => h._id == _id)[0].status
  }

  onStatusUpdate(updatedStatus: any) {
    this.statusUpdated.emit({orderId: this.editing, updatedStatus });
    this.edit(-1);
  }
}
