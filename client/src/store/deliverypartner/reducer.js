import { actionTypes } from './action';

export const initState = {
    company: [],
    qActiveCount: 0,
    qInactiveCount: 0
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_DELIVERY_PARTNERS_SUCCESS:
            return {
                ...state,
                ...{
                    company: action.payload && action.payload.data ? action.payload.data : [],
                    qActiveCount: action.payload && action.payload.activeCount ? action.payload.activeCount : 0,
                    qInactiveCount: action.payload && action.payload.inactiveCount ? action.payload.inactiveCount : 0
                },
            };
        default:
            return state;
    }
}

export default reducer;