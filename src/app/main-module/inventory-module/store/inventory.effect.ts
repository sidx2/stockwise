import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, debounceTime, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { InventoryService } from '../Services/inventory.service';
import { MailService } from '../Services/mail.service';

import { checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, getUserAssets, getUserAssetsSuccess, updateItemRequest, checkoutMailRequest, setLoading, getItemSuccess, createItemSuccess, updateItemSuccess, deleteItemSuccess, getItemFailure, createItemFailure, updateItemFailure, deleteItemFailure, checkoutItemFailure, getUserAssetsFailure, checkoutItemSuccess, checkintItemSuccess, checkinItemFailure, checkoutMailSuccess, checkoutMailFailure, createMultipleItemRequest, createMultipleItemSuccess, createMultipleItemFailure } from './inventory.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InventoryEffects {

    constructor(
        private actions$: Actions,
        private inventoryService: InventoryService,
        private mailService: MailService,
        private toastr: ToastrService,
        private store: Store
    ) { }

    loadInventoryItems$ = createEffect(() => this.actions$.pipe(
        ofType(getItemRequest),
        debounceTime(500),

        tap((action) => {
            if(!action.searchText && !action.skip) {
            // if (!action.searchText) {
                this.store.dispatch(setLoading());
            }
        }),

        switchMap((action) =>
            this.inventoryService.getItems(action.identificationType, action.categoryId, action.assignedStatus, action.limit, action.skip, action.searchText, action.assetId).pipe(
                map(response => getItemSuccess({ items: response.items, totalItems: response.totalItems })),
                catchError(errorResponse => {
                    return of(getItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ));


    createItem$ = createEffect(() => this.actions$.pipe(
        ofType(createItemRequest),
        tap(() => this.store.dispatch(setLoading())),
        concatMap((action) =>
            this.inventoryService.createItem(action.item).pipe(
                tap((response) => this.toastr.success('Item added successfully')),
                map(response => createItemSuccess({ item: response })),
                catchError(errorResponse => {
                    return of(createItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ));

    createMultipleItem$ = createEffect(() => this.actions$.pipe(
        ofType(createMultipleItemRequest),
        tap(() => this.store.dispatch(setLoading())),
        concatMap((action) =>
            this.inventoryService.createMultipleItem(action.item).pipe(
                tap((response) => this.toastr.success('Items added successfully')),
                map(response => createMultipleItemSuccess({ items: response })),
                catchError(errorResponse => {
                    return of(createMultipleItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ));

    updateItem$ = createEffect(() => this.actions$.pipe(
        ofType(updateItemRequest),
        tap(() => this.store.dispatch(setLoading())),
        concatMap((action) =>
            this.inventoryService.updateItem(action.updatedItem).pipe(
                tap((response) => this.toastr.success('Item updated successfully')),
                map(response => updateItemSuccess({ updatedItem: response })),
                catchError(errorResponse => {
                    return of(updateItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ));

    deleteItem$ = createEffect(() => this.actions$.pipe(
        ofType(deleteItemRequest),
        tap(() => this.store.dispatch(setLoading())),
        mergeMap((action) =>
            this.inventoryService.deleteItem(action.itemId).pipe(
                tap((response) => this.toastr.success('Item deleted successfully')),
                map(response => deleteItemSuccess({ itemId: response?._id! })),
                catchError(errorResponse => {
                    return of(deleteItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ))

    checkoutItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutItemRequest),
        tap(() => this.store.dispatch(setLoading())),
        concatMap((action) =>
            this.inventoryService.checkoutItem(action.assignedToDetails).pipe(
                tap((response) => this.toastr.success('Item checkout successfull')),
                map(response => checkoutItemSuccess({ updatedItem: response })),
                catchError(errorResponse => {
                    return of(checkoutItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ))

    checkinItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkinItemRequest),
        tap(() => this.store.dispatch(setLoading())),
        concatMap((action) =>
            this.inventoryService.checkinItem(action.checkinDetails).pipe(
                tap((response) => this.toastr.success('Item checkin successfull')),
                map(response => checkintItemSuccess({ updatedItem: response })),
                catchError(errorResponse => {
                    return of(checkinItemFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ))

    loadUserAssets$ = createEffect(() => this.actions$.pipe(
        ofType(getUserAssets),
        tap(() => this.store.dispatch(setLoading())),
        exhaustMap(() =>
            this.inventoryService.getUserAsset().pipe(
                map(response => getUserAssetsSuccess({ userAssets: response })),
                catchError(errorResponse => {
                    return of(getUserAssetsFailure({ errorMessage: errorResponse.error.error }));
                })
            )
        )
    ))

    sendMail$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutMailRequest),
        tap(() => this.store.dispatch(setLoading())),
        concatMap((action) =>
            this.mailService.sendCheckoutMail(action.checkoutMailDetails).pipe(
                map(response => checkoutMailSuccess()),
                catchError(errorResponse => {
                    return of(checkoutMailFailure(errorResponse.error.error));
                })
            )
        )
    ));

}
