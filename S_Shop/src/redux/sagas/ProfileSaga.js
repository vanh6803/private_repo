import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {apiUrl} from '../../api';
import {fetchProfileFail, fetchProfileSuccess} from '../actions/ProfileAction';
import {FETCH_PROFILE_REQUEST} from '../actionType';

function* fetchProfile(action) {
  try {
    const {token} = action.payload;

    const response = yield call(() =>
      axios.get(apiUrl.detailProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    const data = response.data;
    const profile = data.data;
    yield put(fetchProfileSuccess(profile));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchProfileFail(errorData));
    } else {
      yield put(fetchProfileFail(error.message));
    }
  }
}

export default function* watchFetchProfile() {
  yield takeLatest(FETCH_PROFILE_REQUEST, fetchProfile);
}
