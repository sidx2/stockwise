import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesTableComponent } from './ui/employees-table/employees-table.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employees.effects';
import { employeesReducer } from './store/employees.reducers';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from "primeng/button"
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModule } from '../share-module/share.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    EmployeesTableComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ShareModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    StoreModule.forFeature("employees", employeesReducer),
    EffectsModule.forFeature([EmployeeEffects])
  ]
})
export class EmployeesModule { }
