import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './store/category.effect';
import { categoryReducer } from './store/category.reducer';
import { StoreModule } from '@ngrx/store';
import { CategoryComponent } from './category-component/feature-component/category/category.component';
import { CategoryTableComponent } from './category-component/ui-component/category-table/category-table.component';
import { CategoryHeaderComponent } from './category-component/ui-component/category-header/category-header.component';
import { ShareModule } from '../share/share.module';
import { CategoryFormComponent } from './category-component/feature-component/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    // StoreModule.forRoot({'categories':categoryReducer}), 
    // EffectsModule.forRoot([CategoryEffects]),
    ShareModule,
    ReactiveFormsModule
  ],
  exports:[
    CategoryComponent,
  ]
})
export class CategoryModule { }