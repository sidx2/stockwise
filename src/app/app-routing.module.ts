import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { CategoryComponent } from './category/category-component/feature-component/category/category.component';

const routes: Routes = [
  {
    canActivate: [authGuard],
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./auth/auth-routing.module").then(m => m.AuthRoutingModule),
  },
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./main-routing.module").then(m => m.MainRoutingModule)
  },
  {
    path: 'category',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
