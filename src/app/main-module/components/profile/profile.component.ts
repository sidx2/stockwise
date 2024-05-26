import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGlobalState, User } from '../../../models/global';
import { InventoryState } from '../../inventory-module/models/inventory';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserAsset } from '../../inventory-module/models/inventory';
import { getUserAssets } from '../../inventory-module/store/inventory.action';
import { changePasswordRequest, changePasswordSuccess, logoutUserSuccess } from '../../../store/global.actions';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  userAssets$: Observable<UserAsset[]> | null = null
  user$: Observable<User> | null = null;
  destroy$: Subject<void> = new Subject();

  isChangePasswordVisible: boolean = false

  constructor(private store: Store<{ global: IGlobalState, inventory: InventoryState }>, private router: Router, private cs: CookieService, private actions$: Actions, private toastr: ToastrService) {
    this.userAssets$ = this.store.select(state => state.inventory.userAssets);
    this.user$ = this.store.select(state => state.global.user);
  }

  ngOnInit(): void {
    this.store.dispatch(getUserAssets());

    this.actions$.pipe(
      ofType(changePasswordSuccess),
      takeUntil(this.destroy$)
      ).subscribe( ()=> {
      this.toastr.success("Password changed successfully");
      this.hideChangePassword()
    })
  }

  onLogout(): void {
    this.cs.deleteAll();
    this.store.dispatch(logoutUserSuccess())
    this.router.navigate(["auth/login"]);
  }

  showChangePassword(){
    this.isChangePasswordVisible = true;
  }

  hideChangePassword(){
    this.isChangePasswordVisible = false;
  }

  changePasswordHandler(newPassword: string){
    console.log("updated password", newPassword)
    this.store.dispatch(changePasswordRequest({newPassword}))
    this.hideChangePassword();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

