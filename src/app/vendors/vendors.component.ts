import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { VendorsService } from './vendors.service';
import { Store } from '@ngrx/store';
import { fetchVendors } from './store/vendor.actions';
import { vendorsSelector } from './store/vendor.selectors';


export interface Vendor {
    name?: string,
    email?: string,
    address?: string,
}

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {
  vendors!: Vendor[];
  _vendors!: Vendor[];


  cdr = inject(ChangeDetectorRef)

  selectedVendors!: Vendor[];

  constructor(
        private vendorService: VendorsService,
        private store: Store<{ vendors: any }>
    ) {
        this.store.dispatch(fetchVendors());

        this.store.select(vendorsSelector).subscribe(vendors => {
            console.log("vendors in vendors: ", vendors)
            this.vendors = vendors;
            this._vendors = vendors;
        })
  }

  ngOnInit() {
      // this.vendorService.getVendors().then((data) => (this.customers = data));
  }

  getSeverity(status: string): string | undefined {
      switch (status) {
          case 'unqualified':
              return 'danger';

          case 'qualified':
              return 'success';

          case 'new':
              return 'info';

          case 'negotiation':
              return 'warning';

          case 'renewal':
              return 'info';

            default: return 'info';
      }
  }

  filter(e: any) {
    return;
    console.log(e.target.value)
    this.vendors = this._vendors.filter((v, i, a) => {
        JSON.stringify(v).toLowerCase().includes(e.target.value);
        return true;
    });

    console.log("new vendors: ", this.vendors)

    this.cdr.detectChanges();
  }
}
