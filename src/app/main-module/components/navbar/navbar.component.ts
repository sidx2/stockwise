import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IGlobalState } from '../../../models/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  globalState$: Observable<IGlobalState>;
  orgName: string = '';
  isSidebarOpen: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private store: Store<{ global: IGlobalState }>, private router: Router, private cs: CookieService, private elementRef: ElementRef) {
    this.globalState$ = this.store.select('global');
  }

  ngOnInit(): void {
   this.globalState$.pipe(takeUntil(this.destroy$)).subscribe((global) => {
      this.orgName = global.org.name;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

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
