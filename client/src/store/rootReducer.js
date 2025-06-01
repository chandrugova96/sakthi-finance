import { combineReducers } from 'redux';

import admin from './admin/reducer';
import company from './company/reducer';

export default combineReducers({
    admin,
    company
});