import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../models/global';
import { InventoryState } from '../../inventory-module/models/inventory';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserAsset } from '../../inventory-module/models/inventory';
import { getUserAssets } from '../../inventory-module/store/inventory.action';
import { changePasswordRequest, changePasswordSuccess, logoutUserSuccess } from '../../../auth-module/store/auth.actions';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../../services/cookie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  userAssets$: Observable<UserAsset[]>;
  user: User
  destroy$: Subject<void> = new Subject();
  noItemImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTuSpR_FwEIFFf0C8vSnQ4kMVW7KO4iNdYgjdUok3Ew&s';

  isChangePasswordVisible: boolean = false

  constructor(
    private store: Store<{ inventory: InventoryState }>, 
    private router: Router, private cs: CookieService, 
    private actions$: Actions, private toastr: ToastrService,
    private cookieService: CookieService,
  ) {
    this.userAssets$ = this.store.select(state => state.inventory.userAssets);
    this.user = cookieService.getUser();
    console.log("user in profile: ", this.user);
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
    this.cs.clearAll();
    this.store.dispatch(logoutUserSuccess())
    this.router.navigate(["auth/login"]);
  }

  showChangePassword(){
    this.isChangePasswordVisible = true;
  }

  hideChangePassword(){
    this.isChangePasswordVisible = false;
  }

  changePasswordHandler(passwordDetails: { currPassword: string, newPassword: string }) { 
    console.log('data recieved in profile', passwordDetails)
    this.store.dispatch(changePasswordRequest({
      currPassword: passwordDetails.currPassword,
      newPassword: passwordDetails.newPassword
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

