import { call, put, takeEvery } from "redux-saga/effects";
import apiConstants from "./Constants";

function* _updateList(action) {
    yield put({
        type: apiConstants.UPDATE_LIST_SUCCESS,
        response: action.payload
    });
}

function* _updateView(action) {
    yield put({
        type: apiConstants.UPDATE_VIEW_SUCCESS,
        response: action.payload
    });
}

function* _handleSearch(action) {
    yield put({
        type: apiConstants.HANDLE_SEARCH_SUCCESS,
        response: action.payload
    });
}

export function* Dashboard() {
    yield takeEvery(apiConstants.UPDATE_LIST, _updateList);
    yield takeEvery(apiConstants.UPDATE_VIEW, _updateView);
    yield takeEvery(apiConstants.HANDLE_SEARCH, _handleSearch);
}
