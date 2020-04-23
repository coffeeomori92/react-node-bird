import { all, takeLatest, delay, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';

import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_SUCCESS } from '../reducers/post';

axios.defaults.baseURL = 'http://localhost:8080/api';

function addPostAPI(postData) {
    return axios.post('/post/', postData, {
        withCredentials: true
    });
}

function addCommentAPI() {

}

function loadMainPostsAPI(){
    return axios.get('/posts/', {
        withCredentials: true
    });
}

function* addPost(action) {
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data
        });
    }catch(e){
        yield put({
            type: ADD_POST_FAILURE,
            error: e
        });
    }
}

function* addComment(action) {
    try{
        // yield call(addCommentAPI);
        yield delay(2000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId
            }
        });
    }catch(e){
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e
        });
    }
}

function* loadMainPosts(){
    try{   
        const result = yield call(loadMainPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data
        })
    }catch(e){
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadMainPosts() {
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadMainPosts),
        fork(watchAddComment)
    ]);
}