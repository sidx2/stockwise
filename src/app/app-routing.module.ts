import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RouterComponent } from './router/router.component';
import { loggedOutGuard } from './guards/logged-out-guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    canActivate: [loggedOutGuard],
    path: "auth",
    loadChildren: () => import("./auth-module/auth.module").then(m => m.AuthModule),
  },
  {
    canActivate: [authGuard],
    path: '',
    loadChildren: () => import('./main-module/main.module').then(m => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
