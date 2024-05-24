import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InventoryService } from '../Services/inventory.service';
import { addItem, checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, getUserAssets, removeItem, setItems, setUserAssets, updateItem, updateItemRequest, checkoutMailRequest, setLoading, resetLoading} from './inventory.action';
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
                map(response => setItems({ items: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in loading inventory items:', error);
                    return of();
                })
            )
        )
    ));

    createItem$ = createEffect(() => this.actions$.pipe(
        ofType(createItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.createItem(action.item).pipe(
                map(response => addItem({ item: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in loading creating new item:', error);
                    return of();
                })
            )
        )
    ));

    updateItem$ = createEffect(() => this.actions$.pipe(
        ofType(updateItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.updateItem(action.updatedItem).pipe(
                map(response => updateItem({ updatedItem: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in updating item:', error);
                    return of();
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
                map(response => removeItem({ itemId: response?._id })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in loading deleting item:', error);
                    return of();
                })
            )
        )
    ))

    checkoutItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.checkoutItem(action.assignedToDetails).pipe(
                map(response => updateItem({ updatedItem: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in checkout item:', error);
                    return of();
                })
            )
        )
    ))

    checkinItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkinItemRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.inventoryService.checkinItem(action.checkinDetails).pipe(
                map(response => updateItem({ updatedItem: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in chheckin item:', error);
                    return of();
                })
            )
        )
    ))

    loadUserAssets$ = createEffect(() => this.actions$.pipe(
        ofType(getUserAssets),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap(() =>
            this.inventoryService.getUserAsset().pipe(
                map(response => setUserAssets({ userAssets: response })),
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in loading userAssets:', error);
                    return of();
                })
            )
        )
    ))

    sendMail$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutMailRequest),
        tap(() => this.store.dispatch(setLoading())), 
        switchMap((action) =>
            this.mailService.sendCheckoutMail(action.checkoutMailDetails).pipe(
                catchError(error => {
                    this.store.dispatch(resetLoading()); 
                    console.error('Error in sending mail:', error); 
                    return of(); 
                })
            )
        )
    ));

}
