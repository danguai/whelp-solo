import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//  S E T   U S E R
const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

//  R E M O V E   U S E R
const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

//  L O G I N   U S E R
export const login = user => async dispatch => {
    const { email, password } = user;

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//  R E S T O R E   U S E R
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//  S I G N   U P
export const signup = user => async dispatch => {
    const {
        firstName,
        lastName,
        email,
        imageProfile,
        password,
        confirmPassword
    } = user;

    console.log('USER', user);
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            imageProfile,
            password,
            confirmPassword
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
};

//  L O G  O U T
export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
