import {
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
} from '../actionType';
import createAction from './BaseAction';

export const fetchProfileRequest = token =>
  createAction(FETCH_PROFILE_REQUEST, {token});

export const fetchProfileSuccess = data =>
  createAction(FETCH_PROFILE_SUCCESS, {data});

export const fetchProfileFail = error =>
  createAction(FETCH_PROFILE_FAIL, {error});
