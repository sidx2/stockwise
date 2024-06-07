import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addVendorRequest, deleteVendorRequest, fetchVendorsRequest, fetchVendorsSuccess, updateVendorRemote, updateVendorRequest, updateVendorSuccess } from '../../../store/vendor.actions';
import { vendorsStateSelector } from '../../../store/vendor.selectors';
import { Subject, takeUntil } from 'rxjs';
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

  destroySubject = new Subject<void>();

  constructor(
    private store: Store<{ vendors: IVendorsState, employees: IEmployeesState }>,
  ) {
    this.store.dispatch(fetchVendorsRequest());
    
    this.store.select(vendorsStateSelector).pipe(
      takeUntil(this.destroySubject)
    ).subscribe(state => {
      this.vendors = state.vendors;
      this.isLoading = state.isLoading;
    })
  }

  ngOnInit() {
  }

  showAddVendor(){
    this.isVisibleAddVendor = true;
  }

  hideAddVendor(){
    this.isVisibleAddVendor = false;
  }

  onAddVendor(vendor: Vendor) {
    this.store.dispatch(addVendorRequest({ vendor: vendor }))
    this.hideAddVendor()
  }
  
  onUpdateVendor(vendor: Vendor) {
    this.store.dispatch(updateVendorRequest({ vendor }));
  }
  
  onDeleteVendor(vendorId: string) {
    this.store.dispatch(deleteVendorRequest({ vendorId }))
  }
  
  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}