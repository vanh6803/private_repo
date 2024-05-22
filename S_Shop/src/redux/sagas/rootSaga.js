import {all} from 'redux-saga/effects';
import watchFetchProfile from './ProfileSaga';
import watchFetchCart from './CartSaga';

function* rootSaga() {
  yield all([watchFetchProfile(), watchFetchCart()]);
}
export default rootSaga;
