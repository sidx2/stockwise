import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors/vendors.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: DashboardComponent
  },
  {
    path: "vendors",
    component: VendorsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
