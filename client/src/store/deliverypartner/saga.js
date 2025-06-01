import { all, put, call, takeEvery } from 'redux-saga/effects';

import { actionTypes, getCompanySuccess } from './action';
import DeliveryPartnersRepository from '../../repositories/DeliveryPartnersRepository';

function* getDeliveryPartnersSaga({ payload }) {
    try {
        const data = yield call(DeliveryPartnersRepository.get, payload);
        yield put(getCompanySuccess(data.data));
    } catch (err) {
        yield put(getCompanySuccess(null));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DELIVERY_PARTNERS_REQUEST, getDeliveryPartnersSaga)]);
}