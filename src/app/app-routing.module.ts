import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RouterComponent } from './router/router.component';
import { loggedOutGuard } from './guards/logged-out-guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: RouterComponent
  },
  {
    canActivate: [loggedOutGuard],
    path: "",
    loadChildren: () => import("./auth-module/auth-routing.module").then(m => m.AuthRoutingModule),
  },
  {
    canActivate: [authGuard],
    path: '',
    loadChildren: () => import('./authenticated.module').then(m => m.AuthenticatedModule),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
