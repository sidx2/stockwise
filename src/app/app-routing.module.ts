import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    canActivate: [authGuard],
    loadChildren: () => import("./auth/auth-routing.module").then(m => m.AuthRoutingModule),
  },
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./main-routing.module").then(m => m.MainRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
