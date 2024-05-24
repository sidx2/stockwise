import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../store/global.selectors';
import { IGlobalState, User } from '../../../models/global';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() linkClicked: EventEmitter<void> = new EventEmitter<void>();
  user!: User;

  constructor(private store: Store<{ global: IGlobalState}>){
    this.store.select(userSelector).subscribe((user)=>{
      this.user = user;
    })
  }

  closeSidebar(): void {
    this.linkClicked.emit();
  }
}
