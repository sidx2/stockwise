import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AdminGuard } from './admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path:'',
        canActivate: [AdminGuard],
        // canActivateChild: [AuthGuard],
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
            path: 'ticketAdmin',
            loadChildren: () => import("./ticket-admin-module/ticket-admin.module").then(m => m.TicketAdminModule),
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
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: 'ticket',
        loadChildren: () => import("./ticket-module/ticket.module").then(m => m.TicketModule),
      },
      {
        path: 'landingPage',
        component: LandingPageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }