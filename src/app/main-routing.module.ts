import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors-module/components/Feature-components/vendors/vendors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory-module/inventory-component/Feature-component/inventory/inventory.component';
import { EmployeesComponent } from './employees-module/components/Feature-components/employees/employees.component';
import { TicketComponent } from './ticket-module/ticket-component/Feature-component/ticket/ticket.component';
import { CategoryComponent } from './category-module/category-component/feature-component/category/category.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: DashboardComponent
  },
  {
    path: "employees",
    component: EmployeesComponent
  },
  {
    path: "vendors",
    component: VendorsComponent
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {
    path: "category",
    component: CategoryComponent
  },
  {
    path: "ticket",
    component: TicketComponent
  },
  {
    path:"profile",
    component: ProfileComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
