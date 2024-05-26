import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addVendorRequest, deleteVendorRequest, fetchVendorsRequest, fetchVendorsSuccess, updateVendorRemote, updateVendorRequest, updateVendorSuccess } from '../../../store/vendor.actions';
import { vendorsStateSelector } from '../../../store/vendor.selectors';
import { orgSelector } from '../../../../../store/global.selectors';
import { AppService } from '../../../../../services/app.service';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { IVendorsState, Vendor } from '../../../models/vendor';
import { IEmployeesState } from '../../../../employees-module/models/employee';
import { Editor } from '../../../models/vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent implements OnInit, OnDestroy {
  vendors!: Vendor[];
  editors: Editor[] = []

  isVisibleAddVendor: boolean = false
  isLoading: boolean = false
  orgId!: string

  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ vendors: IVendorsState, employees: IEmployeesState }>,
    private appService: AppService,
    private actions$: Actions,
    private socket: Socket,
  ) {
    this.store.select(vendorsStateSelector).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(state => {
      this.vendors = state.vendors;
      this.isLoading = state.isLoading;
    })

    this.store.dispatch(fetchVendorsRequest());

    this.store.select(orgSelector).pipe(
      takeUntil(this.destroySubject),
    ).subscribe((org) => {
      this.appService.joinRoom(org._id)
      this.orgId = org._id
    })

    this.actions$.pipe(
      ofType(updateVendorSuccess),
      takeUntil(this.destroySubject),
    ).subscribe(({ vendor }) => {
      this.appService.vendorUpdated({ vendor, orgId: vendor.orgId });
    });
  }

  ngOnInit() {
    this.socket.fromEvent('vendorUpdated').pipe(
      takeUntil(this.destroySubject)
    ).subscribe((data) => {
      console.log('vendorUpdated event received:', data);
      this.store.dispatch(updateVendorRemote({ vendor: data as Vendor }))
    });

    this.socket.fromEvent('startedEditing').pipe(
      takeUntil(this.destroySubject)
    ).subscribe((data) => {
      console.log('startedEditing event received:', data);
      this.editors.push(data as never);
    });

    this.socket.fromEvent('cancelledEditing').pipe(
      takeUntil(this.destroySubject)
    ).subscribe((data) => {
      console.log('cancelledEditing event received:', data);
      this.editors = this.editors.filter((e) => e._id !== data);
    });
  }

  showAddVendor(){
    this.isVisibleAddVendor = true;
  }

  hideAddVendor(){
    this.isVisibleAddVendor = false;
  }

  onAddVendor(vendor: Vendor) {
    this.store.dispatch(addVendorRequest({ vendor: vendor, orgId: this.orgId }))
    this.hideAddVendor()
  }
  
  onUpdateVendor(vendor: Vendor) {
    this.store.dispatch(updateVendorRequest({ vendor }));
  }
  
  onDeleteVendor(vendorId: string) {
    this.store.dispatch(deleteVendorRequest({ vendorId }))
  }
  
  // socket
  onStartedEditing(event: Editor) {
    this.appService.startedEditing(this.orgId, event);
  }
  
  onCancelledEditing(vendorId: string) {
    this.appService.cancelledEditing(this.orgId, vendorId);
  }
  
  onVendorChanged(vendor: Vendor) {
    const newVendor = {vendor: vendor, orgId: this.orgId}
    this.appService.vendorUpdated(newVendor);
  }
  
  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}