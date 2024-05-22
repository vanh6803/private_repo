import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {apiUrl} from '../../api';
import {fetchCartFail, fetchCartSuccess} from '../actions/CartAction';
import {FETCH_CART_REQUEST} from '../actionType';

function* fetchCart(action) {
  try {
    const {token} = action.payload;
    const response = yield call(() =>
      axios.get(apiUrl.getCart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    const data = response.data;
    const cart = data.data;
    yield put(fetchCartSuccess(cart));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchCartFail(errorData));
    } else {
      yield put(fetchCartFail(error.message));
    }
  }
}

export default function* watchFetchCart() {
  yield takeLatest(FETCH_CART_REQUEST, fetchCart);
}
