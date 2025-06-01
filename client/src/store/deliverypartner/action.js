export const actionTypes = {
    GET_DELIVERY_PARTNERS_REQUEST: 'GET_DELIVERY_PARTNERS_REQUEST',
    GET_DELIVERY_PARTNERS_SUCCESS: 'GET_DELIVERY_PARTNERS_SUCCESS',
};

export function getDeliveryPartners(payload) {
    return { type: actionTypes.GET_DELIVERY_PARTNERS_REQUEST, payload };
}

export function getDeliveryPartnersSuccess(payload) {
    return { type: actionTypes.GET_DELIVERY_PARTNERS_SUCCESS, payload };
}