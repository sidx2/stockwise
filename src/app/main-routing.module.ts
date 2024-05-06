import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors/vendors/vendors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory-module/inventory-component/Feature-component/inventory/inventory.component';
import { EmployeesComponent } from './employees/employees/employees.component';
import { CategoryComponent } from './category-module/category-component/feature-component/category/category.component';

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
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
