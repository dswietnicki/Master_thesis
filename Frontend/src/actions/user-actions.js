export const AUTHENTICATE = "AUTHENTICATE";
export const USER_INFO = "USER_INFO";
export const IS_ADMIN = "IS_ADMIN";

export const authenticate = value => ({
    type: AUTHENTICATE,
    payload: value
});

export const setUserInfo = value => ({
    type: USER_INFO,
    payload: value
});

export const isAdmin = value => ({
    type: IS_ADMIN,
    payload: value
});