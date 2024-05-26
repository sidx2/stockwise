import { createReducer, on } from '@ngrx/store';
import { InventoryState } from '../models/inventory';
import {setLoading, getItemSuccess, createItemSuccess, deleteItemSuccess, updateItemSuccess, getItemFailure, createItemFailure, deleteItemFailure, updateItemFailure, checkoutItemFailure, getUserAssetsFailure, getUserAssetsSuccess, checkoutItemSuccess } from './inventory.action';
import { logoutUserSuccess } from '../../../store/global.actions';

const initialState: InventoryState = {
  items: [],
  userAssets: [],
  loading: false,
  errorMessage: ''
};

export const inventoryReducer = createReducer(
  initialState,

  on(getItemSuccess, (state, { items }) => ({ ...state, items, loading:false })),

  on(getItemFailure, (state, {errorMessage})=>({
    ...state,
    loading: false,
    errorMessage: errorMessage
  })),

  on(getUserAssetsSuccess, (state, { userAssets }) => ({ ...state, userAssets, loading: false })),

  on(getUserAssetsFailure, (state, {errorMessage})=>({
    ...state,
    loading: false,
    errorMessage: errorMessage
  })),

  on(createItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false
  })),

  on(createItemFailure, (state, {errorMessage})=>({
    ...state,
    loading: false,
    errorMessage: errorMessage
  })),

  on(deleteItemSuccess, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item._id !== itemId),
    loading: false
  })),

  on(deleteItemFailure, (state, {errorMessage})=>({
    ...state,
    loading: false,
    errorMessage: errorMessage
  })),

  on(updateItemSuccess, checkoutItemSuccess, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    loading: false
  })), 
  
  on(updateItemFailure, checkoutItemFailure, checkoutItemFailure, (state, {errorMessage})=>({
    ...state,
    loading: false,
    errorMessage: errorMessage
  })),

  on(setLoading, (state)=> ({...state, loading: true})),
  on(logoutUserSuccess, ()=>  initialState)
);
