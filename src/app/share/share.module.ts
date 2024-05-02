import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from './directive/button-primary.directive';
import { ModalComponent } from './componennt/modal/modal.component';
import { NavbarComponent } from './componennt/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CustomInputStyleDirective } from './directive/custom-input-style.directive';
import { FooterComponent } from './componennt/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ButtonPrimaryDirective,
    ModalComponent,
    NavbarComponent,
    CustomInputStyleDirective,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports:[
    ModalComponent,
    NavbarComponent,
    FooterComponent,
    ButtonPrimaryDirective,
    CustomInputStyleDirective
  ]
})
export class ShareModule { }
