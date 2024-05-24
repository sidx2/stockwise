import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addVendorRequest, deleteVendorRequest, fetchVendorsRequest, fetchVendorsSuccess, updateVendorRemote, updateVendorRequest, updateVendorSuccess } from '../../../store/vendor.actions';
import { vendorsSelector } from '../../../store/vendor.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { AppService } from '../../../../../services/app.service';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { IVendorsState, Vendor } from '../../../store/vendor.reducers';
import { IEmployeesState } from '../../../../../employees-module/models/employee';

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

  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ vendors: IVendorsState, employees: IEmployeesState }>
  ) {
    this.store.dispatch(fetchVendorsRequest());

    this.store.select(vendorsSelector).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(vendors => {
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
    this.socket.fromEvent('vendorUpdated').subscribe((data: any) => {
      console.log('vendorUpdated event received:', data);
      this.store.dispatch(updateVendorRemote({ vendor: data }))
    });

    this.socket.fromEvent('startedEditing').pipe(
      takeUntil(this.destroySubject)
    ).subscribe((data: any) => {
      console.log('startedEditing event received:', data);
      this.editors.push(data as never);
    });

    this.socket.fromEvent('cancelledEditing').pipe(
      takeUntil(this.destroySubject)
    ).subscribe((data) => {
      console.log('cancelledEditing event received:', data);
      this.editors = this.editors.filter((e) => e !== data);
    });
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
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

  onCancelledEditing(event: any) {
    console.log("event: ", event);
    this.appService.cancelledEditing(this.orgId, event);
  }

  onVendorChanged(vendor: any) {
    vendor = {...vendor.vendor, orgId: this.orgId}
    console.log("vendoer changed: ", vendor);

    this.appService.vendorUpdated({vendor});
  }
}
