import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesTableComponent } from './ui/employees-table/employees-table.component';
import { StoreModule } from '@ngrx/store';
import { employeesReduer } from './store/employees.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employees.effects';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeesTableComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("employees", employeesReduer),
    EffectsModule.forFeature([EmployeeEffects])
  ]
})
export class EmployeesModule { }
