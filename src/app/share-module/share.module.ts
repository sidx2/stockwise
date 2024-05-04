import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from './directive/button-primary.directive';
import { ButtonPrimaryLightDirective } from './directive/buttom-primary-light.directive';
import { ModalComponent } from './component/modal/modal.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CustomInputStyleDirective } from './directive/custom-input-style.directive';
import { FooterComponent } from './component/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    ModalComponent,
    NavbarComponent,
    CustomInputStyleDirective,
    FooterComponent,
    SidebarComponent,
    LoaderComponent
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
    LoaderComponent,
    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    CustomInputStyleDirective,
  ]
})
export class ShareModule { }
