import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared-module/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardComponent } from './components/feature-component/dashboard/dashboard.component';
import { GoogleChartComponent } from './components/ui-component/google-chart/google-chart.component';
import { dashboardReducer } from './store/dashboard.reducer';
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
    SharedModule,

    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature(DashboardEffects)
  ],
  exports:[

  ],
})
export class DashboardModule { }
