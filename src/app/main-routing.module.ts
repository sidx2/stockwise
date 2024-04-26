import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors/vendors.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "vendors"
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
