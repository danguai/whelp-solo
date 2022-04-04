import { csrfFetch } from './csrf';

//  C O N S T A N T S
const CREATE_LITTER = 'litter/CREATE_LITTER';
const READ_LITTER = 'litter/READ_LITTER';
const READ_LITTERS = 'litter/READ_LITTERS';
const UPDATE_LITTER = 'litter/UPDATE_LITTER';
const DELETE_LITTER = 'litter/DELETE_LITTER';

//  A C T I O N S
const createLitterAction = litter => {
    return {
        type: CREATE_LITTER,
        payload: litter
    };
};

const readLitterAction = litter => {
    return {
        type: READ_LITTER,
        payload: litter
    };
};

const readLittersAction = litters => {
    return {
        type: READ_LITTERS,
        arrOfLitters: litters
    };
};

const updateLitterAction = litter => {
    return {
        type: UPDATE_LITTER,
        payload: litter
    };
};

const deleteLitterAction = () => {
    return {
        type: DELETE_LITTER
    };
};

//  T H U N K S
//  C R E A T E   L I T T E R   T H U N K
export const createLitter = litter => async dispatch => {
    const {
        name,
        imageHeader,
        description,
        address,
        city,
        state,
        zipcode,
        userId
    } = litter;

    try {
        const response = await csrfFetch('/api/litter', {
            method: 'POST',
            body: JSON.stringify({
                name,
                imageHeader,
                description,
                address,
                city,
                state,
                zipcode,
                userId
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                return Promise.reject(data);
            }
            dispatch(createLitterAction(data.litter));
            return data.litter;
        }
    } catch (e) {
        console.log('ERROR', e);
    }
    return Promise.reject();
};

//  R E A D   O N E   L I T T E R   T H U N K
export const readLitter = id => async dispatch => {
    const response = await csrfFetch(`/api/litter/${id}`);

    // console.log('RESPONSE ONE LITTER', response);

    if (response.ok) {
        const litter = await response.json();
        dispatch(readLitterAction(litter));
    }
};

//  R E A D   A L L   L I T T E R   T H U N K
export const readLitters = () => async dispatch => {
    const response = await csrfFetch(`/api/litter`);

    console.log('ALL LITTER IS INEVITABLE', response);

    if (response.ok) {
        const litters = await response.json();
        dispatch(readLittersAction(litters));
    }
};

//   U P D A T E   L I T T E R
export const updateLitter = litter => async dispatch => {
    const response = await csrfFetch(`/api/litter/${litter.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(litter)
    });

    if (response.ok) {
        const litter = await response.json();
        dispatch(updateLitterAction(litter));
        return litter;
    }
};

//  D E L E T E   L I T T E R
export const deleteLitter = id => async dispatch => {
    const response = await csrfFetch(`/api/litter/${id}`, {
        method: 'DELETE'
    });
    dispatch(deleteLitterAction());
    return response;
};

let initialState = { litter: null };

const litterReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        case READ_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        case READ_LITTERS:
            newState = Object.assign({}, state);
            newState.littersList = action.arrOfLitters;
            return newState;
        case UPDATE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        case DELETE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = null;
            return newState;
        default:
            return state;
    }
};
export default litterReducer;
