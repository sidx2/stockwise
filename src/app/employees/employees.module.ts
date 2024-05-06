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
import { SharedModule } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from "primeng/button"
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    EmployeesTableComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
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
