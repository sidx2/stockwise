import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from './directive/button-primary.directive';
import { ModalComponent } from './componennt/modal/modal.component';
import { NavbarComponent } from './componennt/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CustomInputStyleDirective } from './directive/custom-input-style.directive';

@NgModule({
  declarations: [
    ButtonPrimaryDirective,
    ModalComponent,
    NavbarComponent,
    CustomInputStyleDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ModalComponent,
    NavbarComponent,
    ButtonPrimaryDirective,
    CustomInputStyleDirective
  ]
})
export class ShareModule { }
