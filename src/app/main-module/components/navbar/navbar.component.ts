import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  orgName: string = '';
  isSidebarOpen: boolean = false;

  constructor(
    private cookieService: CookieService, 
    private elementRef: ElementRef
  ) {
    this.orgName = cookieService.getOrg().name;
  }

  openSidebar(event: MouseEvent): void {
    this.isSidebarOpen = true;
    event.stopPropagation(); 
  }
  
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.isSidebarOpen) {
      const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
      const button = this.elementRef.nativeElement.querySelector('.menu');

      if (!sidebar.contains(event.target as Node) && event.target !== button) {
        this.closeSidebar();
      }
    }
  }
}
