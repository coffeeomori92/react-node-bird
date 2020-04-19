import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';
import axios from 'axios';

function loginAPI() {
    // 서버에 요청을 보내는 부분
}

function signupAPI() {
    return axios.post('/signup');
}

function* login() {
    try {
        // yield call(loginAPI); // 동기 요청
        yield delay(2000);
        yield put({ // dispatch와 동일
            type: LOG_IN_SUCCESS
        });
    }catch(e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAILURE
        });
    }
}

function* signup() {
    try{
        yield call(signupAPI);
        yield put({
            type: SIGN_UP_SUCCESS
        });
    }catch(e){
        console.log(e);
        yield put({
           type: SIGN_UP_FAILURE ,
           error: e
        });
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignup)
    ]);
}