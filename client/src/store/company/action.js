export const actionTypes = {
    GET_COMPANY_REQUEST: 'GET_COMPANY_REQUEST',
    GET_COMPANY_SUCCESS: 'GET_COMPANY_SUCCESS',
};

export function getCompany(payload) {
    return { type: actionTypes.GET_COMPANY_REQUEST, payload };
}

export function getCompanySuccess(payload) {
    return { type: actionTypes.GET_COMPANY_SUCCESS, payload };
}