import { all } from 'redux-saga/effects';

import AdminSaga from './admin/saga';
import CompanySaga from './company/saga';

export default function* rootSaga() {
    yield all([
        AdminSaga(),
        CompanySaga()
    ]);
}
