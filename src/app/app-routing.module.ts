import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CategoryComponent } from './category-module/category-component/feature-component/category/category.component';
import { InventoryComponent } from './inventory-module/inventory-component/Feature-component/inventory/inventory.component';
import { RouterComponent } from './router/router.component';
import { TicketComponent } from './ticket-module/ticket-component/Feature-component/ticket/ticket.component';
import { TicketAdminComponent } from './ticket-module/ticket-component/Feature-component/ticket-admin/ticket-admin.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RouterComponent
  },
  {
    canActivate: [authGuard],
    path: "auth",

    loadChildren: () => import("./auth-module/auth-routing.module").then(m => m.AuthRoutingModule),
  },
  {
    path: "dashboard",

    loadChildren: () => import("./main-routing.module").then(m => m.MainRoutingModule)
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'ticket',
    component: TicketComponent
  },
  {
    path: "ticketAdmin",
    component: TicketAdminComponent
  },
  {
    path:"profile",
    component: ProfileComponent
  },
  { path: 'vendors', loadChildren: () => import('./vendors-module/vendors.module').then(m => m.VendorsModule) },
  { path: 'employees', loadChildren: () => import('./employees-module/employees.module').then(m => m.EmployeesModule) },
  { path: 'order', loadChildren: () => import('./order-module/order.module').then(m => m.OrderModule) },
  { path: 'history', loadChildren: () => import('./order-history-module/order-history.module').then(m => m.OrderHistoryModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
