import { actionTypes } from './action';

export const initState = {
    allMenu: [],
    auth: null,
    dashCount: []
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_ADMIN_MENU_ALL_SUCCESS:
            return {
                ...state,
                ...{ allMenu: action.payload && action.payload.Adminmenu && action.payload.Adminmenu.length > 0 ? action.payload.Adminmenu : [] },
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ auth: action.payload ? action.payload : null },
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...{ auth: null },
            };
        default:
            return state;
    }
}

export default reducer;
