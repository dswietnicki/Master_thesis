import { AUTHENTICATE, USER_INFO, IS_ADMIN } from '../actions/user-actions';

const initialState = {
    authenticated: false,
    userInfo: {},
    isAdmin: false,
    token: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return { ...state, authenticated: action.payload };
        case USER_INFO:
            return { ...state, userInfo: action.payload };
        case IS_ADMIN:
            return { ...state, isAdmin: action.payload };
        default:
            return state;
    }
};


export default rootReducer;