import { csrfFetch } from './csrf';

//  C O N S T A N T S
const CREATE_LITTER = 'litter/CREATE_LITTER';



//  A C T I O N S
const createLitterAction = litter => {
    return {
        type: CREATE_LITTER,
        payload: litter
    };
};



//  T H U N K S
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

let initialState = null;

const litterReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_LITTER:
            newState = Object.assign({}, state);
            newState.litter = action.payload;
            return newState;
        default:
            return state;
    }
};
export default litterReducer;
