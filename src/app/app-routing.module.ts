import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CategoryComponent } from './category-module/category-component/feature-component/category/category.component';
import { InventoryComponent } from './inventory-module/inventory-component/Feature-component/inventory/inventory.component';
import { RouterComponent } from './router/router.component';
import { TicketComponent } from './ticket-module/ticket-component/Feature-component/ticket/ticket.component';
import { TicketAdminComponent } from './ticket-module/ticket-component/Feature-component/ticket-admin/ticket-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loggedOutGuard } from './guards/logged-out-guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RouterComponent
  },
  {
    canActivate: [loggedOutGuard],
    path: "auth",
    loadChildren: () => import("./auth-module/auth-routing.module").then(m => m.AuthRoutingModule),
  },
  {
    canActivate: [authGuard],
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    canActivate: [authGuard],
    path: 'category',
    component: CategoryComponent
  },
  {
    canActivate: [authGuard],
    path: 'inventory',
    component: InventoryComponent
  },
  {
    canActivate: [authGuard],
    path: 'ticket',
    component: TicketComponent
  },
  {
    canActivate: [authGuard],
    path: "ticketAdmin",
    component: TicketAdminComponent
  },
  {
    canActivate: [authGuard],
    path: 'vendors',
    loadChildren: () => import('./vendors-module/vendors.module').then(m => m.VendorsModule)
  },
  {
    canActivate: [authGuard],
    path: 'employees',
    loadChildren: () => import('./employees-module/employees.module').then(m => m.EmployeesModule)
  },
  {
    canActivate: [authGuard],
    path: 'order',
    loadChildren: () => import('./order-module/order.module').then(m => m.OrderModule)
  },
  {
    canActivate: [authGuard],
    path: 'history',
    loadChildren: () => import('./order-history-module/order-history.module').then(m => m.OrderHistoryModule)
  },
  { 
    canActivate: [authGuard],
    path:"profile",
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
