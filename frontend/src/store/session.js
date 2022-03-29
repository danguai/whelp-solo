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
    const { username, password } = user;
    try {
        const response = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    } catch (e) {
        const data = await e.json();
        return {
            error: true,
            data: data.errors
        };
    }
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
