import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from './directive/button-primary.directive';
import { ButtonPrimaryLightDirective } from './directive/buttom-primary-light.directive';
import { ModalComponent } from './component/modal/modal.component';
import { RouterModule } from '@angular/router';
import { CustomInputStyleDirective } from './directive/custom-input-style.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipDirective } from './directive/tooltip.directive';

@NgModule({
  declarations: [
    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    ModalComponent,
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
    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    CustomInputStyleDirective,
    TooltipDirective,
  ]
})
export class ShareModule { }
