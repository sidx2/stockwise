import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { TicketComponent } from './ticket-module/ticket-component/Feature-component/ticket/ticket.component';
import { TicketAdminComponent } from './ticket-module/ticket-component/Feature-component/ticket-admin/ticket-admin.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'category',
        loadChildren: () => import("./category-module/category.module").then(m => m.CategoryModule),
      },
      {
        path: 'inventory',
        loadChildren: () => import("./inventory-module/inventory.module").then(m => m.InventoryModule),
      },
      {
        path: 'ticket',
        component: TicketComponent
      },
      {
        path: 'ticketAdmin',
        component: TicketAdminComponent
      },
      {
        path: 'vendors',
        loadChildren: () => import('./vendors-module/vendors.module').then(m => m.VendorsModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees-module/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order-module/order.module').then(m => m.OrderModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./order-history-module/order-history.module').then(m => m.OrderHistoryModule)
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }