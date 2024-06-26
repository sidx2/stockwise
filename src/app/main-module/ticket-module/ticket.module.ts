import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './components/feature-component/ticket/ticket.component';
import { TicketCardComponent } from './components/ui-component/ticket-card/ticket-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TicketFormComponent } from './components/ui-component/ticket-form/ticket-form.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { ticketReducer } from './store/ticket.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './store/ticket.effect';
import { SharedModule } from '../../shared-module/shared.module';
import { TicketRoutingModule } from './ticket-routing.module';

@NgModule({
  declarations: [
    TicketComponent,
    TicketCardComponent,
    TicketFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    TicketRoutingModule,
    StoreModule.forFeature('tickets', ticketReducer),
    EffectsModule.forFeature(TicketEffects)
  ]

})
export class TicketModule { }
