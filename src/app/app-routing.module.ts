import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ErrorPageComponent } from './shared-module/components/error-page/error-page.component';

const routes: Routes = [
  {
    canActivate: [authGuard],
    path: '',
    loadChildren: () => import('./main-module/main.module').then(m => m.MainModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule),
  },
  {
    path: '**', 
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
