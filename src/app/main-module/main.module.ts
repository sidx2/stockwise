import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { SharedModule } from '../shared-module/shared.module';
import { InventoryModule } from './inventory-module/inventory.module';
import { CategoryModule } from './category-module/category.module';
import { OrderModule } from './order-module/order.module';
import { OrderHistoryModule } from './order-history-module/order-history.module';
import { TicketModule } from './ticket-module/ticket.module';
import { EmployeesModule } from './employees-module/employees.module';
import { TicketAdminModule } from './ticket-admin-module/ticket-admin.module';
import { StoreModule } from '@ngrx/store';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';


@NgModule({
  declarations: [
    MainComponent, 
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    InventoryModule,
    CategoryModule,
    OrderModule,
    OrderHistoryModule,
    TicketModule,
    TicketAdminModule,
    EmployeesModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
})
export class MainModule { }
