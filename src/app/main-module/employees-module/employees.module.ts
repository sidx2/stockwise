import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesTableComponent } from './components/UI-components/employees-table/employees-table.component';
import { EmployeesComponent } from './components/Feature-components/employees/employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employees.effects';
import { employeesReducer } from './store/employees.reducers';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared-module/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEmployeeComponent } from './components/UI-components/add-employee/add-employee.component';


@NgModule({
  declarations: [
    EmployeesTableComponent,
    EmployeesComponent,
    AddEmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    StoreModule.forFeature("employees", employeesReducer),
    EffectsModule.forFeature([EmployeeEffects])
  ]
})
export class EmployeesModule { }
