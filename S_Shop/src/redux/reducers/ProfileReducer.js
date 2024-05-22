import {
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
} from '../actionType';
import createReducer from './Basereducer';

export const profileReudcer = createReducer({
  REQUEST: FETCH_PROFILE_REQUEST,
  SUCCESS: FETCH_PROFILE_SUCCESS,
  FAIL: FETCH_PROFILE_FAIL,
});
