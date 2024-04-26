import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { VendorsComponent } from './vendors/vendors.component';


const MainRoutes: any = [
    {
      path: "vendors",
      component: VendorsComponent
    }
]
@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    loadChildren: () => import("./auth/auth-routing.module").then(m => m.AuthRoutingModule),
  },
  {
    path: "",
    loadChildren: () => MainRoutingModule
  },
  // {
  //   path: "**",
  //   canActivate: [authGuard],
  //   loadChildren: () => import("./auth/auth-routing.module").then(m => m.AuthRoutingModule),
  // },
  // {
  //   path: "**",
  //   loadChildren: () => MainRoutingModule
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
