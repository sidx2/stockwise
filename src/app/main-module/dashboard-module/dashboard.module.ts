import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared-module/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleChartComponent } from './components/google-chart/google-chart.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './store/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';

@NgModule({
  declarations: [
    DashboardComponent, 
    GoogleChartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    DashboardRoutingModule,

    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature(DashboardEffects)
  ],
  exports:[

  ],
})
export class DashboardModule { }
