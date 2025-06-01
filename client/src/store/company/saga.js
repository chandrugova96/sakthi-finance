import { all, put, call, takeEvery } from 'redux-saga/effects';

import { actionTypes, getCompanySuccess } from './action';
import CompanyRepository from '../../repositories/CompanyRepository';

function* getCompanySaga({ payload }) {
    try {
        const data = yield call(CompanyRepository.get, payload);
        yield put(getCompanySuccess(data.data));
    } catch (err) {
        yield put(getCompanySuccess(null));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_COMPANY_REQUEST, getCompanySaga)]);
}