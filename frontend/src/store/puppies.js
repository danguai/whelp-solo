import { csrfFetch } from './csrf';

//  C O N S T A N T S
const CREATE_PUPPY = 'puppies/CREATE_PUPPY';

//  A C T I O N S
const createPuppyAction = puppy => {
    return {
        type: CREATE_PUPPY,
        payload: puppy
    };
};

//  T H U N K S
//  C R E A T E   P U P P Y   T H U N K
export const createPuppy = puppy => async dispatch => {
    const {
        name,
        description,
        year,
        month,
        day,
        userId,
        litterId
    } = puppy;

    console.log("PUPPY-PUPPY: ", puppy);
    // try {
    const response = await csrfFetch(`/api/litter/${litterId}/puppies`, {
        method: 'POST',
        body: JSON.stringify(
            {
                name,
                description,
                year,
                month,
                day,
                userId,
                litterId
            })
    });

    console.log("RESPONSE CREATE PUPPY: ", response);

    if (response.ok) {
        const data = await response.json();

        console.log('DATA', data);
        if (data.errors) {
            return Promise.reject(data);
        }
        dispatch(createPuppyAction(data.puppy));
        return response;
    }
    // } catch (e) {
    //     console.log('CREATE PUPPY ERROR: ', e);
    // }
    // return Promise.reject();
};

//  R E A D   O N E   P U P P Y   T H U N K
//  R E A D   A L L   P U P P I E S   T H U N K
//   U P D A T E   P U P P Y   T H U N K
//  D E L E T E   P U P P Y   T H U N K

//  R E D U C E R S
const initialState = { puppiesList: [] };

const puppiesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_PUPPY:
            newState = Object.assign({}, state);
            newState.puppiesList.push(action.payload);
            return newState;
        default:
            return state;
    }
};

export default puppiesReducer;
