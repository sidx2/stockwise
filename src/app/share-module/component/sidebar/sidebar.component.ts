import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() linkClicked: EventEmitter<void> = new EventEmitter<void>();

  closeSidebar(): void {
    this.linkClicked.emit();
  }
}
