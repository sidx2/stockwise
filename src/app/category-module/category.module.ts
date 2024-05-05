import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category-component/feature-component/category/category.component';
import { CategoryTableComponent } from './category-component/ui-component/category-table/category-table.component';
import { CategoryHeaderComponent } from './category-component/ui-component/category-header/category-header.component';
import { ShareModule } from '../share-module/share.module';
import { CategoryFormComponent } from './category-component/feature-component/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
    ShareModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  exports:[
    CategoryComponent,
  ]
})
export class CategoryModule { }
