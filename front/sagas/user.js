import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_OUT_REQUEST, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../reducers/user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

function loginAPI(loginData) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/login', loginData, {
        withCredentials: true
    });
}

function signupAPI(signupData) {
    return axios.post('/user/', signupData);
}

function logoutAPI(){
    return axios.post('/user/logout', {}, {
        withCredentials: true // 쿠키를 도메인이 다른 곳으로 보낼 때
    });
}

function loadUserAPI(userId){
    return axios.get(userId ? `/user/${userId}` : `/user/`, {
        withCredentials: true
    });
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data); // 동기 요청
        yield put({ // dispatch와 동일
            type: LOG_IN_SUCCESS,
            data: result.data
        });
    }catch(e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAILURE
        });
    }
}

function* signup(action) {
    try{
        yield call(signupAPI, action.data);
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

function* logout(){
    try{
        yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS
        });
    }catch(e){
        yield put({
            type: LOG_OUT_FAILURE,
            error: e
        });
    }
}

function* loadUser(action) {
    try{
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data
        });
    }catch(e){
        yield put({
            type: LOAD_USER_FAILURE,
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

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchSignup)
    ]);
}