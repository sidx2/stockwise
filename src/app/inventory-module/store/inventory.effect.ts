import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delayWhen, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InventoryService } from '../Services/inventory.service';
import { addItem, checkinItemRequest, checkoutItemRequest, createItemRequest, deleteItemRequest, getItemRequest, getUserAssets, removeItem, setItems, setUserAssets, updateItem, updateItemRequest } from './inventory.action';

@Injectable()
export class InventoryEffects {

    loadInventoryItems$ = createEffect(() => this.actions$.pipe(
        ofType(getItemRequest),
        tap(() => console.log('getItemRequest dispatched')),
        mergeMap((action) =>
            this.inventoryService.getItems(action.orgId).pipe(
                map(response => setItems({ items: response })),
                tap(action => console.log('Dispatched action setItems')),
                catchError(error => {
                    console.error('Error in loading inventory items:', error);
                    return of();
                })
            )
        )
    ));

    createItem$ = createEffect(() => this.actions$.pipe(
        ofType(createItemRequest),
        tap(() => console.log('createItemRequest dispatched')),
        mergeMap((action) =>
            this.inventoryService.createItem(action.item).pipe(
                map(response => addItem({ item: response })),
                tap(action => console.log('Dispatched action add Item')),
                catchError(error => {
                    console.error('Error in loading creating new item:', error);
                    return of();
                })
            )
        )
    ));

    updateItem$ = createEffect(() => this.actions$.pipe(
        ofType(updateItemRequest),
        tap(() => console.log('createItemRequest dispatched')),
        mergeMap((action) =>
            this.inventoryService.updateItem(action.updatedItem).pipe(
                map(response => updateItem({ updatedItem: response })),
                tap(action => console.log('Dispatched action add Item')),
                catchError(error => {
                    console.error('Error in updating item:', error);
                    return of();
                })
            )
        )
    ));

    deleteItem$ = createEffect(() => this.actions$.pipe(
        ofType(deleteItemRequest),
        tap(() => console.log('deleteItem dispatched')),
        mergeMap((action) =>
            this.inventoryService.deleteItem(action.itemId).pipe(
                map(response => removeItem({ itemId: response?._id })),
                tap(action => console.log('Dispatched action remove Item')),
                catchError(error => {
                    console.error('Error in loading deleting item:', error);
                    return of();
                })
            )
        )
    ))

    checkoutItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkoutItemRequest),
        tap(() => console.log('checkoutItem dispatched')),
        mergeMap((action) =>
            this.inventoryService.checkoutItem(action.assignedToDetails).pipe(
                map(response => updateItem({ updatedItem: response })),
                tap(action => console.log('Dispatched action update Item', action)),
                catchError(error => {
                    console.error('Error in checkout item:', error);
                    return of();
                })
            )
        )
    ))

    checkinItem$ = createEffect(() => this.actions$.pipe(
        ofType(checkinItemRequest),
        tap(() => console.log('checkinItem dispatched')),
        mergeMap((action) =>
            this.inventoryService.checkinItem(action.checkinDetails).pipe(
                map(response => updateItem({ updatedItem: response })),
                tap(action => console.log('Dispatched action update Item', action)),
                catchError(error => {
                    console.error('Error in chheckin item:', error);
                    return of();
                })
            )
        )
    ))

    loadUserAssets$ = createEffect(() => this.actions$.pipe(
        ofType(getUserAssets),
        tap(() => console.log('getUserAssets dispatched')),
        mergeMap((action) =>
            this.inventoryService.getUserAsset().pipe(
                map(response => setUserAssets({ userAssets: response })),
                tap(action => console.log('Dispatched action set userAssets', action)),
                catchError(error => {
                    console.error('Error in loading userAssets:', error);
                    return of();
                })
            )
        )
    ))


    constructor(
        private actions$: Actions,
        private inventoryService: InventoryService,
    ) { }
}
