import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketAdminComponent } from './components/Feature-component/ticket-admin/ticket-admin.component';

const routes: Routes = [{ path: '', component: TicketAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketAdminRoutingModule { }
