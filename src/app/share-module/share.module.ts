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
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoaderComponent } from './component/loader/loader.component';
import { TooltipDirective } from './directive/tooltip.directive';
import { Footer } from 'primeng/api';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [
    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    ModalComponent,
    NavbarComponent,
    CustomInputStyleDirective,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    TooltipDirective,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports:[
    ModalComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    ButtonPrimaryDirective,
    ButtonPrimaryLightDirective,
    CustomInputStyleDirective,
    TooltipDirective
  ]
})
export class ShareModule { }
