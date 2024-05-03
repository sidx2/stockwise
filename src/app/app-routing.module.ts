import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { CategoryComponent } from './category-module/category-component/feature-component/category/category.component';
import { InventoryComponent } from './inventory-module/inventory-component/Feature-component/inventory/inventory.component';
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
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  { path: 'vendors', loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
