import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delayWhen, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InventoryService } from '../Services/inventory.service';

import { addItem, createItemRequest, deleteItemRequest, getItemRequest, removeItem, setItems, updateItem, updateItemRequest } from './inventory.action';

@Injectable()
export class InventoryEffects {

    loadInventoryItems$ = createEffect(() => this.actions$.pipe(
        ofType(getItemRequest),
        tap(() => console.log('getItemRequest dispatched')),
        mergeMap(() =>
            this.inventoryService.getItems().pipe(
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
        tap(()=> console.log('createItemRequest dispatched')),
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
        tap(()=> console.log('createItemRequest dispatched')),
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
        tap(()=> console.log('deleteItem dispatched')),
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

    constructor(
        private actions$: Actions,
        private inventoryService: InventoryService
    ) { }
}