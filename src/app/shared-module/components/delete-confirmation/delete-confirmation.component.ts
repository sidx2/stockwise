import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  @Input() heading: string = 'Confirm Delete';
  @Input() message: string = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancelClick(): void {
    this.cancel.emit();
  }

  onConfirmClick(): void {
    this.confirm.emit();
  }
}
