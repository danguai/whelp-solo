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

const deleteLitterAction = litterId => {
    return {
        type: DELETE_LITTER,
        payload: litterId
    };
};

//  T H U N K S
//  C R E A T E   L I T T E R   T H U N K
export const createLitter = litter => async dispatch => {
    const response = await csrfFetch('/api/litter', {
        method: 'POST',
        body: JSON.stringify(litter)
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(createLitterAction(data.litter));
        return data.litter;
    } else {
        console.log(data.error);
    }


};

//  R E A D   O N E   L I T T E R   T H U N K
export const readLitter = id => async dispatch => {
    const response = await csrfFetch(`/api/litter/${id}`);

    const data = await response.json();

    if (response.ok) {
        dispatch(readLitterAction(data));
    } else {
        console.log(data.errors);
    }
};

//  R E A D   A L L   L I T T E R   T H U N K
export const readLitters = () => async dispatch => {
    const response = await csrfFetch(`/api/litter`);

    const data = await response.json();
    if (response.ok) {
        dispatch(readLittersAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

//   U P D A T E   L I T T E R   T H U N K
export const updateLitter = litter => async dispatch => {
    const response = await csrfFetch(`/api/litter/${litter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(litter)
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(updateLitterAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

//  D E L E T E   L I T T E R   T H U N K
export const deleteLitter = litterId => async dispatch => {
    const response = await csrfFetch(`/api/litter/${litterId}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    if (response.ok) {
        dispatch(deleteLitterAction(data));
        return data;
    } else {
        console.log(data.errors);
    }

};

//  R E D U C E R
let initialState = { litter: null, littersList: [] };

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
            newState.littersList = newState
                .littersList
                .filter(litter => litter.id !== action.payload.id);
            return newState;
        default:
            return state;
    }
};
export default litterReducer;
