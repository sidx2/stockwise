import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  orgName: string = '';
  isLoggedIn!: boolean;
  isSidebarOpen: boolean = false;

  constructor(
    private cookieService: CookieService, 
    private elementRef: ElementRef
  ) {
    this.orgName = JSON.parse(this.cookieService.get("org")!).name;
    this.isLoggedIn = Boolean(this.cookieService.get("isLoggedIn"));

    console.log("orgname and isLoggedin in navbar: ", this.orgName, this.isLoggedIn);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  toggleSidebar(event: MouseEvent): void {
    console.log("Toggling sidebar...");
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log("isSidebarOpen", this.isSidebarOpen);
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
