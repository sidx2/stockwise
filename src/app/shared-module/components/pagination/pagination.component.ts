import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
