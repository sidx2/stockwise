import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { inventoryReducer } from './inventory-module/store/inventory.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InventoryEffects } from './inventory-module/store/inventory.effect';
import { categoryReducer } from './category-module/store/category.reducer';
import { vendorReducer } from './vendors-module/store/vendor.reducers';
import { employeesReducer } from './employees-module/store/employees.reducers';
import { CategoryEffects } from './category-module/store/category.effect';
import { vendorEffects } from './vendors-module/store/vendor.effects';
import { EmployeeEffects } from './employees-module/store/employees.effects';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardModule } from './dashboard-module/dashboard.module';


@NgModule({
  declarations: [
    MainComponent, 
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    LandingPageComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    SharedModule,
    DashboardModule,
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
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,


    StoreModule.forFeature('inventory', inventoryReducer),
    StoreModule.forFeature('categories', categoryReducer),
    StoreModule.forFeature('vendors', vendorReducer),
    StoreModule.forFeature('employees', employeesReducer),
  
    EffectsModule.forFeature([InventoryEffects, CategoryEffects, vendorEffects, EmployeeEffects])

  ],

})
export class MainModule { }
