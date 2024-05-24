
import { Component, OnInit } from '@angular/core';
import { InventoryState } from '../../inventory-module/store/inventory.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserAsset } from '../../inventory-module/models/inventory';
import { getUserAssets } from '../../inventory-module/store/inventory.action';
import { logoutUserSuccess } from '../../../store/global.actions';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userAssets$: Observable<UserAsset[]> | null = null
  user$: Observable<any> | null = null;

  constructor(private store: Store<{ global: any, inventory: InventoryState }>, private router: Router, private cs: CookieService) {
    this.userAssets$ = this.store.select(state => state.inventory.userAssets);
    this.user$ = this.store.select(state => state.global.user);
  }

  ngOnInit(): void {
    this.store.dispatch(getUserAssets());
  }

  onLogout(): void {
    this.cs.deleteAll();
    this.store.dispatch(logoutUserSuccess())
    this.router.navigate(["auth/login"]);
  }

}

