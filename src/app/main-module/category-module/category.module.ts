import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/feature-component/category/category.component';
import { CategoryTableComponent } from './components/ui-component/category-table/category-table.component';
import { CategoryHeaderComponent } from './components/ui-component/category-header/category-header.component';
import { SharedModule } from '../../shared-module/shared.module';
import { CategoryFormComponent } from './components/feature-component/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryTableComponent,
    CategoryHeaderComponent,
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    CategoryRoutingModule
  ],
  exports:[
    CategoryComponent,
  ]
})
export class CategoryModule { }
