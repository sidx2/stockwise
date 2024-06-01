import { createReducer, on } from '@ngrx/store';
import { InventoryState } from '../models/inventory';
import {setLoading, getItemSuccess, createItemSuccess, deleteItemSuccess, updateItemSuccess, getItemFailure, createItemFailure, deleteItemFailure, updateItemFailure, checkoutItemFailure, getUserAssetsFailure, getUserAssetsSuccess, checkoutItemSuccess, checkintItemSuccess, clearErrorMessage, checkoutMailSuccess, checkoutMailFailure, createMultipleItemSuccess, createMultipleItemFailure } from './inventory.action';
import { logoutUserSuccess } from '../../../auth-module/store/auth.actions';

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

  on(createMultipleItemSuccess, (state, { items }) => ({
    ...state,
    items: [...state.items, ...items],
    loading: false
  })),

  on(createMultipleItemFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage
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

  on(updateItemSuccess, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    loading: false
  })), 

  on(checkoutItemSuccess, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    loading: false
  })), 

  on(checkintItemSuccess, (state, { updatedItem }) => ({
    ...state,
    items: state.items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    loading: false
  })), 
  
  on(updateItemFailure, checkoutItemFailure, checkoutItemFailure, (state, {errorMessage})=>({
    ...state,
    loading: false,
    errorMessage: errorMessage
  })),

  on(checkoutMailSuccess, (state) => ({
    ...state,
    loading: false
  })),

  on(checkoutMailFailure, (state, {errorMessage}) => ({
    ...state,
    loading: false,
    errorMessage
  })),

  on(setLoading, (state)=> ({...state, loading: true})),
  on(clearErrorMessage, (state)=> ({...state, errorMessage: ''})),
  on(logoutUserSuccess, ()=>  initialState)
);
