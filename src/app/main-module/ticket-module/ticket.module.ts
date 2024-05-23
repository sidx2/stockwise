import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './components/Feature-component/ticket/ticket.component';
import { TicketCardComponent } from './components/Ui-component/ticket-card/ticket-card.component';
import { TicketHeaderComponent } from './components/Ui-component/ticket-header/ticket-header.component';
import { ShareModule } from '../share-module/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TicketFormComponent } from './components/Feature-component/ticket-form/ticket-form.component';
import { FormsModule } from '@angular/forms';
import { TicketAdminComponent } from './components/Feature-component/ticket-admin/ticket-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateStatusFormComponent } from './components/Ui-component/update-status-form/update-status-form.component';
import { StoreModule } from '@ngrx/store';
import { ticketReducer } from './store/ticket.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './store/ticket.effect';

@NgModule({
  declarations: [
    TicketComponent,
    TicketCardComponent,
    TicketHeaderComponent,
    TicketFormComponent,
    TicketAdminComponent,
    UpdateStatusFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    StoreModule.forFeature('tickets', ticketReducer),
    EffectsModule.forFeature(TicketEffects)
  ]

})
export class TicketModule { }
