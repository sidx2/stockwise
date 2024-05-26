import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from './directive/button-primary.directive';
import { ButtonPrimaryLightDirective } from './directive/buttom-primary-light.directive';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { CustomInputStyleDirective } from './directive/custom-input-style.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipDirective } from './directive/tooltip.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { NoDataComponent } from './components/no-data/no-data.component';

@NgModule({
  declarations: [
    ModalComponent,
    LoaderComponent,
    ErrorPageComponent,
    HeaderComponent,
    NoDataComponent,

    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    CustomInputStyleDirective,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    ModalComponent,
    LoaderComponent,
    HeaderComponent, 
    ErrorPageComponent,
    NoDataComponent,

    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    CustomInputStyleDirective,
    TooltipDirective,
  ]
})
export class SharedModule { }
