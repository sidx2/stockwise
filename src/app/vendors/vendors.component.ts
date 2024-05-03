import { Component } from '@angular/core';
import { VendorsService } from './vendors.service';
import { Store } from '@ngrx/store';
import { fetchVendors } from './store/vendor.actions';
import { vendorsSelector } from './store/vendor.selectors';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {
  vendors!: any[];

  selectedVendors!: any;

  constructor(
        private vendorService: VendorsService,
        private store: Store<{ vendors: any }>
    ) {
        this.store.dispatch(fetchVendors());

        this.store.select(vendorsSelector).subscribe(data => {
            this.vendors = data;
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
}
