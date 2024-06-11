import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent {

  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  closeModal(){
    this.closeModalEvent.emit()
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
