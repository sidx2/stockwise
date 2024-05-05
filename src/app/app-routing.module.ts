import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { RouterComponent } from './router/router.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RouterComponent
  },
  {
    canActivate: [authGuard],
    path: "auth",
    
    loadChildren: () => import("./auth/auth-routing.module").then(m => m.AuthRoutingModule),
  },  
  {
    path: "dashboard",

    loadChildren: () => import("./main-routing.module").then(m => m.MainRoutingModule)
  },
  { path: 'vendors', loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule) },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
