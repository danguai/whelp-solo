import Litter from '../components/LitterForm';
import { csrfFetch } from './csrf';

//  C O N S T A N T S
const CREATE_LITTER = 'litter/CREATE_LITTER';
const READ_ONE_LITTER = 'litter/READ_ONE_LITTER';
const READ_ALL_LITTER = 'litter/READ_ALL_LITTER';
const UPDATE_LITTER = 'litter/UPDATE_LITTER';

//  A C T I O N S
const createLitterAction = litter => {
    return {
        type: CREATE_LITTER,
        payload: litter
    };
};

const readOneLitterAction = litter => {
    return {
        type: READ_ONE_LITTER,
        payload: litter
    };
};

const readAllLitterAction = allLitter => {
    return {
        type: READ_ALL_LITTER,
        arrOfLitter: allLitter
    };
};

const updateLitterAction = litter => {
    return {
        type: UPDATE_LITTER,
        payload: litter
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
                userId
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                return Promise.reject(data);
            }
            dispatch(createLitterAction(data.litter));
            return data.place;
        }
    } catch (e) {
        console.log('ERROR', e);
    }
    return Promise.reject();
};

//  R E A D   O N E   L I T T E R   T H U N K
export const readOneLitter = id => async dispatch => {
    const response = await csrfFetch(`/api/litter/${id}`);

    console.log('RESPONSE ONE LITTER', response);

    if (response.ok) {
        const oneLitter = await response.json();
        dispatch(readOneLitterAction(oneLitter));
    }
};

//  R E A D   A L L   L I T T E R   T H U N K
export const readAllLitter = () => async dispatch => {
    const response = await csrfFetch(`/api/litter`);

    console.log('ALL LITTER IS INEVITABLE', response);

    if (response.ok) {
        const allLitter = await response.json();
        dispatch(readAllLitterAction(allLitter));
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

let initialState = { litter: null };

const litterReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        case READ_ONE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        case READ_ALL_LITTER:
            newState = Object.assign({}, state);
            newState.litterList = action.arrOfLitter;
            return newState;
        case UPDATE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        default:
            return state;
    }
};
export default litterReducer;
