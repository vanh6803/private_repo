import {
  FETCH_CART_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from '../actionType';
import createAction from './BaseAction';

export const fetchCartRequest = token =>
  createAction(FETCH_CART_REQUEST, {token});

export const fetchCartSuccess = data =>
  createAction(FETCH_CART_SUCCESS, {data});

export const fetchCartFail = error => createAction(FETCH_CART_FAIL, {error});

export const addToCart = item => createAction(ADD_TO_CART, {item});

export const deleteFromCart = itemId =>
  createAction(DELETE_FROM_CART, {itemId});

export const updateCartQuantity = (itemId, quantity) =>
  createAction(UPDATE_CART_QUANTITY, {itemId, quantity});
