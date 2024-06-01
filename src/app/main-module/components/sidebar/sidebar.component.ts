import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/global';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() linkClicked: EventEmitter<void> = new EventEmitter<void>();
  user!: User;

  constructor(private cookieService: CookieService){
    this.user = cookieService.getUser();
    console.log("user is sidebar: ", this.user);
  }

  closeSidebar(): void {
    this.linkClicked.emit();
  }
}
