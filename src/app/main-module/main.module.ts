import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './component/main/main.component';
import { ShareModule } from './share-module/share.module';
import { InventoryModule } from './inventory-module/inventory.module';
import { CategoryModule } from './category-module/category.module';
import { OrderModule } from './order-module/order.module';
import { OrderHistoryModule } from './order-history-module/order-history.module';
import { TicketModule } from './ticket-module/ticket.module';
import { EmployeesModule } from './employees-module/employees.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoaderInterceptor } from './share-module/interceptors/loaderInterceptor';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { ErrorInterceptor } from './share-module/interceptors/errorInterceptor';


import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    MainComponent, 
    DashboardComponent,
    ProfileComponent,
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareModule,
    InventoryModule,
    CategoryModule,
    OrderModule,
    OrderHistoryModule,
    TicketModule,
    EmployeesModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  },
  provideHttpClient(withInterceptors([authInterceptor])),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }]
})
export class MainModule { }
