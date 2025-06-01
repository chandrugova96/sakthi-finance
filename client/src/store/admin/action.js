export const actionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    GET_DASHBOARD_COUNT_REQUEST: 'GET_DASHBOARD_COUNT_REQUEST',
    GET_DASHBOARD_COUNT_SUCCESS: 'GET_DASHBOARD_COUNT_SUCCESS',
};

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS, payload };
}

export function logoutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}