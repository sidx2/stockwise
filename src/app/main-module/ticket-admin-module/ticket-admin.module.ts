import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketAdminCardComponent } from './components/Ui-component/ticket-admin-card/ticket-admin-card.component';
import { UpdateStatusFormComponent } from './components/Ui-component/update-status-form/update-status-form.component';
import { TicketAdminComponent } from './components/Feature-component/ticket-admin/ticket-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared-module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { ticketAdminReducer } from './store/ticket-admin.reducer';
import { TicketAdminEffects } from './store/ticket-admin.effect';
import { EffectsModule } from '@ngrx/effects';
import { TicketAdminRoutingModule } from './ticket-admin-routing.module';
import { TicketAdminHeaderComponent } from './components/Ui-component/ticket-admin-header/ticket-admin-header.component';

@NgModule({
  declarations: [
    TicketAdminComponent,
    TicketAdminCardComponent,
    UpdateStatusFormComponent,
    TicketAdminHeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TicketAdminRoutingModule,
    StoreModule.forFeature('ticketsAdmin', ticketAdminReducer ),
    EffectsModule.forFeature(TicketAdminEffects)
  ]
})
export class TicketAdminModule { }
