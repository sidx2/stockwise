import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InventoryService } from '../Services/inventory.service';
import { checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, getUserAssets, getUserAssetsSuccess, updateItemRequest, checkoutMailRequest, setLoading, getItemSuccess, createItemSuccess, updateItemSuccess, deleteItemSuccess, getItemFailure, createItemFailure, updateItemFailure, deleteItemFailure, checkoutItemFailure, getUserAssetsFailure, checkoutItemSuccess} from './inventory.action';
import { MailService } from '../Services/mail.service';
import { Store } from '@ngrx/store';

@Injectable()
export class InventoryEffects {

    constructor(
        private actions$: Actions,
        private inventoryService: InventoryService,
        private mailService: MailService,
        private store: Store
    ) {}

    loadInventoryItems$ = createEffect(() => this.actions$.pipe(
        ofType(getItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.getItems(action.orgId).pipe(
                map(response => getItemSuccess({ items: response })),
                catchError(errorResponse => {
                    return of(getItemFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ));

    createItem$ = createEffect(() => this.actions$.pipe(
        ofType(createItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.createItem(action.item).pipe(
                map(response => createItemSuccess({ item: response })),
                catchError(errorResponse => {
                    return of(createItemFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ));

    updateItem$ = createEffect(() => this.actions$.pipe(
        ofType(updateItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.updateItem(action.updatedItem).pipe(
                map(response => updateItemSuccess({ updatedItem: response })),
                catchError(errorResponse => {
                    return of(updateItemFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ));

    deleteItem$ = createEffect(() => this.actions$.pipe(
        ofType(deleteItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.deleteItem(action.itemId).pipe(
                map(response => deleteItemSuccess({ itemId: response?._id! })),
                catchError(errorResponse => {
                    return of(deleteItemFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ))

    checkoutItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.checkoutItem(action.assignedToDetails).pipe(
                map(response => checkoutItemSuccess({ updatedItem: response })),
                catchError(errorResponse => {
                    return of(checkoutItemFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ))

    checkinItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkinItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.checkinItem(action.checkinDetails).pipe(
                map(response => updateItemSuccess({ updatedItem: response })),
                catchError(errorResponse => {
                    return of(checkoutItemFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ))

    loadUserAssets$ = createEffect(() => this.actions$.pipe(
        ofType(getUserAssets),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap(() =>
            this.inventoryService.getUserAsset().pipe(
                map(response => getUserAssetsSuccess({ userAssets: response })),
                catchError(errorResponse => {
                    return of(getUserAssetsFailure({errorMessage: errorResponse.error.error}));
                })
            )
        )
    ))

    sendMail$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutMailRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.mailService.sendCheckoutMail(action.checkoutMailDetails).pipe(
                catchError(errorResponse => {
                    return of(); 
                })
            )
        )
    ));

}
