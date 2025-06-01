import { all, put, call, takeEvery } from 'redux-saga/effects';

import { actionTypes, getAdminMenuAllSuccess, getAdminUserMenuSuccess } from './action';

// import AdminRepository from '../../repositories/CategoryRepository';

function* getAdminMenuAllSaga() {
    // try {
    //     const data = yield call(AdminRepository.getAdminMenuAll);
    //     yield put(getAdminMenuAllSuccess(data));
    // } catch (err) {
    //     yield put(getAdminMenuAllSuccess(null));
    // }
}

function* getAdminUserMenuSaga() {
    // try {
    //     const data = yield call(AdminRepository.getAdminUserMenu);
    //     yield put(getAdminUserMenuSuccess(data));
    // } catch (err) {
    //     yield put(getAdminUserMenuSuccess(null));
    // }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ADMIN_MENU_ALL_REQUEST, getAdminMenuAllSaga)]);
    yield all([takeEvery(actionTypes.GET_ADMIN_USER_MENU_REQUEST, getAdminUserMenuSaga)]);
}
