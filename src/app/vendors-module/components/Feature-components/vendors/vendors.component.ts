import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { VendorsService } from '../../../services/vendors.service';
import { Store } from '@ngrx/store';
import { addVendorRequest, deleteVendorRequest, fetchVendorsRequest, fetchVendorsSuccess, updateVendorRequest, updateVendorSuccess } from '../../../store/vendor.actions';
import { vendorsSelector } from '../../../store/vendor.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { orgSelector } from '../../../../store/global.selectors';
import { deleteEmployeeRequest } from '../../../../employees-module/store/employees.actions';
import { AppService } from '../../../../services/app.service';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription, tap } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { IEmployeesState } from '../../../../employees-module/store/employees.reducers';
import { IVendorsState, Vendor } from '../../../store/vendor.reducers';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent implements OnInit {
  vendors!: Vendor[];
  _vendors!: Vendor[];

  editors = []

  visible: boolean = false
  cdr = inject(ChangeDetectorRef)

  orgId!: string

  selectedVendors!: Vendor[];

  appService = inject(AppService)
  actions$ = inject(Actions)
  socket = inject(Socket);

  private socketSubscription!: Subscription;
  private startedEditingSubscription!: Subscription;
  

  constructor(
    private vendorService: VendorsService,
    private store: Store<{ vendors: IVendorsState, employees: IEmployeesState }>
  ) {
    this.store.dispatch(fetchVendorsRequest());

    this.store.select(vendorsSelector).subscribe(vendors => {
      console.log("vendors in vendors: ", vendors)
      this.vendors = vendors;
      this._vendors = vendors;
    })

    this.store.select(orgSelector).subscribe((org) => {
      console.log("org in employees component: ", org);
      this.appService.joinRoom(org._id)
      this.orgId = org._id
    })
      
      this.actions$.pipe(
        ofType(updateVendorSuccess),
        ).subscribe((vendor) => {
        console.log("vendor in : ", vendor);
        this.appService.vendorUpdated(vendor);
    });
  }

  ngOnInit() {
    this.socketSubscription = this.socket.fromEvent('vendorUpdated').subscribe((data: any) => {
      console.log('Editing event received:', data);
      this.store.dispatch(updateVendorSuccess({vendor: data}))
    });

    this.startedEditingSubscription = this.socket.fromEvent('startedEditing').subscribe((data: any) => {
      console.log('startedEditing event received:', data);
      this.editors.push(data as never);
    });
  }

  ngOnDestroy() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }

    if (this.startedEditingSubscription) {
      this.startedEditingSubscription.unsubscribe();
    }
  }

  onAddVendor(event: any) {
    console.log("event: ", event);

    this.store.dispatch(addVendorRequest({ vendor: event.vendor, orgId: this.orgId }))
  }

  onUpdateVendor(event: any) {
    console.log("event: ", event);
    this.store.dispatch(updateVendorRequest({ vendor: event.vendor }));
  }

  onDeleteVendor(event: any) {
    console.log("event: ", event);
    this.store.dispatch(deleteVendorRequest({ _id: event._id }))
  }
  
  onStartedEditing(event: any) {
    console.log("event: ", event);
    this.appService.startedEditing(this.orgId, event);
  }
}
