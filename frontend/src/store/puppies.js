import { csrfFetch } from './csrf';

//  C O N S T A N T S
const CREATE_PUPPY = 'puppies/CREATE_PUPPY';
const READ_PUPPY = 'puppies/READ_PUPPY';
const READ_PUPPIES = 'puppies/READ_PUPPIES';
const UPDATE_PUPPY = 'puppies/UPDATE_PUPPY';
const DELETE_PUPPY = 'puppies/DELETE_PUPPY';


//  A C T I O N S
const createPuppyAction = puppy => {
    return {
        type: CREATE_PUPPY,
        payload: puppy
    };
};

const readPuppyAction = puppy => {
    return {
        type: READ_PUPPY,
        payload: puppy
    };
};

const readPuppiesAction = puppies => {
    return {
        type: READ_PUPPIES,
        arrOfPups: puppies
    };
};

const updatePuppyAction = puppy => {
    return {
        type: UPDATE_PUPPY,
        payload: puppy
    }
};

const deletePuppyAction = puppy => {
    return {
        type: DELETE_PUPPY,
        payload: puppy
    }
};

//  T H U N K S
//  C R E A T E   P U P P Y   T H U N K
export const createPuppy = puppy => async dispatch => {
    const response = await csrfFetch(`/api/litter/${puppy.litterId}/puppies`, {
        method: 'POST',
        body: JSON.stringify(puppy)
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(createPuppyAction(data.puppy));
        return data.puppy;
    }

};

//  R E A D   O N E   P U P P Y   T H U N K
export const readPuppy = (puppyId, litterId) => async dispatch => {
    const response = await csrfFetch(`/api/litter/${litterId}/puppies/${puppyId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(readPuppyAction(data));
    }

};

//  R E A D   A L L   P U P P I E S   T H U N K
export const readPuppies = litterId => async dispatch => {
    const response = await csrfFetch(`/api/litter/${litterId}/puppies`);

    if (response.ok) {
        const puppies = await response.json();
        dispatch(readPuppiesAction(puppies));
    }
};

//   U P D A T E   P U P P Y   T H U N K
export const updatePuppy = puppy => async dispatch => {
    const response = await csrfFetch(`/api/litter/${puppy.litterId}/puppies/${puppy.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(puppy)
    });

    if (response) {
        const puppy = await response.json();
        dispatch(updatePuppyAction(puppy));
        return puppy;
    }
};

//  D E L E T E   P U P P Y   T H U N K
export const deletePuppy = (puppyId, litterId) => async dispatch => {

    const response = await csrfFetch(`/api/litter/${litterId}/puppies/${puppyId}`, {
        method: 'DELETE'
    });

    if (response) {
        const resJson = await response.json();
        dispatch(deletePuppyAction({ id: puppyId }));
        return resJson;
    }
};

//  R E D U C E R S
const initialState = { puppiesList: [] };

const puppiesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_PUPPY:
            newState = Object.assign({}, state);
            newState.puppiesList.push(action.payload);
            return newState;
        case READ_PUPPY:
            newState = Object.assign({}, state);
            newState.puppy = action.payload;
            return newState;
        case READ_PUPPIES:
            newState = Object.assign({}, state);
            newState.puppiesList = action.arrOfPups;
            return newState;
        case UPDATE_PUPPY:
            newState = Object.assign({}, state);
            const puppyIndex = newState.puppiesList.findIndex(pup => pup.id === action.payload.id);
            newState.puppiesList[puppyIndex] = action.payload;
            return newState;
        case DELETE_PUPPY:
            newState = Object.assign({}, state);
            newState.puppiesList = newState
                .puppiesList
                .filter(puppy => action.payload.id !== puppy.id);
            return newState;
        default:
            return state;
    }
};

export default puppiesReducer;
